import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  description: string;

  @Column('json')
  thumbnails: any; 

  @Column()
  channelTitle: string;

  @Column('json')
  localized: any;

  @Column()
  itemCount: number;
  items: any;
}
