export default interface IBestFive {
    id_mvp: number;
    id_week: number;
    id_player: number;
    field_position: number;
}

export type IBestFiveInfo = IBestFive & Pick<IPlayer, 'first_name' | 'last_name' | 'avatar'>;