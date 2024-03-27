import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { FeedingRepository } from "../repositories/feeding_repository"; // Assuming you have a repository for feedings

// /feedings/...
export const buildFeedingsController = (feedingRepository: FeedingRepository) => {
  const router = Router();

  // Create a new feeding record
  router.post("/", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { reptileId, foodItem } = req.body; // Destructure reptileId and foodItem from the request body
    try {
      const feeding = await feedingRepository.createFeeding({
        reptileId: reptileId,
        foodItem: foodItem,
      });
      res.status(200).json({ feeding });
    } catch (error) {
      console.error("Error creating feeding:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get all feedings for a specific reptile
  router.get("/reptile/:reptileId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const reptileId = Number(req.params.reptileId); // Extract reptileId from URL parameters
    try {
      const feedings = await feedingRepository.getFeedingsForReptile(reptileId);
      res.status(200).json({ feedings });
    } catch (error) {
      console.error("Error retrieving feedings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get a specific feeding by ID
  router.get("/:feedingId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const feedingId = Number(req.params.feedingId); // Extract feedingId from URL parameters
    try {
      const feeding = await feedingRepository.findFeedingById(feedingId);
      if (!feeding) {
        return res.status(404).json({ error: "Feeding record not found" });
      }
      res.status(200).json({ feeding });
    } catch (error) {
      console.error("Error retrieving feeding:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update a specific feeding by ID
  router.put("/:feedingId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const feedingId = Number(req.params.feedingId); // Extract feedingId from URL parameters
    const { foodItem } = req.body; // Extract updated foodItem from request body
    try {
      const updatedFeeding = await feedingRepository.updateFeeding(feedingId, foodItem);
      res.status(200).json({ updatedFeeding });
    } catch (error) {
      console.error("Error updating feeding:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete a specific feeding by ID
  router.delete("/:feedingId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const feedingId = Number(req.params.feedingId); // Extract feedingId from URL parameters
    const {reptileId} = req.body;
    try {
      await feedingRepository.deleteFeeding(feedingId, reptileId);
      res.status(204).send(); // No content
    } catch (error) {
      console.error("Error deleting feeding:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
