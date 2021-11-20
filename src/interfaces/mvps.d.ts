export default interface IMvp {
    id_mvp: number;
    id_week: number;
    id_player: number;
    percentage: number;
}

export type IMvpInfo = IMvp & Pick<IPlayer, 'first_name' | 'last_name' | 'avatar'>;