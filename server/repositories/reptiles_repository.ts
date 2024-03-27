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

  async getUsersReptiles(userId: number) {
    return this.db.reptile.findMany({
      where: {
        userId: userId
      },
    });
  }

  async getReptileById(id: number) {
    return this.db.reptile.findUnique({
      where: {
        id: id
      },
    });
  }

  async updateReptile(reptileId: number, {userId, species, name, sex}: CreateReptilePayload) {
    // Check if the reptile belongs to the user before updating
    const existingReptile = await this.db.reptile.findFirst({
      where: {
        id: reptileId,
        userId: userId
      }
    });
    if (!existingReptile) {
      throw new Error("Reptile not found or you don't have permission to update it");
    }
    // Update the reptile with the provided data
    const updatedReptile = await this.db.reptile.update({
      where: {
        id: reptileId
      },
      data: {
        species: species,
        name: name,
        sex: sex,
      }
    });
    return updatedReptile;
  }

  async deleteReptile(reptileId: number, userId: number) {
    // Check if the reptile belongs to the user before deleting
    const existingReptile = await this.db.reptile.findFirst({
      where: {
        id: reptileId,
        userId: userId
      }
    });
    if (!existingReptile) {
      throw new Error("Reptile not found or you don't have permission to delete it");
    }
    // Delete the reptile
    await this.db.reptile.delete({
      where: {
        id: reptileId
      }
    });
  }
}

  // interface AddHusbandryRecordParams {
  //   reptileID: number;
  //   length: number;
  //   weight: number;
  //   temperature: number;
  //   humidity: number;
  // }
  

//   async addHusbandryRecord({ reptileId, length, weight, temperature, humidity }: AddHusbandryRecordParams): Promise<any> {
//     return this.db.husbandryRecord.create({
//       data: {
//         reptileId,
//         length,
//         weight,
//         temperature,
//         humidity,
//       },
//     });
//   }

//   async getHusbandryRecords(reptileId: number): Promise<any[]> {
//     return this.db.husbandryRecord.findMany({
//       where: {
//         reptileId,
//       },
//     });
//   }
// }