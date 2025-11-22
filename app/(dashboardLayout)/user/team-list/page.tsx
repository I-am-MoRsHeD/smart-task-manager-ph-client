import { getAllTeams } from '@/app/services/team/getTeams';
import TeamList from '@/components/modules/team/TeamList';
import PageTitle from '@/components/shared/PageTitle';
import React from 'react';

const TeamListPage = async () => {
    const teams = await getAllTeams();

    return (
        <div>
            <PageTitle title='All Teams' />
            <div className='my-5'>
                <TeamList teams={teams} />
            </div>
        </div>
    );
};

export default TeamListPage;