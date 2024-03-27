import { Router } from 'express';
import { authMiddleware } from '../middleware/authentication';
import { ReptileRepository } from '../repositories/reptiles_repository';
import { SchedulesRepository } from '../repositories/schedules_repository';

export const buildUserReptilesAndSchedules = (reptileRepository: ReptileRepository, schedulesRepository: SchedulesRepository) => {
  const router = Router();

  // Get reptiles and their schedules for the current day for a specific user
  router.get('/', authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userId = req.user.id;
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();

    try {
      // Retrieve all reptiles of the user
      const reptiles = await reptileRepository.getUsersReptiles(userId);

      // Retrieve schedules for each reptile for the current day
      const reptilesWithSchedules = await Promise.all(reptiles.map(async (reptile) => {
        const schedules = await schedulesRepository.getSchedulesByReptile(userId, reptile.id);
    
        // Filter schedules for the current day
        const schedulesForToday = schedules.filter(schedule => {
          const keys = Object.keys(schedule);
          const scheduleDay = keys.find(key => key.toLowerCase() === currentDay);
          return scheduleDay && schedule[scheduleDay as keyof typeof schedule];
        });

        return {
          ...reptile,
          schedules: schedulesForToday,
        };
      }));

      res.status(200).json({ reptilesWithSchedules });
    } catch (error) {
      console.error('Error retrieving reptiles and schedules:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
