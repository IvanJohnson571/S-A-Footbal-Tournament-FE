import React, { createContext, useState, useContext } from 'react';

// Създаваме контекст за зареждане
const LoadingContext = createContext<{
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}>({
    isLoading: false,
    startLoading: () => { },
    stopLoading: () => { }
});

// Провайдър за LoadingContext
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);

    const startLoading = () => {
        setLoadingCount((prevCount) => prevCount + 1);
    };

    const stopLoading = () => {
        setLoadingCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const isLoading = loadingCount > 0;

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom hook за използване на LoadingContext
export const useLoading = () => useContext(LoadingContext);