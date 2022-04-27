import Layout from '@design/layouts/Layout';
import ThreeColsLayout, { MenuItem } from '@design/layouts/ThreeCols';
import Loader from '@design/Loader';
import Tag from '@design/Tag';
import Paragraph from '@design/texts/Paragraph';
import { H2 } from '@design/titles';
import H3 from '@design/titles/H3';
import useSelector from '@hooks/useSelector';
import useThunkDispatch from '@hooks/useThunkDispatch';
import { castToProjectTab, goToProject, ProjectTab } from '@router/AppRoutes';
import { getOne } from '@store/projects/actions';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';

const ProjectPage = () => {
    const projectId = useParams().projectId ?? '';
    const [query] = useSearchParams();
    const selectedTab = query.get('tab') ? castToProjectTab(query.get('tab')!) : ProjectTab.general;
    const [tab] = useState<ProjectTab>(selectedTab);
    const project = useSelector((state) => state.projects.data.find((p) => p.id === projectId));
    const dispatch = useThunkDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (!project) {
            dispatch(getOne(projectId));
        }
    }, []);

    if (!project) {
        return (
            <Layout className='flex-row'>
                <Loader />
            </Layout>
        );
    }

    const left = (
        <>
            <H2 className='pb-3'>{project.title}</H2>
            <Tag className='mb-6'>{project.themes[0]}</Tag>
            <span className='text-sm leading-4 opacity-70'>{project.location}</span>
        </>
    );

    const menuItems: MenuItem[] = [
        {
            href: goToProject(project.id, ProjectTab.general),
            iconName: 'map',
            isActive: tab === ProjectTab.general,
        },
        {
            href: goToProject(project.id, ProjectTab.statistics),
            iconName: 'stats',
            isActive: tab === ProjectTab.statistics,
        },
    ];

    return (
        <ThreeColsLayout left={left} menuItems={menuItems}>
            <div className='pt-16 px-16 flex items-start'>
                <div className='flex flex-col mr-16 w-full'>
                    <H3 className='pb-8'>{t('project_details_title')}</H3>
                    <Paragraph>{project.description}</Paragraph>
                </div>
                <div className='grid grid-cols-2 gap-1 w-full max-w-xs'>
                    {project.images.map((src) => (
                        <img key={src} alt='project' src={src} />
                    ))}
                </div>
            </div>
        </ThreeColsLayout>
    );
};

export default ProjectPage;