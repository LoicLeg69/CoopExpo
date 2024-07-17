import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FormProject.css";

function CreateProject() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ApiUrl = import.meta.env.VITE_API_URL;

  const errors = {
    title: "Titre invalide",
    stack_technique: "Stack technique invalide",
    management: "Gestion de projet invalide",
    description: "Description invalide",
  };

  const navigate = useNavigate();

  const notifySuccess = (text) => toast.success(text);

  const notifyFail = (text) => toast.error(text);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { title, stack, management, description} = event.target.elements;

    if (title.value.length < 3) {
      setErrorMessages({ name: "title", message: errors.title });
    } else if (stack.value.length < 3) {
      setErrorMessages({ name: "stack", message: errors.stack });
    } else if (management.value.length < 3) {
      setErrorMessages({ name: "management", message: errors.management });
    } else if (description.value.length < 10) {
      setErrorMessages({ name: "description", message: errors.description });
    } else {
      try {
        const response = await fetch(`${ApiUrl}/project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.value,
            stack_technique: stack.value,
            project_management: management.value,
            description: description.value,
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
          notifySuccess("Le projet a été créé avec succès.");
          setTimeout(() => {
            navigate("/projects");
          }, 2000); 
        } else {
          const data = await response.json();
          setErrorMessages({ name: "server", message: data.message || "Erreur lors de la création du projet" });
          notifyFail("Une erreur s'est produite");
        }
      } catch (error) {
        setErrorMessages({ name: "server", message: "Erreur de connexion au serveur" });
        notifyFail("Une erreur s'est produite");
      }
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="new-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="title">Titre du projet</label>
          <input
            type="text"
            className="input-field"
            id="title"
            name="title"
            placeholder="Titre du projet"
            required
          />
          {renderErrorMessage("title")}
        </div>
        <div className="input-container">
          <label htmlFor="stack">Stack technique</label>
          <input
            type="text"
            className="input-field"
            id="stack"
            name="stack"
            placeholder="Stack technique"
            required
          />
          {renderErrorMessage("stack")}
        </div>
        <div className="input-container">
          <label htmlFor="management">Gestion de projet</label>
          <input
            type="text"
            className="input-field"
            id="management"
            name="management"
            placeholder="Gestion de projet"
            required
          />
          {renderErrorMessage("management")}
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <textarea
            className="input-field"
            id="description"
            name="description"
            placeholder="Description"
            required
          />
          {renderErrorMessage("description")}
        </div>
        <div className="button-container">
          <input type="submit" value="Ajouter" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form">
      <div className="title">Créer un projet</div>
      {isSubmitted ? <div>Projet créé avec succès</div> : renderForm}
    </div>
  );
}

export default CreateProject;
