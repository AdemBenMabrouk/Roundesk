import React, { useState,useEffect } from 'react';
import { Link, useNavigate,Outlet } from 'react-router-dom';
import api from '../services/api';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FaSignOutAlt, FaPlus, FaList } from 'react-icons/fa';
import logo  from '../assets/Logo Roundesk Technologies.png';
import './css/Home.css'; // Import your CSS file for styling

const Home = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); // Redirect to login or another appropriate page
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [agents, setAgents] = useState([]);


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await api.get('/agents');
        setAgents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des agents', error);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm fixed-top">
        <Container fluid>
          <div className="d-flex w-100 ">
            <div className="me-auto">
              <Navbar.Brand as={Link} to="/home" className="d-none d-md-block"> {/* Use Link here */}
                <img src={logo} alt="logo" width={100} />
              </Navbar.Brand>
            </div>
            <div className="d-flex w-100 align-items-center">
              {/* Hamburger Menu */}
              <div className="hamburger d-md-none" onClick={toggleSidebar}>
                ☰
              </div>

              {/* Search Form */}
              <Form className="d-flex ms-3 ms-md-auto flex-grow-1">
                <FormControl
                  type="search"
                  placeholder="Recherche..."
                  className="me-2 flex-grow-1"
                  aria-label="Search"
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                />
              </Form>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Main Content Area */}
      <div className="d-flex flex-grow-1 mt-5 pt-3">
        {/* Sidebar */}
        <Nav className={`flex-column sidebar bg-white shadow-sm py-3 ${sidebarOpen ? 'show' : ''}`}>
          <Nav.Link as={Link} to="/ajouter-agent" className="text-dark mb-2 mt-3"> {/* Use Link here */}
            <FaPlus className="me-2" /> Ajouter Nouvel Agent
          </Nav.Link>
          <Nav.Link as={Link} to="/agents" className="text-dark"> {/* Use Link here */}
            <FaList className="me-2" /> Liste Totale des Agents
          </Nav.Link>
          <div className="mt-auto">
            <Button variant="link" onClick={handleLogout} className="text-dark p-0 mb-4">
              <FaSignOutAlt className="me-2" /> Déconnexion
            </Button>
          </div>
        </Nav>

        {/* Content Area (Where components will be rendered) */}
        <div className="flex-grow-1 main-content d-flex align-items-center justify-content-center">
          <Outlet />
           {/* React Router Outlet */} 
        </div>
      </div>
    </div>
  );
};

export default Home;