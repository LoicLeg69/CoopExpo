const AbstractSeeder = require("./AbstractSeeder");

class ProjectSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "project", truncate: true });
  }

  run() {
    const projects = [
      {
        id: 1,
        title: "Quizz Audio « Wild Noise »",
        stack_technique: "HTML / CSS / JavaScript / GitHub / Visual Studio Code / Figma",
        project_management: "Trello / Scrum (Sprint 1 semaine, Code review, Poker planning, Spécification des tickets, Démo fin de sprint, Rétrospective)",
        description: " utilisation HTML, CSS, gestion d'évènements avec JavaScript (onClick, eventListener), incrémentation du score.",
        image: "wildNoise.png",
        // user_id: 1, // Assurez-vous que cet utilisateur existe dans la table `user`
      },
      {
        id: 2,
        title: "Librairie « Cover4you »",
        stack_technique: "HTML / CSS / JavaScript / React / API / GitHub / Visual Studio Code / Figma",
        project_management: "Trello / Scrum (Sprint 1 semaine, Code review, Poker planning, Spécification des tickets, Démo fin de sprint, Rétrospective)",
        description: "utilisation des Loaders, React Router, des Hooks (useEffect, useState, etc...), fetch et axios API, Context.",
        image: "cover4you.png",
        // user_id: 2, // Assurez-vous que cet utilisateur existe dans la table `user`
      },
    ];

    projects.forEach((project) => {
      this.insert(project);
    });
  }
}

module.exports = ProjectSeeder;
