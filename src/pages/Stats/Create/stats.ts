type IStats = {
    id: 'goals'
    | 'assists'
    | 'shotsTarget'
    | 'totalShots'
    | 'tackles'
    | 'interceptions'
    | 'blocks'
    | 'nutmegsSuffered'
    | 'nutmegsMade';
    label: string
}

export const STATS: IStats[] = [
    { id: 'goals', label: 'Golos' },
    { id: 'assists', label: 'Assistências' },
    { id: 'shotsTarget', label: 'Remates Enquadrados' },
    { id: 'totalShots', label: 'Total Remates' },
    { id: 'tackles', label: 'Desarmes' },
    { id: 'interceptions', label: 'Recuperações' },
    { id: 'blocks', label: 'Bloqueios' },
    { id: 'nutmegsSuffered', label: 'Cuecas Sofridas' },
    { id: 'nutmegsMade', label: 'Cuecas Efetuadas' },
];