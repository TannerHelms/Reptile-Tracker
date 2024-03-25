import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/authentication';
import { SchedulesRepository } from '../repositories/schedules_repository';

export class SchedulesController {
    private repository: SchedulesRepository;

    constructor(repository: SchedulesRepository) {
        this.repository = repository;
    }

    public registerRoutes(router: Router): void {
        router.post('/schedules', authMiddleware, this.createSchedule.bind(this));
        router.get('/schedules/:reptileId', authMiddleware, this.getSchedulesByReptile.bind(this));
        router.delete('/schedules/:scheduleId', authMiddleware, this.deleteSchedule.bind(this));
    }

    private async createSchedule(req: Request, res: Response): Promise<void> {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        try {
            const { reptileId, type, description, days } = req.body; // days should be an object {monday: true, tuesday: false, ...}
            const schedule = await this.repository.createSchedule(req.user.id, reptileId, type, description, days);
            res.status(200).json(schedule);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    private async getSchedulesByReptile(req: Request, res: Response): Promise<void> {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        try {
            const reptileId = parseInt(req.params.reptileId);
            const schedules = await this.repository.getSchedulesByReptile(req.user.id, reptileId);
            res.status(200).json(schedules);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    private async deleteSchedule(req: Request, res: Response): Promise<void> {
        if (!req.user) {
            return res.status(401).send('User not authenticated');
        }
        try {
            const scheduleId = parseInt(req.params.scheduleId);
            await this.repository.deleteSchedule(req.user.id, scheduleId);
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
