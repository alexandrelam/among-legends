const crewmateRoles = [
  {
    type: 'Crewmate',
    name: 'Taupe',
    description:
      'A la fin de la partie, avoir moins de participation (kills + assists) que tous les autres joueurs',
    weight: 0.15,
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
    weight: 0.15,
    image: 'fermier.jpg',
  },
  {
    type: 'Crewmate',
    name: 'Inter',
    description:
      'A la fin de la partie, être mort plus de fois que tous les autres joueurs',
    weight: 0.075,
    image: 'inter.png',
  },
  {
    type: 'Crewmate',
    name: 'Canard',
    description:
      'Toutes les 5 minutes, suivre les ordres reçus par messages privés.',
    weight: 0.1,
    image: 'canard.jpg',
  },
  {
    type: 'Crewmate',
    name: 'Explorateur',
    description:
      'Toutes les 5 minutes, se rendre à la destination indiquée par message privé en restant vivant.',
    weight: 0.1,
    image: 'explorateur.jpg',
  },
  {
    type: 'Crewmate',
    name: 'Fanatic',
    description:
      'Rester uniquement sur ta lane pendant les 15 premières minutes de jeu (si jungler: interdiction de gank durant ce temps).',
    weight: 0.15,
    image: 'fanatic.jpg',
  },
  {
    type: 'Crewmate',
    name: 'Berserker',
    description:
      "En cas de dégats reçus de la part d'un ennemi, combattre jusqu'à la mort.",
    weight: 0.075,
    image: 'berserker.png',
  },
]

const imposterRoles = [
  {
    type: 'Imposter',
    name: 'Imposter',
    description: 'Perdre la game, sans te faire repérer!',
    weight: 1,
    image: 'imposter.png',
  },
]

const cameleon = {
  type: '',
  name: 'Cameleon',
  description: 'Gagner ou perdre la game en fonction du camps reçu en DM',
  image: 'cameleon.jpg',
}

module.exports = { crewmateRoles, imposterRoles, cameleon }
