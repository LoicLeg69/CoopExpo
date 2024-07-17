import Login from "../components/Login/Login";
import "../App.css";

function Home() {
  return (
    <main className="container">
      <section className="text-box">
        <img className="logo" src="src\assets\images\logo2.png" alt="Logo" />
        <Login />
      </section>

      <footer>
        Checkpoint 4 de &nbsp;
        <a
          href="https://github.com/LoicLeg69"
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

export default Home;
