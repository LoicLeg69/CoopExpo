import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useUserContext } from '../../contexts/UserContext';
import './Login.css';

function Login() {
  const ApiUrl = import.meta.env.VITE_API_URL;
  const notifySuccess = (username) => toast.success(`Bienvenue, ${username} !`);
  const notifyFail = () => toast.error("Une erreur s'est produite");
  const navigate = useNavigate();
  
  // Utilisation du contexte UserContext
  // const { login } = useUserContext();

  const [loginInfos, setLoginInfos] = useState({
    mail: '',
    password: '',
  });

  const handleLoginInfos = (e) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInfos.mail.trim() === '' || loginInfos.password.trim() === '') {
      console.error('Mail and password must be non-empty strings');
      return;
    }

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(`${ApiUrl}/auth/connexion`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginInfos),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        console.info('API response:', responseData);
        if (responseData.user) {
          const { username } = responseData.user;
          // login(responseData.user);
          navigate('/projects');
          notifySuccess(username);
        } else {
          console.error('User object is missing in the response');
        }
      } else {
        console.info('Login failed with status:', response.status);
        notifyFail();
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="mail">Adresse mail</label>
          <input
            type="text"
            className="input-field"
            id="mail"
            name="mail"
            placeholder="Adresse mail"
            value={loginInfos.mail}
            onChange={handleLoginInfos}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="pass">Mot de passe</label>
          <input
            type="password"
            className="input-field"
            id="pass"
            name="password"
            placeholder="Mot de passe"
            value={loginInfos.password}
            onChange={handleLoginInfos}
            required
          />
        </div>

        <div className="button-container">
          <input type="submit" value="Se connecter" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form">
      <div className="title">Se connecter</div>
      {renderForm}
      <Link to="/createUser" className="create">
        <p>Créez un compte</p>
      </Link>
    </div>
  );
}

export default Login;
