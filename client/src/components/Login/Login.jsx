import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    const { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
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
      <div className="title">Se connecter</div>
      {isSubmitted ? <div>Connecté avec succès</div> : renderForm}
      <Link to="/connexion" className="create">
        <p>Créez un compte</p>
      </Link>
    </div>
  );
}

export default Login;
