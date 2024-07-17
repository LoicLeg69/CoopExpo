import { useState } from "react";
import "./Login.css";

function Signup() {
  // États React
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ApiUrl = import.meta.env.VITE_API_URL;

  const errors = {
    uname: "Nom d'utilisateur invalide",
    mail: "Adresse mail invalide",
    pass: "Mot de passe invalide",
  };

  const handleSubmit = async (event) => {
    // Empêche le rechargement de la page
    event.preventDefault();

    const { uname, mail, pass } = document.forms[0];

    // Vérifications simples
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
        } else {
          const data = await response.json();
          setErrorMessages({ name: "server", message: data.message || "Erreur lors de la création du compte" });
        }
      } catch (error) {
        setErrorMessages({ name: "server", message: "Erreur de connexion au serveur" });
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
    </div>
  );
}

export default Signup;
