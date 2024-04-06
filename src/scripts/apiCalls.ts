import { Globals } from "./Globals";

// Define a TypeScript interface to represent the structure of the fetched data
export interface GameData {
    gameName: string;
    gameId: string;
    gameThumbnailUrl: string;
    gameHostLink: string;
    isHot : boolean,
    isNew : boolean
}

// Function to fetch data from the API and group games based on game names
export function fetchDataAndGroup(): Promise<{ [gameName: string]: GameData[][] }[]> {
    return new Promise<{ [gameName: string]: GameData[][] }[]>((resolve, reject) => {
        fetch('https://660531842ca9478ea17fa17b.mockapi.io/appGameData')
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                return response.json() as Promise<GameData[]>;
            })
            .then( data => {
                //   Parse the JSON response
     

        // Process the retrieved data
        const results: GameData[][] = [];

        // Iterate through the JSON data
        data.forEach(obj => {
            // Get all keys in the current object
            const keys = Object.keys(obj);

            // Iterate through keys and push the values into the result array
            keys.forEach(key => {
                const gamesArray = (obj as any)[key] as GameData[];
                if (gamesArray) {
                    results.push([...gamesArray]);
                }
            });
        });

        // Store the filtered data in the Globals object
        // resolve(results);
        Globals.gameData = results;
        console.log(results);
        })
            .catch(error => {
                reject(error);
            });
    });
}




  
