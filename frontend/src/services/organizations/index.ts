import { GET, POST } from '@utils/http';

import { AddMemberProps, CreateProps, fromApi, Organization, UpdateProps } from './types';

async function getAll(): Promise<Organization[]> {
    try {
        const response = await GET<Organization[]>('/api/organizations/');

        return response.map(fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::getAll Unhandled error');
    }
}

async function getOne(id: string): Promise<Organization | undefined> {
    try {
        const response = await GET<Organization>(`/api/organizations/${id}`);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::getOne Unhandled error');
    }
}

async function create(props: CreateProps): Promise<Organization> {
    try {
        const response = await POST<Organization>('/api/organizations/', props);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::create Unhandled error');
    }
}

async function update(props: UpdateProps): Promise<Organization> {
    try {
        const response = await POST<Organization>('/api/organizations/update', props);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::update Unhandled error');
    }
}

async function addMember({ userId, organizationId }: AddMemberProps): Promise<Organization> {
    try {
        const response = await POST<Organization>('/api/organizations/add-member', {
            user: userId,
            organization: organizationId,
        });

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('OrganizationService::addMember Unhandled error');
    }
}

const OrganizationService = {
    addMember,
    create,
    update,
    getAll,
    getOne,
};

export default OrganizationService;
export * from './types';
