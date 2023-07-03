import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Destination } from '../../domain/vo/destination.vo';
import { MBTI } from '../../domain/vo/mbti.vo';

@Entity({ name: 'destination' })
export class DestinationEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  imgUrl: string;

  @Column()
  content: string;

  @Column()
  contentImgUrl: string;

  @Column()
  mbti: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  toDestination() {
    return new Destination({
      name: this.name,
      imgUrl: this.imgUrl,
      content: this.content,
      contentImgUrl: this.contentImgUrl,
      mbti: MBTI.valueOf(this.mbti),
    });
  }
}
