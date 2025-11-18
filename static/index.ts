
interface INavInfo {
    title: string;
    url: string
}

export const navInfo: INavInfo[] = [
    {
        title: "Dashboard",
        url: '/user/dashboard'
    },
    {
        title: "Create Team",
        url: '/user/create-team'
    },
    {
        title: "Team List",
        url: '/user/team-list'
    },
    {
        title: "Create Project",
        url: '/user/create-project'
    },
    {
        title: "Project List",
        url: '/user/project-list'
    },
];
