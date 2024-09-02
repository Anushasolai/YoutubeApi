# YouTube Data Fetcher
## Overview
The YouTube Data Fetcher is a Node.js project that fetches data from YouTube's API and stores it into a PostgreSQL database. This project is built using TypeScript, Express.js, and TypeORM. It pulls playlists, playlist items, video statistics, and internationalization languages from the YouTube API.
## Project Structure
- **config/ormconfig.ts**: Contains database configuration and initialization.
- **controller/youtubeController.ts**: Contains the logic for fetching data from the YouTube API.
- **entities/PlayListEntity.ts**: Entity representing YouTube playlists.
- **entities/PlayListItemEntity.ts**: Entity representing items in a YouTube playlist.
- **entities/VedioEntity.ts**: Entity representing video statistics.
- **entities/i18nLanguageEntity.ts**: Entity representing internationalization languages.
- **routes/youtubeRoutes.ts**: Defines API routes for fetching data.
- **src/app.ts**: Main entry point of the application.
## Getting Started
### Prerequisites
- Node.js and npm installed on your machine.
- PostgreSQL database.
### Installation
1. Clone the repository:
   ```bash
   git clone <https://github.com/Anushasolai/YoutubeApi.git>
### Key Points in the `package.json`
- **Scripts**:
  - `start`: Runs the application using `ts-node`.
  - `typeorm`: Provides a shortcut to TypeORM CLI commands.
  - `typeorm:run-migrations`, `typeorm:generate-migration`, `typeorm:create-migration`, `typeorm:revert-migration`: Commands for managing TypeORM migrations.
- **Dependencies**:
  - Essential libraries for making HTTP requests (`axios`), handling environment variables (`dotenv`), and working with PostgreSQL (`pg`).
  - TypeORM and Reflect Metadata for ORM functionality.
- **DevDependencies**:
  - TypeScript-related packages for development and compilation.