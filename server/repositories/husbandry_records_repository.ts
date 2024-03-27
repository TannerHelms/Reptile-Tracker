import { PrismaClient } from '@prisma/client';

export class HusbandryRecordsRepository {
    private db: PrismaClient;
    private static instance: HusbandryRecordsRepository;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db: PrismaClient): HusbandryRecordsRepository {
        if (!this.instance) {
            this.instance = new HusbandryRecordsRepository(db);
        }
        return this.instance;
    }

    public async createHusbandryRecord(userId: number, reptileID: number, length: number, weight: number, temperature: number, humidity: number) {
        return this.db.husbandryRecord.create({
            data: {
                reptileID,
                length,
                weight,
                temperature,
                humidity
            }
        });
    }

    public async getHusbandryRecordsByReptile(userId: number, reptileID: number) {
        return this.db.husbandryRecord.findMany({
            where: {
                reptileID
            }
        });
    }
}
