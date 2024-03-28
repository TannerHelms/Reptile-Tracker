import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/authentication';
import { SchedulesRepository } from '../repositories/schedules_repository';

export const buildSchedulesController = (schedulesRepository: SchedulesRepository) => {
  const router = Router();

  // Create a new schedule
  router.post("/:reptileId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    try {
      const userId = req.user.id
      const reptileId = Number(req.params.reptileId);
      const { type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
      const schedule = await schedulesRepository.createSchedule(
        {
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
          sunday
        });
      res.status(200).json({ schedule });
    } catch (error) {
      console.error("Error creating schedule:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get schedules for a specific reptile
  router.get("/:reptileId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const reptileId = Number(req.params.reptileId);

    try {
      const schedules = await schedulesRepository.getSchedulesByReptile(req.user.id, reptileId);
      res.status(200).json({ schedules });
    } catch (error) {
      console.error("Error retrieving schedules:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update a specific schedule
  router.put("/schedule/:scheduleId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userId = req.user.id
    const scheduleId = Number(req.params.scheduleId);
    try {
      const { reptileId, type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
      const updatedSchedule = await schedulesRepository.updateSchedule(
        scheduleId,
        {
          userId,
          type,
          reptileId,
          description,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday
        }
      );
      res.status(200).json({ updatedSchedule });
    } catch (error) {
      console.error("Error updating schedule:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete a specific schedule
  router.delete("/schedule/:scheduleId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const scheduleId = Number(req.params.scheduleId);
    try {
      await schedulesRepository.deleteSchedule(req.user.id, scheduleId);
      res.status(204).send(); // No content
    } catch (error) {
      console.error("Error deleting schedule:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all schedules of a user
  router.get("/", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    try {
      const userId = req.user.id;
      const schedules = await schedulesRepository.getAllSchedulesOfUser(userId);
      res.status(200).json({ schedules });
    } catch (error) {
      console.error("Error retrieving schedules:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
