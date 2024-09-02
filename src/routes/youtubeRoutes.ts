import { Router } from 'express';
import { fetchPlaylists, getPlaylistItems, getVideoStatistics } from '../controller/youtubeController';

const router = Router();

router.get('/fetch-playlists', fetchPlaylists);


router.get('/playlist-items/:playlistId', getPlaylistItems);


router.get('/video-statistics/:videoId', getVideoStatistics);

export default router;
