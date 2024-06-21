// src/components/RegisterForm.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import registerSchema from '../schemas/registerschema';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import logo  from '../assets/Logo Roundesk Technologies.png';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { name, email, password });
      console.log('Inscription réussie', response.data);
      setShowSuccess(true);

      // Redirect to login after a delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate('/'); 
      }, 2000); 
    } catch (error) {
      console.error('Erreur d\'inscription', error);
    }
  };

  return (
      <section className="bg-light p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                  <div className="col-12 col-md-6 d-flex align-items-center">
                    <img
                      className="img-fluid rounded-start w-100 "
                      loading="lazy"
                      src={logo}
  
                      alt="Welcome back you've been missed!"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 p-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-5">
                              <div className="text-center mb-4">
                               <h2  className="display-4 text-primary mb-4"> Roundesk</h2>
                              </div>
                              <h4 className="text-center">Welcome back you've been missed!</h4>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-3 flex-column">
                              
                            </div>
                    
                          </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="row gy-3 overflow-hidden">
                            <div className="col-12">
                            <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  placeholder="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  required
                                />
                                <label htmlFor="email" className="form-label">Name</label>
                              </div>
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="name@example.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                                <label htmlFor="email" className="form-label">Email</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  id="password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                                <label htmlFor="password" className="form-label">Password</label>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-check">
                               
                                
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="d-grid">
                                <button className="btn btn-dark btn-lg" type="submit">
                                  Inscrivez Maintenant 
                                </button>
                                {showSuccess && (
                                   <Alert variant="success" dismissible>
                                       Inscription réussie! Vous allez être redirigé vers la page de connexion.
                                    </Alert>
                                          )}
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div className="col-12">
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );}
  


export default RegisterForm;
