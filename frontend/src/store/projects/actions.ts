import { ReduxDispatch } from '@hooks/useThunkDispatch';
import ProjectService, { CreateProps, Project } from '@services/projects';
import { Status } from '@services/status';

import { ADD, FILTER, ProjectActionTypes, SEARCH } from './types';

export const addAction = (projects: Project[]): ProjectActionTypes => ({
    type: ADD,
    projects,
});

// search page
export const searchAction = (projects: Project[]): ProjectActionTypes => ({
    type: SEARCH,
    projects,
});

// explore page
export const filterAction = (projects: Project[]): ProjectActionTypes => ({
    type: FILTER,
    projects,
});

export const create =
    (props: CreateProps) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.create(props);
        dispatch(addAction([result]));
    };

export const getAll =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.getAll();
        dispatch(addAction(result));
    };

export const getOne =
    (id: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.getOne(id);
        if (result) {
            dispatch(addAction([result]));
        }
    };

export const search =
    (value: string) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.search({ search: value });
        dispatch(searchAction(result));
    };

interface FilterFiltersProps {
    status: Status[];
}

export const filter =
    ({ status }: FilterFiltersProps) =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        const result = await ProjectService.search({ status });
        dispatch(filterAction(result));
    };

export const resetSearch =
    () =>
    async (dispatch: ReduxDispatch): Promise<void> => {
        dispatch(searchAction([]));
    };
