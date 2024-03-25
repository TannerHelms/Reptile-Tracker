import { PrismaClient } from '@prisma/client';

export class HusbandryRecordsRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    public async createHusbandryRecord(userId: number, reptileId: number, length: number, weight: number, temperature: number, humidity: number) {
        return this.db.husbandryRecord.create({
            data: {
                reptileId,
                length,
                weight,
                temperature,
                humidity
            }
        });
    }

    public async getHusbandryRecordsByReptile(userId: number, reptileId: number) {
        return this.db.husbandryRecord.findMany({
            where: {
                reptileId
            }
        });
    }
}
