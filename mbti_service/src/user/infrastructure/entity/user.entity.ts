import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from '../../domain/user.model';
import { PROVIDER } from '../../domain/vo/provider';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  provider: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  nickname: string;

  @Column({ type: Date })
  createdAt: Date;

  @Column({ type: Date, nullable: true })
  updatedAt: Date;

  public toModel() {
    return new UserModel({
      id: this.id,
      provider: PROVIDER[this.provider],
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      nickname: this.nickname,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
