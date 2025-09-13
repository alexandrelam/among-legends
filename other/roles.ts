const taupe = {
  type: 'Crewmate',
  name: 'Taupe',
  description:
    'A la fin de la partie, avoir moins de participation (kills + assists) que tous les autres joueurs',
  weight: 20,
  image: 'taupe.jpg',
}

const faussaire = {
  type: 'Crewmate',
  name: 'Faussaire',
  description:
    'A la fin de la partie, avoir plus de dégats et moins de morts que tous les autres joueurs',
  weight: 20,
  image: 'faker.jpg',
}

const fermier = {
  type: 'Crewmate',
  name: 'Fermier',
  description:
    'A la fin de la partie, avoir tué plus de sbires  que tous les autres joueurs (si support: ce nombre est multiplié par 2)',
  weight: 20,
  image: 'fermier.jpg',
}

const inter = {
  type: 'Crewmate',
  name: 'Inter',
  description:
    'A la fin de la partie, être mort plus de fois que tous les autres joueurs',
  weight: 20,
  image: 'inter.png',
}

const canard = {
  type: 'Crewmate',
  name: 'Canard',
  description:
    'Toutes les 5 minutes, suivre les ordres reçus par messages privés.',
  weight: 10,
  image: 'canard.jpg',
}

const explorateur = {
  type: 'Crewmate',
  name: 'Explorateur',
  description:
    'Toutes les 5 minutes, se rendre à la destination indiquée par message privé en restant vivant.',
  weight: 10,
  image: 'explorateur.jpg',
}

const fanatic = {
  type: 'Crewmate',
  name: 'Fanatic',
  description:
    'Rester uniquement sur ta lane pendant les 15 premières minutes de jeu (si jungler: interdiction de gank durant ce temps).',
  weight: 5,
  image: 'fanatic.jpg',
}

const berserker = {
  type: 'Crewmate',
  name: 'Berserker',
  description:
    "En cas de dégats reçus de la part d'un ennemi, combattre jusqu'à la mort.",
  weight: 5,
  image: 'berserker.png',
}

const aramCrewmateRoles = [taupe, faussaire, fermier, inter, canard, berserker]

const failleCrewmateRoles = [
  taupe,
  faussaire,
  fermier,
  inter,
  canard,
  explorateur,
  fanatic,
  berserker,
]

export const getCrewmateRoles = (type: string) => {
  if (type === 'ARAM') return aramCrewmateRoles
  return failleCrewmateRoles
}

export const imposterRoles = [
  {
    type: 'Imposter',
    name: 'Imposter',
    description: 'Perdre la game, sans te faire repérer!',
    weight: 1,
    image: 'imposter.png',
  },
]

export const cameleon = {
  type: '',
  name: 'Cameleon',
  description: 'Gagner ou perdre la game en fonction du camps reçu en DM',
  image: 'cameleon.jpg',
}
