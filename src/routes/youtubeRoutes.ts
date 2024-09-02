import { Router } from 'express';
import { fetchI18nLanguages, fetchPlaylists, getPlaylistItems, getVideoStatistics } from '../controller/youtubeController';

const router = Router();

router.get('/fetch-playlists', fetchPlaylists);


router.get('/playlist-items/:playlistId', getPlaylistItems);


router.get('/video-statistics/:videoId', getVideoStatistics);

router.get('/fetch-i18n-languages', fetchI18nLanguages);

export default router;
