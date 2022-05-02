import { Status } from '@services/status';
import { GET, POST } from '@utils/http';

import { CreateProps, fromApi, Project } from './types';

async function getAll(): Promise<Project[]> {
    try {
        const response = await GET<Project[]>('/api/projects/');

        return response.map(fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::getAll Unhandled error');
    }
}

async function getOne(id: string): Promise<Project | undefined> {
    try {
        const response = await GET<Project>(`/api/projects/${id}`);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::getOne Unhandled error');
    }
}

async function create(props: CreateProps): Promise<Project> {
    try {
        const response = await POST<Project>('/api/projects/', props);

        return fromApi(response);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::create Unhandled error');
    }
}

interface SearchProps {
    status?: Status[];
    search?: string;
}

async function search({ status, search: searchStr }: SearchProps): Promise<Project[]> {
    try {
        const response = await POST<Project[]>('/api/projects/search', {
            status: status?.map((s) => s.id),
            search: searchStr,
        });

        return response.map(fromApi);
    } catch (error) {
        // TODO::error handling
        console.error(error);
        throw Error('ProjectService::search Unhandled error');
    }
}

const ProjectService = {
    create,
    getAll,
    getOne,
    search,
};

export default ProjectService;
export * from './types';
