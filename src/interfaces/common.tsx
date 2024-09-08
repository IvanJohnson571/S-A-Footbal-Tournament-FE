
export interface CsvDataProviderProps {
    children: React.ReactNode;
}

export interface CsvDataContextType {
    data: dataModel;
    loadData: () => void;
}

interface dataModel {
    matches: string[][];
    players: string[][];
    records: string[][];
    teams: string[][];

}