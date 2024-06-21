import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Home from './pages/Home';
import AjouterAgent from './pages/AjouterAgent';
import AgentList from './pages/AgentList';
import 'react-toastify/dist/ReactToastify.css';
import ModifierAgent from './pages/ModifierAgent';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); 

  return isAuthenticated ? (
    <Component {...rest} /> // Render the component directly
  ) : (
    <Navigate to="/" replace /> 
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute component={Home} />}> 
          <Route path="/home" element={<Home />} />
          <Route path="/ajouter-agent" element={<AjouterAgent />} />
          <Route path="/agents" element={<AgentList />} />
          <Route path="/agents/:id/modifier-agent" element={<ModifierAgent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;