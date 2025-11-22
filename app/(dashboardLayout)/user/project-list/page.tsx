import { getAllProjects } from '@/app/services/project/getAllProjects';
import PageTitle from '@/components/shared/PageTitle';
import ProjectCard from '@/components/shared/ProjectCard';
import { IProject } from '@/types';


const ProjectListPage = async () => {
    const projects = await getAllProjects();

    return (
        <div>
            <PageTitle title='All Projects' />
            <div className='my-20 px-4 lg:px-0'>
                <div
                    className={`my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}
                >
                    {
                        projects?.length < 1 ? (
                            <h1 className='text-2xl font-bold'>
                                You have no projects yet!
                            </h1>
                        ) : (
                            projects?.map((project: IProject) => (
                                <ProjectCard key={project._id} project={project} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjectListPage;