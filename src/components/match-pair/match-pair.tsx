import React, { useEffect, useState } from 'react';
import './match-pair.css';
import playground from '../../assets/field.jpg'
import { get } from '../../services/requester.service';
import { useLocation, useParams } from 'react-router-dom';
import { fixedPositions, NamesStyles } from './constants';
import { Player } from '../../interfaces/common';
import { formatDate } from '../../services/dateFormats';

const MatchPair: React.FC = () => {

    const { teamAId, teamBId } = useParams<{ teamAId: string; teamBId: string }>();
    const [teamAPlayers, setTeamAPlayers] = useState<Player[]>([]);
    const [teamBPlayers, setTeamBPlayers] = useState<Player[]>([]);
    const [startingAPlayers, setStartingAPlayers] = useState<Player[]>([]);
    const [startingBPlayers, setStartingBPlayers] = useState<Player[]>([]);
    const [matches, setMatches] = useState([]);
    const location = useLocation();
    const { roundData } = location.state;
    let teamAData: any[] = [];
    let teamBData: any[] = [];

    const getRecords = async () => {
        try {

            let data = await get(`api/players/teams/${teamAId}/${teamBId}`);
            teamAData = data.TeamAPlayers;
            teamBData = data.TeamBPlayers;
            setStartingAPlayers(teamAData.slice(0, 11));
            setStartingBPlayers(teamBData.slice(0, 11));
            setTeamAPlayers(data.TeamAPlayers);
            setTeamBPlayers(data.TeamBPlayers);
            setMatches(data);

        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    };

    useEffect(() => {
        if (teamAId && teamBId) {
            getRecords();
        }
    }, [teamAId, teamBId]);

    const getFixedPosition = (index: number) => {
        return fixedPositions[index] || { top: '0%', left: '0%' };
    };

    const getFixedNmes = (index: number) => {
        return NamesStyles[index] || { top: '0%', left: '0%' };
    };

    return (
        <>
            <div className="match-pair-wrap">
                <div className="match-info">
                    <div className="team-names">
                        <h1>{roundData.ateamName ? roundData?.ateamName : roundData.aTeamName} <span>vs</span> {roundData.bteamName ? roundData?.bteamName : roundData.bTeamName}</h1>
                        <p className="match-date">{formatDate(roundData?.date)}</p>
                    </div>
                    <div className="match-details">
                        <p className="match-score">
                            <strong>{roundData.score ? roundData?.score.split('-')[0] : roundData?.result.split('-')[0]}{' - '}</strong>
                            <strong>{roundData.score ? roundData?.score.split('-')[1] : roundData?.result.split('-')[1]}</strong></p>
                        <p className="match-winner">Winner: <strong>{roundData.winnerName ? roundData?.winnerName : roundData.winnerName}</strong></p>
                    </div>
                </div>
                <div className='field-wrap'>
                    <div className="ground-image">
                        <img src={playground} alt="playground" />
                        {startingAPlayers.map((player, index) => (
                            <div key={player.id}>
                                <div className="player-name " style={getFixedNmes(index)}>{player.fullName.split(' ')[1]}</div>
                                <div
                                    className="player"
                                    style={getFixedPosition(index)}
                                >
                                    {player.position}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="ground-image">
                        <img src={playground} alt="playground" />
                        {startingBPlayers.map((player, index) => (
                            <div key={player.id}>
                                <div className="player-name " style={getFixedNmes(index)}>{player.fullName.split(' ')[1]}</div>
                                <div
                                    className="player"
                                    style={getFixedPosition(index)}
                                >
                                    {player.position}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MatchPair;