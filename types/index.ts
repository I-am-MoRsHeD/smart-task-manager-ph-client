
export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = "DONE"
};

export enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = 'HIGH'
};


export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "USER";
};

export interface IMember {
    member_no: number;
    name: string;
    role: string;
    capacity: number;
    currentTask: number;
}

export interface ITeam {
    _id: string;
    name: string;
    createdBy: IUser;
    members: IMember[]
};

export interface IProject {
    _id: string;
    name: string;
    linkedTeam: ITeam;
    creator: IUser;
    tasks?: ITask[]
};

export interface ITask {
    _id: string;
    title: string;
    description: string;
    assignedMember: IMember;
    priority?: TaskPriority;
    status?: TaskStatus;
    projectId: string
}