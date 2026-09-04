import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
  addMovie,
  deleteMovie,
  getWatchlist,
  updateMovie,
} from "../utils/db.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

router.get("/:userId", authenticate, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const watchlist = getWatchlist(userId);
  res.status(200).json({ watchlist: watchlist });
});

router.post(
  "/:userId/movies",
  authenticate,
  authorizeModification,
  (req, res) => {
    const userId = parseInt(req.params.userId);
    const movie = req.body;
    const { title, genre } = movie;

    addMovie(userId, { title, genre });
    res.status(201).json({ movie: movie });
  },
);

router.put(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const userId = parseInt(req.params.userId);
    const movieId = parseInt(req.params.movieId);
    const updates = req.body;

    const updatedMovie = updateMovie(userId, movieId, updates);
    res
      .status(200)
      .json({
        message: `Movie "${updates.title}" updated successfully`,
        movie: updatedMovie,
      });
  },
);

router.delete(
  "/:userId/movies/:movieId",
  authenticate,
  authorizeModification,
  (req, res) => {
    const userId = parseInt(req.params.userId);
    const movieId = parseInt(req.params.movieId);
    const watchlist = getWatchlist(userId);

    // if (movieId) {
    const isDeleted = deleteMovie(userId, movieId);
    return res.status(200).json({ message: `Movie deleted: ${isDeleted}` });
    // }
    // return res.status(404).json({ "error": "Movie does not exists."})
  },
);

export default router;
