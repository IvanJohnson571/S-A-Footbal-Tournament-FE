import React, { useState } from 'react';
import './matches.css';
import { useCsvData } from '../../services/CsvDataContext';
import { Link } from 'react-router-dom';
import Groups from '../groups/groups';

interface Match {
    team1: string;
    team2: string;
    score1: number;
    score2: number;
}

interface BracketProps {
    matches: Match[][];
}

const Matches: React.FC<BracketProps> = () => {

    const { data } = useCsvData();
    const [isViewA, setIsViewA] = useState(true);

    let matchesAfterGroups: any[] = [];
    let eightFinalsList: any[] = [];
    let forthFinalsList: any[] = [];
    let semiFinalsList: any[] = [];
    let finalsList: any[] = [];

    function toggleView(state: boolean) {
        setIsViewA(state); // Toggles the boolean value
        console.log(isViewA);

    };

    if (data.matches) {

        for (let i = 37; i < data.matches.length; i++) {

            let score: any;
            let ATeamName: string = '';
            let BTeamName: string = '';
            let WinnerName;
            let WinnerID;

            if (data.matches[i] && data.matches[i][4]) {
                score = data.matches[i][4].split('\r');
                score = score[0]

            }

            for (let k = 0; k < data.teams.length; k++) {

                if (data.matches[i][1] == data.teams[k][0]) {
                    ATeamName = data.teams[k][1];

                }


                if (data.matches[i][2] == data.teams[k][0]) {
                    BTeamName = data.teams[k][1];
                }

            }

            if (score) {
                let tempScoreArr = score.split('-');
                let tempScoreOne = tempScoreArr[0];
                let tempScoreTwo = tempScoreArr[1];
                let scoreInNumberA = Number(tempScoreOne);
                let scoreInNumberB = Number(tempScoreTwo);

                if (Number.isNaN(scoreInNumberA)) {

                    let regex = /\((\d+)\)/;
                    let matchOne = tempScoreOne.match(regex);
                    let matchTwo = tempScoreTwo.match(regex);

                    if (Number(matchOne[1]) > Number(matchTwo[1])) {
                        WinnerName = ATeamName;
                        WinnerID = data.matches[i][1];

                    } else {
                        WinnerName = BTeamName;
                        WinnerID = data.matches[i][2];

                    }

                } else {

                    if (scoreInNumberA > scoreInNumberB) {
                        WinnerName = ATeamName;
                        WinnerID = data.matches[i][1];

                    } else {
                        WinnerName = BTeamName;
                        WinnerID = data.matches[i][2];

                    }

                }
            }


            let newObjectData = {
                ID: data.matches[i][0],
                ATeamID: data.matches[i][1],
                ATeamName: ATeamName,
                BTeamID: data.matches[i][2],
                BTeamName: BTeamName,
                Date: data.matches[i][3],
                Score: score,
                WinnerName: WinnerName,
                WinnerID: WinnerID
            }

            if (i >= 37 && i <= 44) {
                eightFinalsList.push(newObjectData);
            }

            if (i >= 45 && i <= 48) {
                forthFinalsList.push(newObjectData);
            }

            if (i >= 49 && i <= 50) {
                semiFinalsList.push(newObjectData);
            }

            if (i == 51) {
                finalsList.push(newObjectData);
            }

            matchesAfterGroups.push(newObjectData);

        }

    }

    let sixteenFinalsList: any[] = [];

    if (eightFinalsList.length > 0) {
        sixteenFinalsList[0] = eightFinalsList[3];
        sixteenFinalsList[1] = eightFinalsList[1];
        sixteenFinalsList[2] = eightFinalsList[5];
        sixteenFinalsList[3] = eightFinalsList[4];
        sixteenFinalsList[4] = eightFinalsList[2];
        sixteenFinalsList[5] = eightFinalsList[0];
        sixteenFinalsList[6] = eightFinalsList[6];
        sixteenFinalsList[7] = eightFinalsList[7];
    }

    console.log('sixteenFinalsList: ', sixteenFinalsList);

    return (
        <>
            <div className="buttonsWrapper group">
                <div>
                    <button onClick={() => toggleView(false)}>
                        View in groups
                    </button>
                </div>

                <div>
                    <button onClick={() => toggleView(true)}>
                        View in finales
                    </button>
                </div>
            </div>


            {!isViewA ? <div>
                <Groups />
            </div> :
                <div className="wrapper">
                    <div className="bracket-container">
                        {sixteenFinalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <div className="match" key={round.ID}>
                                    <div className="team">
                                        <span className="score">{round.ATeamName}</span>
                                    </div>
                                    <div className="team">
                                        <span className="score">{round.BTeamName}</span>
                                    </div>
                                    <div className="connector"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bracket-container space-around">
                        {forthFinalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <div className="match" key={round.ID}>
                                    <div className="team">
                                        <span className="score">{round.ATeamName}</span>
                                    </div>
                                    <div className="team">
                                        <span className="score">{round.BTeamName}</span>
                                    </div>
                                    <div className="connector"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bracket-container space-around">
                        {semiFinalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <div className="match" key={round.ID}>
                                    <div className="team">
                                        <span className="score">{round.ATeamName}</span>
                                    </div>
                                    <div className="team">
                                        <span className="score">{round.BTeamName}</span>
                                    </div>
                                    <div className="connector"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bracket-container space-around">
                        {finalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <div className="match" key={round.ID}>
                                    <div className="team">
                                        <span className="score">{round.ATeamName}</span>
                                    </div>
                                    <div className="team">
                                        <span className="score">{round.BTeamName}</span>
                                    </div>
                                    <div className="connector"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bracket-container space-around">
                        {finalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <div className="match" key={round.ID}>
                                    <div className="team">
                                        <span className="score">{round.WinnerName}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            }



        </>

    );
};

export default Matches;