import { Link, useNavigate  } from "react-router-dom";
import "./ProjectsUser.css";

// import { useUserContext } from "../../contexts/UserContext"; // Importer le contexte utilisateur

function ProjectsUser() {
  const navigate = useNavigate();

  // const { logout } = useUserContext();

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
        <h1 className="project-title">Mes projets</h1>
        <button type="button" className="project-button">
          Ajouter un projet
        </button>
      </div>

      <div className="project-card">
        <img alt="imgProv" src="src/assets/images/loupe.png" />
        <div className="project-description">
          <p className="project-title">Nom du projet</p>
          <p>Stack Technique :</p>
          <p>Outils de gestion :</p>
          <p>Description :</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectsUser;
