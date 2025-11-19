import CreateTeamForm from '@/components/modules/team/CreateTeamForm';
import PageTitle from '@/components/shared/PageTitle';
import React from 'react';

const CreateTeamPage = () => {
    return (
        <div>
            <PageTitle title='Create Team' />
            <div>
                <CreateTeamForm />
            </div>
        </div>
    );
};

export default CreateTeamPage;