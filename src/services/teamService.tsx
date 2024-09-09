import axios from 'axios';

// Определяме типа на данните, които ще получим
export interface Team {
    id: number;
    name: string;
    managerFullName: string;
    groupName: string;
}

// Функция за извличане на всички отбори от API-то
export const fetchTeams = async (): Promise<Team[]> => {
    const response = await axios.get<Team[]>('http://localhost:8080/teams');
    return response.data;
};