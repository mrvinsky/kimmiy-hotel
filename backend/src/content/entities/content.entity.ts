import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryColumn()
  key: string;

  @Column('text')
  value: string;
}
