import { Role } from '../other/roles'

export class Player {
  tag: string = ''
  score: number = 0
  role: Role | undefined = undefined

  constructor(tag: string) {
    this.tag = tag
  }
}
