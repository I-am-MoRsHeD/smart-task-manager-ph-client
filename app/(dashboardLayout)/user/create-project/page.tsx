import { getAllTeams } from '@/app/services/team/getTeams';
import CreateProjectForm from '@/components/modules/project/CreateProjectForm';
import PageTitle from '@/components/shared/PageTitle';
import React from 'react';

const CreateProjectPage = async () => {
    const teams = await getAllTeams();


    return (
        <div>
            <PageTitle title='Create Project' />
            <div>
                <CreateProjectForm teams={teams} />
            </div>
        </div>
    );
};

export default CreateProjectPage;