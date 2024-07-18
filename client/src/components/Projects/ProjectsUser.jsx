import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./ProjectsUser.css";

function ProjectsUser() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const ApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${ApiUrl}/project`);
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
    navigate("/");
    toast.info("Déconnexion réussie.");
  };

  const fetchUpdatedProjects = async () => {
    try {
      const response = await fetch(`${ApiUrl}/project`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets après suppression");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des projets après suppression :", error);
    }
  };
  
  const handleDeleteProject = async () => {
    if (!selectedProjectId) return;
  
    try {
      const response = await fetch(`${ApiUrl}/project/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedProjectId }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du projet");
      }
  
      // Mise à jour de l'état local après la suppression
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== selectedProjectId)
      );
      setSelectedProjectId(null); // Réinitialisation de la sélection après la suppression
  
      // Fetch à nouveau la liste des projets pour mise à jour
      fetchUpdatedProjects();
  
      // Afficher un toast de succès
      toast.success("Projet supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
      // Afficher un toast d'erreur
      toast.error("Erreur lors de la suppression du projet.");
    }
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

      <div className="delete-project-container">
        <select
          value={selectedProjectId || ""}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          <option value="" disabled>
            Sélectionner un projet à supprimer
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="delete-button"
          onClick={handleDeleteProject}
          disabled={!selectedProjectId}
        >
          Supprimer le projet
        </button>
      </div>

      <div className="cards">
  {projects.map((project) => (
    <div className="project-card" key={project.id}>
      <img alt="project" src={`/images/${project.image}`} />
      <div className="project-description">
        <h2>{project.title}</h2>
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
