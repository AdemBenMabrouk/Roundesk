import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import './css/AjouterAgent.css';
import { z } from 'zod';

const agentSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères" }),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Le numéro de téléphone doit être numérique" })
    .min(8, { message: "Le numéro de téléphone doit comporter au moins 8 chiffres" }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide" }),
  group: z.string().optional(),
});

const ModifierAgent = () => {
  const { id } = useParams(); // Get agent ID from URL parameters
  const navigate = useNavigate(); // For redirection

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('');
  const [canMakeCalls, setCanMakeCalls] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await api.get(`/agents/${id}`);
        const agentData = response.data;
        setName(agentData.name);
        setPhoneNumber(agentData.phoneNumber);
        setEmail(agentData.email);
        setGroup(agentData.group);
        setCanMakeCalls(agentData.canMakeCalls);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'agent', error);
        setShowError(true);
      }
    };

    if (id) { // Only fetch data if id is available
      fetchAgentData();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setShowSuccess(false);
    setShowError(false);
    setValidationErrors({});

    try {
      const validatedData = agentSchema.parse({
        name,
        phoneNumber,
        email,
        group,
      });

      const updatedAgent = {
        name: validatedData.name,
        phoneNumber: validatedData.phoneNumber,
        email: validatedData.email,
        group: validatedData.group,
        canMakeCalls,
      };

      await api.put(`/agents/${id}`, updatedAgent);
      setShowSuccess(true);
    } catch (error) {
      // ... (Error handling same as in AjouterAgent)
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
      try {
        await api.delete(`/agents/${id}`);
        // Redirect to agent list or display a success message
        setShowSuccess(true);

        // Redirect after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          navigate('/agents');
        }, 1000);
    
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'agent', error);
        setShowError(true);
      }
    }
  };

  return (
    <Container className="ajouter-agent-container mt-5">
      {/* ... (Your Success and Error Alerts) */}

      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Agent modifié avec succès! 
        </Alert>
      )}

      <h2 className="text-center mb-4">Modifier l'agent</h2>
      <Form onSubmit={handleUpdate}>
        <Row>
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
          <Col md={8}>
            {/* Nom De l'Agent */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nom De l'Agent</Form.Label>
              <Form.Control
                type="text"
                value={name} // Use fetched 'name' state
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
          <Link to="/home" className="btn btn-secondary me-2">
            Annuler
          </Link>
          <Button variant="danger" className="me-2" onClick={handleDelete}>
            Supprimer
          </Button>
          <Button variant="success" type="submit">
            Enregistrer les modifications
          </Button>
        </div>
      </Col>
        </Row>
      </Form>
    </Container>
  );
};


export default ModifierAgent;