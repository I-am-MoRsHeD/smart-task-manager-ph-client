/* eslint-disable @typescript-eslint/no-explicit-any */

import { getProjectById } from "@/app/services/project/getProjectById";
import ProjectDetailsCard from "@/components/shared/ProjectDetailsCard";


interface IProps {
    params: Promise<any>
};

const ProjectDetailsPage = async ({ params }: IProps) => {
    const { id } = await params;
    const project = await getProjectById(id);

    return (
        <div>
            <ProjectDetailsCard project={project} />
        </div>
    );
};

export default ProjectDetailsPage;