import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class I18nLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  youtubeId: string;

  @Column()
  hl: string;

  @Column()
  name: string;
}
