import './group-matches.css';
import React from 'react';
import { useCsvData } from '../../services/CsvDataContext';
import { useLocation, useParams } from 'react-router-dom';

function GroupMatches() {

    //const { groupName } = useParams<{ groupName: string }>();
    const { data } = useCsvData();

    const location = useLocation();
    const state = location.state as { groupName?: string; teams?: { id: number; name: string }[] };
    const groupName = state?.groupName || 'Unknown Group';
    const teams = state?.teams || [];
    let matchesInGroup: any[] = [];
    let finalMatchesFromTheGroup: any[] = [];

    let countryTotalPoints: any[] = [];

    let winnersFroGroup: any[] = [];

    for (let i = 0; i < data.matches.length; i++) {

        if (i <= 36) {
            matchesInGroup.push(data.matches[i]);

        }

    }



    if (state.teams) {

        for (let i = 0; i < state.teams.length; i++) {

            countryTotalPoints.push({
                id: state.teams[i].id,
                name: state.teams[i].name,
                points: 0,
                goalsPlus: 0,
                goalsOut: 0,
                balance: 0
            });

        }

        for (let i = 0; i < state.teams.length; i++) {

            for (let k = 0; k < matchesInGroup.length; k++) {

                if (state.teams[i].id == matchesInGroup[k][1]) {
                    let BTeamName = '';

                    for (let j = 0; j < state.teams.length; j++) {

                        if (state.teams[j].id == matchesInGroup[k][2]) {
                            BTeamName = state.teams[j].name;

                        }

                    }

                    let resultString = matchesInGroup[k][4].split('\r')[0];
                    let ATeamScore: number = Number(resultString.split('-')[0]);
                    let BTeamScore: number = Number(resultString.split('-')[1]);
                    let WinnerID;
                    let WinnerName;

                    if (ATeamScore > BTeamScore) {
                        WinnerID = matchesInGroup[k][1];
                        WinnerName = state.teams[i].name

                        for (let m = 0; m < countryTotalPoints.length; m++) {

                            if (countryTotalPoints[m].id == WinnerID) {
                                countryTotalPoints[m].points += 3;
                                countryTotalPoints[m].goalsPlus += ATeamScore;
                                countryTotalPoints[m].goalsOut += BTeamScore;
                            }

                        }

                    } else if (ATeamScore < BTeamScore) {
                        WinnerID = matchesInGroup[k][2];
                        WinnerName = BTeamName

                        for (let m = 0; m < countryTotalPoints.length; m++) {

                            if (countryTotalPoints[m].id == WinnerID) {
                                countryTotalPoints[m].points += 3;
                                countryTotalPoints[m].goalsPlus += BTeamScore;
                                countryTotalPoints[m].goalsOut += ATeamScore;
                            }

                        }

                    } else if (ATeamScore == BTeamScore) {
                        WinnerID = null;
                        WinnerName = null

                        for (let m = 0; m < countryTotalPoints.length; m++) {

                            if (countryTotalPoints[m].id == matchesInGroup[k][1]) {
                                countryTotalPoints[m].points += 1;
                                countryTotalPoints[m].goalsPlus += ATeamScore;
                                countryTotalPoints[m].goalsOut += BTeamScore;

                            }

                            if (countryTotalPoints[m].id == matchesInGroup[k][2]) {
                                countryTotalPoints[m].points += 1;
                                countryTotalPoints[m].goalsPlus += BTeamScore;
                                countryTotalPoints[m].goalsOut += ATeamScore;

                            }

                        }

                    }

                    finalMatchesFromTheGroup.push({
                        ID: Number(matchesInGroup[k][0]),
                        ATeamID: Number(matchesInGroup[k][1]),
                        BTeamID: Number(matchesInGroup[k][2]),
                        Date: matchesInGroup[k][3],
                        Result: matchesInGroup[k][4].split('\r')[0],
                        ATeamName: state.teams[i].name,
                        BTeamName: BTeamName,
                        WinnerID: Number(WinnerID),
                        WinnerName: WinnerName
                    });

                }

            }

        }

    }

    // Setting up goal differences
    for (let i = 0; i < countryTotalPoints.length; i++) {

        countryTotalPoints[i].balance = countryTotalPoints[i].goalsPlus - countryTotalPoints[i].goalsOut

    }

    const sortedTeams = countryTotalPoints.sort((a, b) => {

        if (b.points !== a.points) {
            return b.points - a.points;

        } else {
            return b.balance - a.balance;

        }

    });

    const topTwoTeams = sortedTeams.slice(0, 2);

    console.log('topTwoTeams: ', topTwoTeams);
    console.log('finalMatchesFromTheGroup: ', finalMatchesFromTheGroup);
    console.log('countryTotalPoints: ', countryTotalPoints);


    console.log('state: ', state);

    return (
        <>
            <div className="match-list">
                {finalMatchesFromTheGroup.map((match) => {
                    const isDraw = match.WinnerID === 0; // Проверка за равенство по WinnerID

                    return (
                        <div key={match.ID} className="match-card">
                            <div className="match-info">
                                <div className="teams">
                                    <div className="team team-a">
                                        <span>{match.ATeamName}</span>
                                    </div>
                                    <div className="score">
                                        <span>{match.Score}</span>
                                    </div>
                                    <div className="team team-b">
                                        <span>{match.BTeamName}</span>
                                    </div>
                                </div>
                                <div className="match-meta">
                                    <span className="date">Date: {match.Date}</span>
                                    {isDraw ? (
                                        <span className="draw">Draw</span>
                                    ) : (
                                        <span className="winner">Winner: {match.WinnerName}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="qualified-teams">
                <h2>Qualified Teams</h2>
                <ul>
                    {topTwoTeams.map((team) => (
                        <li key={team.id}>
                            <span>{team.name}</span> - Points: {team.points}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default GroupMatches;