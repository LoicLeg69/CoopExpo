import ProjectsUser from "../components/Projects/ProjectsUser";
import "../App.css";

function Projects() {
  return (
    <main className="container">
      <section className="text-box">
        <ProjectsUser />
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

export default Projects;
