import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Signup() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "Nom d'utilisateur invalide",
    mail: "Adresse mail invalide",
    pass: "Mot de passe invalide",
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    const { uname, mail, pass } = document.forms[0];

    // Simple validation checks
    if (uname.value.length < 3) {
      setErrorMessages({ name: "uname", message: errors.uname });
    } else if (!/\S+@\S+\.\S+/.test(mail.value)) {
      setErrorMessages({ name: "mail", message: errors.mail });
    } else if (pass.value.length < 6) {
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      // If no errors, submit form
      setIsSubmitted(true);
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for sign up form
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
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form">
      <div className="title">Créer un compte</div>
      {isSubmitted ? <div>Compte créé avec succès</div> : renderForm}
      <Link to="/" className="login">
        <p>Se connecter</p>
      </Link>
    </div>
  );
}

export default Signup;
