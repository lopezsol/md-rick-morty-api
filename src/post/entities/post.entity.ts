import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  idEpisode: number;

  @Column({ default: true })
  enabled: boolean;

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments?: Comment[];
}
