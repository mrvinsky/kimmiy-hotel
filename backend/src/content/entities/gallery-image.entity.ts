import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GalleryImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  description: string;
}
