import React, { useState } from 'react';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './css/AjouterAgent.css';
import { z } from 'zod';
import { Link } from 'react-router-dom';

const agentSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères" }),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Le numéro de téléphone doit être numérique" })
    .min(8, { message: "Le numéro de téléphone doit comporter au moins 8 chiffres" }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide" }),
  group: z.string().optional(), 
});

const AjouterAgent = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [canMakeCalls, setCanMakeCalls] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false); 
    setValidationErrors({}); // Clear previous validation errors

    try {
      // 1. Validate with Zod
      const validatedData = agentSchema.parse({
        name,
        phoneNumber,
        email,
        group // No need to validate canMakeCalls (boolean)
      });

      // 2. Proceed if validation successful 
      const newAgent = { 
        name: validatedData.name, 
        phoneNumber: validatedData.phoneNumber,
        email: validatedData.email,
        group: validatedData.group, 
        canMakeCalls 
      };
      const response = await api.post('/agents', newAgent);
      console.log('Agent ajouté', response.data);
      setShowSuccess(true);
      // Clear form fields
      setName('');
      setPhoneNumber('');
      setEmail('');
      setGroup('');
      setCanMakeCalls(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        const errors = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setValidationErrors(errors);
      } else {
        // Handle other errors (e.g., API errors)
        console.error('Erreur lors de l\'ajout de l\'agent', error);
        setShowError(true); 
      }
    }
  };
  return (
    <Container className="ajouter-agent-container mt-5">
      {/* Success Alert */}
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Agent ajouté avec succès!
        </Alert>
      )}

      {/* Error Alert */}
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Erreur lors de l'ajout de l'agent. Veuillez réessayer.
        </Alert>
      )}

      <h2 className="text-center mb-4">Ajouter les données d'un agent</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Profile Picture Upload */}
          <Col md={4} className="text-center mb-4">
            <div className="profile-pic-container">
              <img
                src="https://cdn2.iconfinder.com/data/icons/dottie-user-part-1/24/user_024-add-profile-account-people-plus-new-512.png" 
                alt="Profile"
                className="img-fluid rounded-circle profile-pic mb-5"
              />
              <input type="file" className="form-control-file" />
            </div>
          </Col>

          {/* Form Fields */}
          <Col md={8}>
            {/* Nom De l'Agent */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nom De l'Agent</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!validationErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Numéro de téléphone */}
            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                isInvalid={!!validationErrors.phoneNumber} 
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.phoneNumber} 
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!validationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Groupe de destination */}
            <Form.Group controlId="formGroup" className="mb-3">
              <Form.Label>Groupe de destination</Form.Label>
              <Form.Control
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                isInvalid={!!validationErrors.group} 
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.group}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Autorisé à émettre des appels (Switch) */}
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="canMakeCalls"
                label="Autorisé à émettre des appels"
                checked={canMakeCalls}
                onChange={() => setCanMakeCalls(!canMakeCalls)}
              />
            </Form.Group>

            {/* Buttons */}
            <div className="text-end"> 
              <Button variant="secondary" className="me-2" Link to="/home" >
                Annuler
              </Button>
              <Button variant="success" type="submit">
                Enregistrer
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AjouterAgent;