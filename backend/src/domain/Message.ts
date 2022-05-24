/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { Thread } from './Thread';
import { User } from './User';

class Message {
    id: string;

    createdAt: Date;

    thread: Thread;

    author: User;

    content: string;

    constructor(
        id: string,
        createdAt: Date,
        thread: Thread,
        author: User,
        content: string,
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.thread = thread;
        this.author = author;
        this.content = content;
    }
}

export { Message };
