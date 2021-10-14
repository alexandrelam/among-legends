module.exports = [
  {
    type: "Crewmate",
    name: "Taupe",
    description:
      "A la fin de la partie, avoir moins de participation (kills + assists) que tous les autres joueurs",
    weight: 0.025,
    image: "taupe.jpg",
  },
  {
    type: "Crewmate",
    name: "Faussaire",
    description:
      "A la fin de la partie, avoir plus de dégats et moins de morts que tous les autres joueurs",
    weight: 0.025,
    image: "faker.jpg",
  },
  {
    type: "Crewmate",
    name: "Fermier",
    description:
      "A la fin de la partie, avoir tué plus de sbires  que tous les autres joueurs (si support: ce nombre est multiplié par 2)",
    weight: 0.025,
    image: "fermier.png",
  },
  {
    type: "Crewmate",
    name: "Inter",
    description:
      "A la fin de la partie, être mort plus de fois que tous les autres joueurs",
    weight: 0.025,
    image: "bronze.png",
  },
  {
    type: "Imposter",
    name: "Imposter",
    description: "Perdre la game, sans te faire repérer!",
    weight: 0.8,
    image: "#",
  },
];
