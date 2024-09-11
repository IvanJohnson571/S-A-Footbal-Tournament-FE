
export interface CsvDataProviderProps {
    children: React.ReactNode;
}

export interface CsvDataContextType {
    data: dataModel;
    loadData: () => void;
}

export interface dataModel {
    matches: string[][];
    players: string[][];
    records: string[][];
    teams: string[][];

}

export interface Player {
    id: number;
    fullName: string;
    position: string;
    teamId: number;
}