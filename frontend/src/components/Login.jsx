// src/components/LoginForm.js
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import logo  from '../assets/Logo Roundesk Technologies.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      console.log('login réussie', response.data);
      navigate('/home'); 

      // Rediriger ou mettre à jour l'état de l'application
    } catch (error) {
      console.error('Erreur de connexion', error);
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
                                Log in now
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                            <a href="/register" className="link-secondary text-decoration-none fw-bold text-dark ">
                              Create new account
                            </a>
                            
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
      </div>
    </section>
  );}
export default LoginForm;
