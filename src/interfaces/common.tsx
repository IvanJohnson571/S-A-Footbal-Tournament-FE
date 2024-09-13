
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

export interface Match {
    team1: string;
    team2: string;
    score1: number;
    score2: number;
}

export interface BracketProps {
    matches: Match[][];
}

export interface TeamModalProps {
    teamId: string | null;
    startingPlayers: { id: number; fullName: string; position: string }[];
    teamName: string | null;

    onClose: () => void;
}