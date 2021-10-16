const crewmateRoles = [
  {
    type: 'Crewmate',
    name: 'Taupe',
    description:
      'A la fin de la partie, avoir moins de participation (kills + assists) que tous les autres joueurs',
    weight: 0.2,
    image: 'taupe.jpg',
  },
  {
    type: 'Crewmate',
    name: 'Faussaire',
    description:
      'A la fin de la partie, avoir plus de dégats et moins de morts que tous les autres joueurs',
    weight: 0.2,
    image: 'faker.jpg',
  },
  {
    type: 'Crewmate',
    name: 'Fermier',
    description:
      'A la fin de la partie, avoir tué plus de sbires  que tous les autres joueurs (si support: ce nombre est multiplié par 2)',
    weight: 0.2,
    image: 'fermier.png',
  },
  {
    type: 'Crewmate',
    name: 'Inter',
    description:
      'A la fin de la partie, être mort plus de fois que tous les autres joueurs',
    weight: 0.2,
    image: 'bronze.png',
  },
  {
    type: 'Crewmate',
    name: 'Canard',
    description:
      'Toutes les 5 minutes, suivre les ordres reçus par messages privés.',
    weight: 0.1,
    image: 'canard.png',
  },
  {
    type: 'Crewmate',
    name: 'Explorateur',
    description:
      'Toutes les 5 minutes, se rendre à la destination indiquée par message privé toutes les 5 minutes en restant vivant.',
    weight: 0.1,
    image: 'explorateur.jpg',
  },
]

const imposterRoles = [
  {
    type: 'Imposter',
    name: 'Imposter',
    description: 'Perdre la game, sans te faire repérer!',
    weight: 1,
    image: 'imposter.jpg',
  },
]

module.exports = { crewmateRoles, imposterRoles }
