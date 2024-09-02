import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PlaylistItem } from './PlayListItemEntity';

@Entity()
export class VideoStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: string;

  @Column({ type: 'bigint' })
  viewCount: number;

  @Column({ type: 'bigint' })
  likeCount: number;

  @Column({ type: 'bigint' })
  favoriteCount: number;

  @Column({ type: 'bigint' })
  commentCount: number;

  @ManyToOne(() => PlaylistItem, playlistItem => playlistItem.videoStatistics)
  playlistItem: PlaylistItem;
}
