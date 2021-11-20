export default interface IAdmin {
    id_admin: number;
    username: string;
    password: string;
    role: 'admin' | 'read-only';
}

export type IAdminInfo = Pick<IAdmin, 'username'>;