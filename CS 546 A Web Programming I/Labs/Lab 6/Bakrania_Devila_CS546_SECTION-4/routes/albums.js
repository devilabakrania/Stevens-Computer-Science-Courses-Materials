const express = require("express");
const router = express.Router();
const data = require("../data");
const albumData = data.albums;

router.get("/:id", async (req, res) => {
  try {
    const album = await albumData.getAlbumById(req.params.id);
    res.json(album);
  } catch (e) {
    res.status(404).json({ message: "Album not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const albumList = await albumData.getAllAlbums();
    res.json(albumList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;