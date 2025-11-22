import { getAllProjects } from '@/app/services/project/getAllProjects';
import { getAllTeams } from '@/app/services/team/getTeams';
import CreateProjectForm from '@/components/modules/project/CreateProjectForm';
import PageTitle from '@/components/shared/PageTitle';
import ProjectCard from '@/components/shared/ProjectCard';
import { IProject } from '@/types';
import Link from 'next/link';
import React from 'react';

const CreateProjectPage = async () => {
    const teams = await getAllTeams();
    const projects = await getAllProjects();

    return (
        <div>
            <PageTitle title='Create Project' />
            <div>
                <CreateProjectForm teams={teams} />
            </div>
            <div className='my-20 px-4 lg:px-0'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-bold'>Projects :</h1>
                    <Link href="/user/project-list">See all</Link>
                </div>
                <div
                    className={`my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}
                >
                    {
                        projects?.length < 1 ? (
                            <h1 className='text-2xl font-bold'>
                                You have no projects yet!
                            </h1>
                        ) : (
                            projects?.slice(0, 3)?.map((project: IProject) => (
                                <ProjectCard key={project._id} project={project} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;