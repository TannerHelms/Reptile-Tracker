import { PrismaClient } from '@prisma/client';

export class SchedulesRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async createSchedule(userId: number, reptileId: number, type: string, description: string, days: { [key: string]: boolean }) {
        return this.db.schedule.create({
            data: {
                reptileId,
                userId,
                type,
                description,
                ...days
            }
        });
    }

    public async getSchedulesByReptile(userId: number, reptileId: number) {
        return this.db.schedule.findMany({
            where: {
                reptileId
            }
        });
    }

    public async deleteSchedule(userId: number, scheduleId: number) {
        return this.db.schedule.delete({
            where: {
                id: scheduleId
            }
        });
    }
}
