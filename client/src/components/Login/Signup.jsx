import { useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

function Signup() {
  // États React
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState();
  const ApiUrl = import.meta.env.VITE_API_URL;

  // Définition des messages d'erreur
  const errors = {
    uname: "Nom d'utilisateur invalide",
    mail: "Adresse mail invalide",
    pass: "Mot de passe invalide",
  };

  const navigate = useNavigate();

  // Fonction pour afficher une notification de succès
  const notifySuccess = (text) => toast.success(text);

  // Fonction pour afficher une notification d'échec
  const notifyFail = (text) => toast.error(text);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { uname, mail, pass } = event.target.elements;
  
    if (uname.value.length < 3) {
      setErrorMessages({ name: "uname", message: errors.uname });
    } else if (!/\S+@\S+\.\S+/.test(mail.value)) {
      setErrorMessages({ name: "mail", message: errors.mail });
    } else if (pass.value.length < 6) {
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      try {
        const response = await fetch(`${ApiUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: uname.value,
            mail: mail.value,
            password: pass.value,
          }),
        });
  
        if (response.ok) {
          setIsSubmitted(true);
          notifySuccess("Votre profil a bien été créé. Vous pouvez vous connecter");
          setTimeout(() => {
            navigate("/");
          }, 2000); 
        } else {
          const data = await response.json();
          setErrorMessages({ name: "server", message: data.message || "Erreur lors de la création du compte" });
          notifyFail("Une erreur s'est produite");
        }
      } catch (error) {
        setErrorMessages({ name: "server", message: "Erreur de connexion au serveur" });
        notifyFail("Une erreur s'est produite");
      }
    }
  };

  // Génère le code JSX pour le message d'erreur
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // Code JSX pour le formulaire d'inscription
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="uname">Nom d'utilisateur</label>
          <input
            type="text"
            className="input-field"
            id="uname"
            name="uname"
            placeholder="Nom d'utilisateur"
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label htmlFor="mail">Adresse mail</label>
          <input
            type="text"
            className="input-field"
            id="mail"
            name="mail"
            placeholder="Adresse mail"
            required
          />
          {renderErrorMessage("mail")}
        </div>
        <div className="input-container">
          <label htmlFor="pass">Mot de passe</label>
          <input
            type="password"
            className="input-field"
            id="pass"
            name="pass"
            placeholder="Mot de passe"
            required
          />
          {renderErrorMessage("pass")}
        </div>

        <div className="button-container">
          <input type="submit" value="Créer" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form">
      <div className="title">Créer un compte</div>
      {isSubmitted === true ? <div>Compte créé avec succès</div> : renderForm}
      <Link to="/" className="create">
        <p>Retour</p>
      </Link>
    </div>
  );
}

export default Signup;
