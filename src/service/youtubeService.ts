import { AppSource } from "../config/ormconfig";
import { Playlist } from "../entities/PlayListEntity";
import axios from "axios";
import { PlaylistItem } from "../entities/PlayListItemEntity";
import { VideoStatistics } from "../entities/VedioEntity";

const API_KEY = process.env.API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

// const fetchAndStorePlaylists=async()=>{}
export const fetchAndStorePlaylists = async () => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const playlists = response.data.items;

    const playlistRepository = AppSource.getRepository(Playlist);

    for (const playlist of playlists) {
      const newPlaylist = playlistRepository.create({
        youtubeId: playlist.id,
        kind: playlist.kind,
        etag: playlist.etag,
        publishedAt: new Date(playlist.snippet.publishedAt).toISOString(),
        channelId: playlist.snippet.channelId,
        title: playlist.snippet.title,
        description: playlist.snippet.description || "",
        thumbnails: playlist.snippet.thumbnails,
        channelTitle: playlist.snippet.channelTitle,
        localized: playlist.snippet.localized,
        itemCount: playlist.contentDetails.itemCount,
      });

      await playlistRepository.save(newPlaylist);
      console.log(`Playlist ${newPlaylist.title} saved to the database.`);

      // Pass playlistId and channelId to fetchAndStorePlaylistItems
      await fetchAndStorePlaylistItems(playlist.id, playlist.snippet.channelId);
    }

    console.log("All playlists have been saved to the database.");
  } catch (error) {
    console.error("Error fetching playlists:", error);
  }
};

export const fetchAndStorePlaylistItems = async (
  playlistId: string,
  _channelId: string
) => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${API_KEY}`;


  try {
    const playlistItemRepository = AppSource.getRepository(PlaylistItem);
    const playlistRepository = AppSource.getRepository(Playlist);

    const playlist = await playlistRepository.findOneOrFail({
      where: { youtubeId: playlistId },
    });

    {
      const response: any = await axios.get(url);
      const playlistItems = response.data.items;

      for (const item of playlistItems) {
        const newItem = playlistItemRepository.create({
          youtubeId: item.id,
          kind: item.kind,
          etag: item.etag,
          publishedAt: new Date(item.snippet.publishedAt).toISOString(),
          title: item.snippet.title,
          description: item.snippet.description || "",
          thumbnails: item.snippet.thumbnails,
          channelTitle: item.snippet.channelTitle,
          videoId: item.snippet.resourceId.videoId,
          playlist: playlist,
        });

        await playlistItemRepository.save(newItem);
        console.log(`Playlist item ${newItem.title} saved to the database.`);

        await fetchAndStoreVideoStatistics(newItem.videoId);
      }
    }

    console.log("All playlist items have been saved to the database.");
  } catch (error) {
    console.error("Error fetching playlist items:", error);
  }
};

export const fetchAndStoreVideoStatistics = async (videoId: string) => {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
   

    const videoStatisticsRepository = AppSource.getRepository(VideoStatistics);
    const playlistItemRepository = AppSource.getRepository(PlaylistItem);

    let playlistItem: PlaylistItem | null = null;

    try {
      playlistItem = await playlistItemRepository.findOne({
        where: { videoId },
      });
      if (!playlistItem) {
        console.error(`No PlaylistItem found for video ID: ${videoId}`);
        return;
      }
    } catch (findError) {
      console.error(
        `Error finding PlaylistItem with videoId ${videoId}.`,
        findError
      );
      return;
    }

    const newVideoStatistics = videoStatisticsRepository.create({
      videoId: videoId,
      viewCount: parseInt(response.data.statistics.viewCount, 10),
      likeCount: parseInt(response.data.statistics.likeCount, 10),
      favoriteCount: parseInt(response.data.statistics.favoriteCount, 10),
      commentCount: parseInt(response.data.commentCount, 10),
      playlistItem: playlistItem,
    });

    await videoStatisticsRepository.save(newVideoStatistics);
    console.log(`Statistics for video ID ${videoId} saved to the database.`);
  } catch (error) {
    console.error(
      `Error fetching video statistics for video ID ${videoId}:`,
      error
    );
  }
};
