import "./ProjectsUser.css";

// const projects = [
//   {
//     id: 1,
//     title: "Projet 1",
//     description: "Description du projet 1",
//     details: "Détails supplémentaires du projet 1",
//   },
//   {
//     id: 2,
//     title: "Projet 2",
//     description: "Description du projet 2",
//     details: "Détails supplémentaires du projet 2",
//   },
//   // Ajoutez d'autres projets si nécessaire
// ];

function ProjectsUser() {
  return (
    <div>
      <div className="projects-container">
        <h1 className="project-title">Mes projets</h1>
        <button type="button" className="project-button">
          Ajouter un projet
        </button>
      </div>
      <div className="project-card">
        <img alt="imgProv" src="src/assets/images/testvision.png" />
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
