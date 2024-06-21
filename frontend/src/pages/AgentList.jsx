import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Dropdown, Pagination } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [agentsPerPage] = useState(4); 
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' (ascending) or 'desc' (descending)

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

  // Pagination Logic 
  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

  // Handle Page Change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Sorting
  const handleSort = (field) => {
    setSortOrder(prevSortOrder => 
      prevSortOrder === 'asc' ? 'desc' : 'asc'
    );
    // Sort the agents array (you might need to adjust the sorting logic)
    const sortedAgents = [...agents].sort((a, b) => {
      if (a[field] < b[field]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0; 
    });
    setAgents(sortedAgents); 
  };

  const [showError, setShowError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleDelete = async (agentId) => { 
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet agent ?")) {
      try {
        await api.delete(`/agents/${agentId}`);

        // Update the agent list after successful deletion
        setAgents(agents.filter(agent => agent.id !== agentId));
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'agent', error);
        setShowError(true);
        setErrorMessage('Erreur lors de la suppression. Veuillez réessayer.'); 
      }
    }
  };

  return (
    <div className="agent-list-container"> 
      <h2 className="mb-4">Tous Les Agents</h2>

      <div className="d-flex justify-content-end mb-3"> {/* Filter Dropdown (Right Align) */}
        <Dropdown>
          <Dropdown.Toggle variant="light" id="filterDropdown">
            Filtrer par date
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* Add your filter options here */}
            <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
            {/* ... */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="table-responsive">
      <Table striped bordered hover responsive> 
        <thead>
          <tr>
            <th>Nom de l'Agent <span onClick={() => handleSort('name')}>▲▼</span></th>
            <th>Numéro <span onClick={() => handleSort('phoneNumber')}>▲▼</span></th>
            <th>Groupe de destination <span onClick={() => handleSort('group')}>▲▼</span></th>
            <th>Email <span onClick={() => handleSort('email')}>▲▼</span></th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {currentAgents.map((agent) => (
            <tr key={agent.id}> 
              <td>{agent.name}</td>
              <td>{agent.phoneNumber}</td>
              <td>{agent.group}</td>
              <td>{agent.email}</td>
              <td>
                <Button variant="danger" className="me-2" onClick={() => handleDelete(agent.id)} >
                  Supprimer
                </Button>
                <Link to={`/agents/${agent.id}/modifier-agent`} className="btn btn-success"> {/* Link to Edit */}
                   Modifier
                  </Link> 
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      {/* Pagination Controls */}
      <Pagination className="justify-content-center"> 
        <Pagination.Prev 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        {Array(Math.ceil(agents.length / agentsPerPage)) 
          .fill(null)
          .map((_, index) => (
            <Pagination.Item 
              key={index + 1} 
              active={index + 1 === currentPage} 
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        <Pagination.Next 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === Math.ceil(agents.length / agentsPerPage)}
        />
      </Pagination>
    </div>
  );
};

export default AgentList;