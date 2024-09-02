import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Playlist } from './PlayListEntity';
import { VideoStatistics } from './VedioEntity';

@Entity()
export class PlaylistItem {
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
  title: string;

  @Column()
  description: string;

  @Column('json')
  thumbnails: any; // Adjust type as necessary

  @Column()
  channelTitle: string;

  @Column()
  videoId: string;

  @ManyToOne(() => Playlist, playlist => playlist.items)
  playlist: Playlist;

  @OneToMany(() => VideoStatistics, videoStatistics => videoStatistics.playlistItem)
  videoStatistics: VideoStatistics[];
}
