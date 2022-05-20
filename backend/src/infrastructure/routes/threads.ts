import { Request, Response, Router } from 'express';
import createThread from '../../useCases/threads/createThread';
import asyncRoute from '../../utils/asyncRoute';
import { postRepository, projectRepository, threadRepository } from '../database';
import { mapThread } from '../mappers';
import authorizeAdmin from '../middlewares/authorizeAdmin';

const router = Router();

interface CreateBodyProps {
    project: string;
    subject: string;
}
router.post(
    '/',
    authorizeAdmin(), // TODO::AUTHORIZE MANAGER ONLY
    asyncRoute(async (req: Request, res: Response) => {
        const { project, subject } = req.body as CreateBodyProps;
        const thread = await createThread({ project, subject })({
            postRepository,
            projectRepository,
            threadRepository,
        });

        res.status(200).json(mapThread(thread));
    }),
);

export default router;