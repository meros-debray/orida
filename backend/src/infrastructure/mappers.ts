/* global NodeJS */
import { Category } from '../domain/Category';
import { Image } from '../domain/Image';
import { Message } from '../domain/Message';
import { Organization } from '../domain/Organization';
import { OrganizationMembership } from '../domain/OrganizationMembership';
import { Poll } from '../domain/Poll';
import { Post } from '../domain/Post';
import { Project } from '../domain/Project';
import { ProjectContribution } from '../domain/ProjectContribution';
import { ProjectStatus } from '../domain/ProjectStatus';
import { Role } from '../domain/Role';
import { Thread } from '../domain/Thread';
import { User } from '../domain/User';

export const mapUser = (user: User) => ({
    email: user.email,
    fullname: user.fullname,
    id: user.id,
    lastname: user.lastname,
    isAdmin: user.isAdmin,
    // disable rule as the function is exported
    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
    organizationMemberships: user.organizationMemberships.map(mapOrganizationMembership),
    // disable rule as the function is exported
    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
    projectContributions: user.projectContributions.map(mapProjectContribution),
});

export const mapProjectStatus = (status: ProjectStatus) => ({
    id: status?.id,
    label: status?.label,
});

export const mapPoll = (poll: Poll) => ({
    id: poll.id,
    post: poll.post,
    externalPollId: poll.externalPollId,
    answered: poll.answered || false,
});

export const mapMessage = (message: Message) => ({
    id: message.id,
    createdAt: message.createdAt,
    thread: message.thread,
    author: message.author ? mapUser(message.author) : undefined,
    content: message.content,
});

export const mapThread = (thread: Thread) => ({
    id: thread.id,
    subject: thread.subject,
    createdAt: thread.createdAt,
    messages: thread.messages?.map((message) => mapMessage(message)) || [],
});

export const mapPost = (post: Post) => ({
    id: post.id,
    type: post.type,
    poll: post.poll ? mapPoll(post.poll) : undefined,
    thread: post.thread ? mapThread(post.thread) : undefined,
    date: post.date,
});

export const mapProjectContribution = (contribution: ProjectContribution): any => ({
    user: mapUser(contribution.user),
    // disable rule as the function is exported
    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
    project: mapProject(contribution.project),
    // disable rule as the function is exported
    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
    role: mapRole(contribution.role),
});

export const mapCategory = (category: Category) => ({
    id: category.id,
    label: category.label,
    color: category.color,
    projects: category.projects,
});

export const mapImage = (image: Image) => ({
    id: image.id,
    url: image.url,
});

export const mapRole = (role: Role) => ({
    id: role.id,
    label: role.label,
});

export const mapOrganizationMembership = (membership: OrganizationMembership): any => ({
    user: mapUser(membership.user),
    // disable rule as the function is exported
    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
    organization: mapOrganization(membership.organization),
    role: mapRole(membership.role),
});

export const mapOrganization = (organization: Organization): any => ({
    id: organization.id,
    name: organization.name,
    type: organization.type,
    description: organization.description,
    site: organization.site,
    email: organization.email,
    phone: organization.phone,
    facebook: organization.facebook,
    twitter: organization.twitter,
    linkedin: organization.linkedin,
    instagram: organization.instagram,
    projects: organization.projects,
    parentOrganizations: organization.parentOrganizations,
    members: organization.members.map(mapOrganizationMembership),
});

export const mapProject = (project: Project) => ({
    budget: project.budget,
    categories: project.categories,
    contributors: project.contributors.map(mapProjectContribution),
    createdAt: project.createdAt,
    description: project.description,
    id: project.id,
    images: project.images.map(mapImage),
    location: project.location,
    organizations: project.organizations.map(mapOrganization),
    participatoryBudgetYear: project.participatoryBudgetYear,
    posts: project.posts.map(mapPost),
    startDate: project.startDate,
    status: mapProjectStatus(project.status),
    title: project.title,
});

export const mapEnvironment = (env: NodeJS.ProcessEnv) => ({
    googleMapsKey: env.GOOGLE_MAPS_KEY,
    uploadcarePublicKey: env.UPLOADCARE_PUBLIC_KEY,
});
