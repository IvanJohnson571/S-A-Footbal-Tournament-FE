import { REACT_APP_API_URL } from "../constants";

export const fetchMultipleCsvFiles = async (filePaths: string[]): Promise<{ [key: string]: string[][] }> => {
    try {

        const filePromises = filePaths.map(async (path) => {

            const response = await fetch(path);
            const csvText = await response.text();
            const rows = csvText.split('\n');
            const parsedData = rows.map(row => row.split(','));

            let name: any = path.split('/');
            name = name[3].split('.');
            name = name[0];

            return { [name]: parsedData };

        });

        const results = await Promise.all(filePromises);

        return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    } catch (error) {

        console.error('Error fetching the data:', error);

        return {};

    }

};

export const get = async (endpoint: string) => {

    try {

        const response = await fetch(REACT_APP_API_URL + endpoint);

        if (!response.ok) {
            throw new Error('Network response was not ok');

        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error('Error fetching data:', error);

        throw error;

    }

};

export const postPlusData = async (entryData: any, endpoint: string) => {
    try {
        const response = await fetch(REACT_APP_API_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entryData),
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error fetching data:', error);

    }
};