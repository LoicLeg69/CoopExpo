import Signup from "../components/Login/Signup";
import "../App.css";

function Connexion() {
  return (
    <main className="container">
      <section className="text-box">
        <Signup />
      </section>

      <footer>
        Checkpoint 4 de &nbsp;
        <a
          href="https://www.wildcodeschool.com/"
          className="block-primary-main"
          target="_blank"
          rel="noopener noreferrer"
        >
          LoicLeg69
        </a>
      </footer>
    </main>
  );
}

export default Connexion;
