import express from 'express'
import { getAllAlbum, getAllSongs, getAllSOngsOfAlbum, getSingleSong } from './controller.js';
const router=express.Router();

router.get('/album/all',getAllAlbum)
router.get('/song/all',getAllSongs)
router.get('/album/:id',getAllSOngsOfAlbum)
router.get('/song/:id',getSingleSong)

export default router;