
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
            //console.log('name: ', name);


            return { [name]: parsedData };

        });

        const results = await Promise.all(filePromises);

        return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    } catch (error) {

        console.error('Error fetching the data:', error);

        return {};

    }

};

