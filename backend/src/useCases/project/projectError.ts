class ProjectError extends Error { }

export default ProjectError;

export enum ProjectErrorType {
    NotFound = 'Organization not found',
}
