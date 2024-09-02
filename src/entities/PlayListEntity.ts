import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PlaylistItem } from "./PlayListItemEntity";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  youtubeId: string;

  @Column()
  kind: string;

  @Column()
  etag: string;

  @Column()
  publishedAt: string;

  @Column()
  channelId: string;

  @Column()
  title: string;

  @Column("jsonb")
  thumbnails: any;

  @Column()
  channelTitle: string;

  @Column("jsonb")
  localized: any;

  @Column()
  itemCount: number;

  @OneToMany(() => PlaylistItem, (playlistItem) => playlistItem.playlist)
  items: PlaylistItem[];
}
