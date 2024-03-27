import { PrismaClient } from "@prisma/client";

export type CreateSchedulePayload = {
  userId: number;
  reptileId: number;
  type: string;
  description: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export class SchedulesRepository {
  private db: PrismaClient;
  private static instance: SchedulesRepository;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): SchedulesRepository {
    if (!this.instance) {
      this.instance = new SchedulesRepository(db!!);
    }
    return this.instance;
  }

  async createSchedule({  userId, reptileId, type, description, monday = false, tuesday = false,
      wednesday = false, thursday = false, friday = false, saturday = false,
      sunday = false, }: CreateSchedulePayload
    ) {
    // Check if the provided type is allowed
    const allowedTypes = ["feed", "record", "clean"];
    if (!allowedTypes.includes(type)) {
      throw new Error(
        'Invalid schedule type. Must be one of "feed", "record", "clean"'
      );
    }

    // If the user exists, proceed to create the schedule
    return this.db.schedule.create({
      data: {
        userId,
        reptileId,
        type,
        description,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      },
    });
  }

  async getSchedulesByReptile(userId: number, reptileId: number) {
    return this.db.schedule.findMany({
      where: {
        userId: userId,
        reptileId: reptileId,
      },
    });
  }

  async deleteSchedule(userId: number, scheduleId: number) {
    // Check if the schedule belongs to the user before deleting
    const existingSchedule = await this.db.schedule.findFirst({
      where: {
        id: scheduleId,
        userId: userId,
      },
    });
    if (!existingSchedule) {
      throw new Error(
        "Schedule not found or you don't have permission to delete it"
      );
    }

    // Delete the schedule
    await this.db.schedule.delete({
      where: {
        id: scheduleId,
      },
    });
  }

  async updateSchedule( scheduleId: number, {userId, type, description,
      monday, tuesday, wednesday, thursday, friday, saturday,sunday,
    }: CreateSchedulePayload
  ) {
    // Check if the schedule belongs to the user before updating
    const existingSchedule = await this.db.schedule.findFirst({
      where: {
        id: scheduleId,
        userId: userId,
      },
    });
    if (!existingSchedule) {
      throw new Error(
        "Schedule not found or you don't have permission to update it"
      );
    }

    // Update the schedule with the provided data
    return this.db.schedule.update({
      where: {
        id: scheduleId,
      },
      data: {
        type,
        description,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      },
    });
  }

  async getAllSchedulesOfUser(userId: number) {
    return this.db.schedule.findMany({
      where: {
        userId: userId,
      },
    });
  }
}