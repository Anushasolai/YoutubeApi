import { Request, Response } from "express";
import {
  fetchAndStoreI18nLanguages,
  fetchAndStorePlaylistItems,
  fetchAndStorePlaylists,
  fetchAndStoreVideoStatistics,
} from "../service/youtubeService";

export const fetchPlaylists = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const playlists = await fetchAndStorePlaylists();
    return res.status(200).json({
      data: playlists,
      message: "Playlists fetched and stored successfully",
    });
  } catch (error) {
    console.error("Error in fetchPlaylists controller:", error);
    return res.status(500).json({
      error: "Failed to fetch and store playlists",
      details: error,
    });
  }
};

export const getPlaylistItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { playlistId, channelId } = req.params;

  if (!channelId) {
    return res.status(400).json({ error: "channelId is required" });
  }

  try {
    const playlistItems = await fetchAndStorePlaylistItems(
      playlistId,
      channelId
    );
    return res.status(200).json({
      data: playlistItems,
      message: `Playlist items for playlist ID ${playlistId} have been fetched and stored successfully.`,
    });
  } catch (error) {
    console.error("Error fetching playlist items:", error);
    return res.status(500).json({
      error: "Failed to fetch and store playlist items",
      details: error,
    });
  }
};

export const getVideoStatistics = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { videoId } = req.params;

  try {
    const videoStatistics = await fetchAndStoreVideoStatistics(videoId);
    return res.status(200).json({
      data: videoStatistics,
      message: `Statistics for video ID ${videoId} have been fetched and stored successfully.`,
    });
  } catch (error) {
    console.error("Error in getVideoStatistics controller:", error);
    return res.status(500).json({
      error: "Failed to fetch and store video statistics",
      details: error,
    });
  }
};

export const fetchI18nLanguages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const i18nLanguages = await fetchAndStoreI18nLanguages();
    return res.status(200).json({
      data: i18nLanguages,
      message: "i18n languages fetched and stored successfully",
    });
  } catch (error) {
    console.error("Error in fetchI18nLanguages controller:", error);
    return res.status(500).json({
      error: "Failed to fetch and store i18n languages",
      details: error,
    });
  }
};
