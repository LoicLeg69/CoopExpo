import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProjectsUser.css";

function ProjectsUser() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const ApiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    // Fonction pour récupérer les projets depuis l'API
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${ApiUrl}/project`); // Utilisez les backticks ici
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des projets");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = () => {
    // Déconnecter l'utilisateur
    // logout(false);
    navigate("/"); // Rediriger vers la page d'accueil après la déconnexion
  };

  return (
    <div>
      <div className="logout-container">
        <Link
          to="/"
          className="logout-button"
          onClick={handleLogout}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleLogout();
          }}
          role="button"
          tabIndex={0}
        >
          Déconnexion
        </Link>
      </div>

      <div className="projects-container">
        <h1>Mes projets</h1>
        <Link to="/createProject">
          <button type="button" className="project-button">
            Ajouter un projet
          </button>
        </Link>
      </div>

      <div className="cards">
      {projects.map((project) => (
        <div className="project-card" key={project.id}>
          <img alt="imgProv" src="src/assets/images/loupe.png" />
          <div className="project-description">
            <h2 >{project.title}</h2>
            <h4>Stack Technique :</h4>
            <p>{project.stack_technique}</p>
            <h4>Outils de gestion :</h4>
            <p>{project.project_management}</p>
            <h4>Description :</h4>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default ProjectsUser;
