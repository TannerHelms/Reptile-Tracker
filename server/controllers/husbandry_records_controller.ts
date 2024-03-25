import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/authentication';
import { HusbandryRecordsRepository } from '../repositories/husbandry_records_repository';

export class HusbandryRecordsController {
    private repository: HusbandryRecordsRepository;

    constructor(repository: HusbandryRecordsRepository) {
        this.repository = repository;
    }

    public registerRoutes(router: Router): void {
        router.post('/husbandry_records', authMiddleware, this.createHusbandryRecord.bind(this));
        router.get('/husbandry_records/:reptileId', authMiddleware, this.getHusbandryRecordsByReptile.bind(this));
    }

    private async createHusbandryRecord(req: Request, res: Response): Promise<void> {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        try {
            const { reptileId, length, weight, temperature, humidity } = req.body;
            const record = await this.repository.createHusbandryRecord(req.user.id, reptileId, length, weight, temperature, humidity);
            res.status(200).json(record);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    private async getHusbandryRecordsByReptile(req: Request, res: Response): Promise<void> {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        try {
            const reptileId = parseInt(req.params.reptileId);
            const records = await this.repository.getHusbandryRecordsByReptile(req.user.id, reptileId);
            res.status(200).json(records);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
