import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ReptileRepository } from "../repositories/reptiles_repository"; // Assuming you have a repository for reptiles

// /reptiles/...
export const buildReptilesController = (reptileRepository: ReptileRepository) => {
  const router = Router();

  // Create a new reptile
  router.post("/", authMiddleware, async (req, res) => {
    if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
    }
    const { species, name, sex } = req.body; // Destructure species, name, and sex from the request body
    const userId = req.user.id; // Extract userId from req.user
    try {
    const reptile = await reptileRepository.createReptile({
        userId: userId,
        species: species,
        name: name,
        sex: sex
    });
    res.status(200).json({ reptile });
    } catch (error) {
    res.status(500).json({ error: "Error creating reptile" });
    }
  });
  

  // Get all reptiles of the authenticated user
  router.get("/", authMiddleware, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const userId = req.user.id; // Extract userId from JWT payload
    const reptiles = await reptileRepository.getUsersReptiles(userId); // Assuming getReptilesByUserId method exists in your repository
    res.status(200).json({ reptiles });
  });

  // Get a specific reptile by ID
  router.get("/:reptileId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userId = req.user.id; // Extract userId from JWT payload
    const reptileId = Number(req.params.reptileId); // Extract reptileId from URL parameters
  
    try {
      const reptile = await reptileRepository.getReptileById(reptileId);
      // Check if the reptile exists
      if (!reptile) {
        return res.status(404).json({ error: "Reptile not found" });
      }
      // Check if the reptile belongs to the authenticated user
      if (reptile.userId !== userId) {
        return res.status(403).json({ error: "You are not authorized to access this reptile" });
      }
      res.status(200).json({ reptile });
    } catch (error) {
      console.error("Error retrieving reptile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  // Update a specific reptile by ID
  router.put("/:reptileId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id; // Extract userId from JWT payload
    const reptileId = Number(req.params.reptileId); // Extract reptileId from URL parameters
    const { species, name, sex } = req.body; // Extract updated reptile data from request body

    try {
      const updatedReptile = await reptileRepository.updateReptile(reptileId, { userId, species, name, sex });
      res.status(200).json({ updatedReptile });
    } catch (error) {
      console.error("Error updating reptile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
  
  // Delete a specific reptile by ID
  router.delete("/:reptileId", authMiddleware, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
  
    const userId = req.user.id; // Extract userId from JWT payload
    const reptileId = Number(req.params.reptileId); // Extract reptileId from URL parameters
  
    try {
      await reptileRepository.deleteReptile(reptileId, userId);
      res.status(204).send(); // No content
    } catch (error) {
      console.error("Error deleting reptile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  return router;
};


