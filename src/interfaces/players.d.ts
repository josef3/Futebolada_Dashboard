export default interface IPlayer {
    id_player: number;
    first_name: string;
    last_name: string;
    avatar: string;
    username: string;
    // password: string;
}

export type IWeekPlayer = Omit<IPlayer, 'username' | 'password'>;