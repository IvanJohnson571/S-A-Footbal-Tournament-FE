import './group-matches.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { postPlusData } from '../../services/requester.service';
import { formatDate } from '../../services/dateFormats';
import Loader from '../loader/loader';

function GroupMatches() {

    const location = useLocation();
    const state = location.state as { groupName?: string; teams?: { id: number; name: string }[] };
    const [matchesCurrentGroup, setFinalGroupsList] = useState<any[]>([]);
    const [topTwoTeams, seTopTwoTeams] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRecords = async () => {

        let path: string = 'api/teams/group-details';
        let postData = state.teams;

        try {
            let data = await postPlusData(postData, path);
            setFinalGroupsList(data.finalMatchesFromTheGroup);
            seTopTwoTeams(data.topTwoTeams);
        } catch (error) {
            console.error('Error fetching groups:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        if (state) {
            getRecords();
        }

    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="match-list">
                {matchesCurrentGroup.map((match) => {
                    const isDraw = match.winnerId === null;

                    return (
                        <Link
                            key={match.id}
                            to={`/match-pair/${match.aTeamId}/${match.bTeamId}`}
                            state={{ roundData: match }}>
                            <div key={match.id} className="match-card">
                                <div className="match-info">
                                    <div className="teams">
                                        <div className="team team-left width-33 flex-right">
                                            <span>{match.aTeamName}</span>
                                        </div>
                                        <div className="score width-33">
                                            <span>{match.result}</span>
                                        </div>
                                        <div className="team team-right width-33 flex-left">
                                            <span>{match.bTeamName}</span>
                                        </div>
                                    </div>
                                    <div className="match-meta">
                                        <span className="date">{formatDate(match?.date)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
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