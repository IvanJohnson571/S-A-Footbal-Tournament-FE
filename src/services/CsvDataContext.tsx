import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchMultipleCsvFiles } from './requester.service';
import { CsvDataContextType, CsvDataProviderProps } from '../interfaces/common';

const CsvDataContext = createContext<CsvDataContextType | undefined>(undefined);

export const useCsvData = () => {
    const context = useContext(CsvDataContext);
    if (!context) {
        throw new Error('There is a Error!');
    }
    return context;
};

export const CsvDataProvider: React.FC<CsvDataProviderProps> = ({ children }) => {

    const [data, setData] = useState<{ [key: string]: string[][] }>({});

    const loadData = async () => {
        const filePaths = [
            '../../csv_files/teams.csv',
            '../../csv_files/records.csv',
            '../../csv_files/players.csv',
            '../../csv_files/matches.csv',
        ];

        const csvData = await fetchMultipleCsvFiles(filePaths);
        setData(csvData);

    };

    useEffect(() => {

        loadData();

    }, []);

    return (
        <CsvDataContext.Provider value={{ data, loadData }}>
            {children}
        </CsvDataContext.Provider>
    );

};