import { PrismaClient } from "@prisma/client";

export type CreateReptilePayload = {
  userId: number,
  species: string,
  name: string,
  sex: string,
}

export class ReptileRepository {
  private db: PrismaClient
  private static instance: ReptileRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): ReptileRepository {
    if (!this.instance) {
      this.instance = new ReptileRepository(db!!);
    }
    return this.instance;
  }

  async createReptile({userId, species, name, sex}: CreateReptilePayload) {
    // Check if the user with the provided userId exists
    const userExists = await this.db.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!userExists) {
      throw new Error('User with the provided userId does not exist');
    }
    // Check if the provided species is allowed
    const allowedSpecies = ["ball_python", "king_snake", "corn_snake", "redtail_boa"];
    if (!allowedSpecies.includes(species)){
      throw new Error('Invalid species. Must be one of "ball_python", "king_snake", "corn_snake", "redtail_boa"')
    }

    // If the user exists and its an allowed species, proceed to create the reptile
    return this.db.reptile.create({
      data: {
        userId: userId,
        species: species,
        name: name,
        sex: sex
      }
    });
  }

  async getReptileById(id: number) {
    return this.db.user.findUnique({
      where: {
        id: id
      },
    });
  }
}