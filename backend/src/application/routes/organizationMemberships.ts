/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import COREOrganizationMembershipRepository from '../../core/ports/repositories/COREOrganizationMembershipRepository';
import createOrganizationMembership from '../../core/useCases/organizationMembership/createOrganizationMembership';
import deleteOrganizationMembership from '../../core/useCases/organizationMembership/deleteOrganizationMembership';
import getAllOrganizationMemberships from '../../core/useCases/organizationMembership/getAllOrganizationMemberships';
import { mapOrganizationMembership } from '../../infrastructure/mappers';
import createOrganizationMembershipCommand from '../commands/createOrganizationMembershipCommand';
import authorizeAdmin from '../middlewares/authorizeAdmin';

interface OrganizationMembershipRouterProps {
    organizationMembershipRepository: COREOrganizationMembershipRepository,
}

const organizationMembershipRouter = ({
    organizationMembershipRepository,
}: OrganizationMembershipRouterProps): Router => {
    const router = Router();

    router.get('/', authorizeAdmin(), async (req: Request, res: Response) => {
        const members = await getAllOrganizationMemberships()({ organizationMembershipRepository });

        res.status(200).json(members.map(mapOrganizationMembership));
    });

    router.post(
        '/',
        authorizeAdmin(),
        async (req: Request, res: Response) => {
            await createOrganizationMembership(
                createOrganizationMembershipCommand(req),
            )({ organizationMembershipRepository });

            res.status(200).json({ success: true });
        },
    );

    router.delete(
        '/',
        authorizeAdmin(),
        async (req: Request, res: Response) => {
            const { userId, organizationId } = req.body;
            await deleteOrganizationMembership({ userId, organizationId })({ organizationMembershipRepository });

            res.status(200).json({ success: true });
        },
    );

    return router;
};

export default organizationMembershipRouter;