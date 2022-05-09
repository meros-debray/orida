import { Request, Response, Router } from 'express';
import Role from '../../domain/Role';
import answerPoll from '../../useCases/polls/answerPoll';
import createPoll from '../../useCases/polls/createPoll';
import asyncRoute from '../../utils/asyncRoute';
import pollAdapter from '../adapters/pollAdapter';
import { pollRepository, pollResponseRepository, postRepository, projectRepository, userRepository } from '../database';
import authorize from '../middlewares/authorize';

const router = Router();

interface CreateBodyProps {
    project: string;
    question: string;
    responses: string[];
}
router.post(
    '/',
    authorize([Role.Manager]),
    asyncRoute(async (req: Request, res: Response) => {
        const { project, question, responses } = req.body as CreateBodyProps;
        await createPoll({ project, question, responses })({
            pollAdapter,
            pollRepository,
            postRepository,
            projectRepository,
        });

        res.status(200).json({ success: true });
    }),
);

router.post(
    '/answer',
    asyncRoute(async (req: Request, res: Response) => {
        const formReponse = req.body.form_response;
        const data = {
            formId: formReponse.form_id,
            userId: formReponse.hidden.userid,
        };
        await answerPoll(data)({ pollRepository, pollResponseRepository, userRepository });

        res.sendStatus(200);
    }),
);

export default router;