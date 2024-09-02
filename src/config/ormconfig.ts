import { DataSource, ViewEntity } from "typeorm";
import { Playlist } from "../entities/PlayListEntity";
import { PlaylistItem } from "../entities/PlayListItemEntity";
import { VideoStatistics } from "../entities/VedioEntity";
import * as dotenv from 'dotenv';
import { I18nLanguage } from "../entities/i18nLanguageEntity";


dotenv.config();

export const AppSource = new DataSource({
    type: process.env.DATABASE_TYPE as 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Playlist, PlaylistItem, VideoStatistics, I18nLanguage],
    synchronize: false,
    logging: false,
    migrations: ["src/migrations/**/*.ts"],
});