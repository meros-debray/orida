/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Post as PostDomain } from '../../../domain/Post';
import BaseColumns from './BaseColumns';
import { Poll } from './Poll';
import { Project } from './Project';

@Entity('post')
class Post extends BaseColumns {
    @ManyToOne(() => Project, (project) => project.posts)
    @JoinColumn({ name: 'project' })
        project: Project;

    @OneToOne(() => Poll, (poll) => poll.post, { eager: true })
        poll?: Poll;

    constructor(
        id: string,
        createdAt: Date,
        modifiedAt: Date,
        project: Project,
        poll: Poll,
    ) {
        super(id, createdAt, modifiedAt);
        this.project = project;
        this.poll = poll;
    }

    toDomain(): PostDomain {
        return new PostDomain(
            this.id,
            'POLL',
            this.createdAt,
            this.project?.toDomain(),
            this.poll?.toDomain(),
        );
    }
}

export { Post };
