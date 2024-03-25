import { PrismaClient } from "@prisma/client";

export type CreateFeedingPayload = {
  reptileId: number,
  foodItem: string,
}

export class FeedingRepository {
  private db: PrismaClient
  private static instance: FeedingRepository

  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): FeedingRepository {
    if (!this.instance) {
      this.instance = new FeedingRepository(db!!);
    }
    return this.instance;
  }

  async createFeeding({ reptileId, foodItem }: CreateFeedingPayload) {
    // Check if the provided reptile ID exists
    const existingReptile = await this.db.reptile.findUnique({
      where: {
        id: reptileId
      }
    });
    if (!existingReptile) {
      throw new Error('Reptile not found');
    }
    // Proceed to create the feeding record
    return this.db.feeding.create({
      data: {
        reptileId: reptileId,
        foodItem: foodItem,
      }
    });
  }

  async getFeedingsForReptile(reptileId: number) {
    return this.db.feeding.findMany({
      where: {
        reptileId: reptileId
      },
    });
  }

  async findFeedingById(feedingId: number) {
    return this.db.feeding.findUnique({
      where: {
        id: feedingId
      },
    });
  }

  async updateFeeding(feedingId: number, foodItem: string) {
    // Check if the feeding record exists
    const existingFeeding = await this.db.feeding.findUnique({
      where: {
        id: feedingId
      }
    });
    if (!existingFeeding) {
      throw new Error("Feeding record not found");
    }
    // Proceed to update the feeding record
    return this.db.feeding.update({
      where: {
        id: feedingId
      },
      data: {
        foodItem: foodItem
      }
    });
  }

  async deleteFeeding(feedingId: number, reptileId: number) {
    // Check if the feeding record belongs to the reptile before deleting
    const existingFeeding = await this.db.feeding.findFirst({
      where: {
        id: feedingId,
        reptileId: reptileId
      }
    });
    if (!existingFeeding) {
      throw new Error("Feeding record not found or it doesn't belong to the reptile");
    }
    // Delete the feeding record
    await this.db.feeding.delete({
      where: {
        id: feedingId
      }
    });
  }
}
