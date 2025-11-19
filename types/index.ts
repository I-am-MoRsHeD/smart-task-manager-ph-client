

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
}

export interface ITeam {
    _id: string;
    name: string;
    createdBy: IUser;
    members: IMember[]
};