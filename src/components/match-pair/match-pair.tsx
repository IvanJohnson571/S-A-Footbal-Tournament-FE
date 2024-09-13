import { useLocation, useParams } from 'react-router-dom';
import Loader from '../loader/loader';
import React, { useEffect, useState } from 'react';
import './match-pair.css';
import playground2 from '../../assets/pitch-bg.svg';
import { get } from '../../services/requester.service';
import { fixedPositions, NamesStyles } from './constants';
import { Player } from '../../interfaces/common';
import { formatDate } from '../../services/dateFormats';
import TeamModal from '../modals/team/team';

const MatchPair: React.FC = () => {

    const { teamAId, teamBId } = useParams<{ teamAId: string; teamBId: string }>();
    const [teamAPlayers, setTeamAPlayers] = useState<Player[]>([]);
    const [teamBPlayers, setTeamBPlayers] = useState<Player[]>([]);
    const [startingAPlayers, setStartingAPlayers] = useState<Player[]>([]);
    const [startingBPlayers, setStartingBPlayers] = useState<Player[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [matches, setMatches] = useState([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [coachA, setCoachA] = useState<string>('');
    const [coachB, setCoachB] = useState<string>('');
    const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);
    const [currentTeamName, setCurrentTeamName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
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
        const loadTeams = async () => {
            try {

                let data = await get('api/teams');

                data.forEach((element: any) => {

                    let idOne = roundData.ateamId ? roundData?.ateamId : roundData.aTeamId

                    if (idOne == element.id) {
                        setCoachA(element.managerFullName);

                    }
                    let inTwo = roundData.bteamId ? roundData?.bteamId : roundData.bTeamId
                    if (inTwo == element.id) {
                        setCoachB(element.managerFullName);

                    }
                });

                setTeams(data);
            } catch (err) {
                setError('Failed to fetch teams');
            } finally {
                setIsLoading(false);
            }
        };

        loadTeams();
    }, []);

    useEffect(() => {
        if (teamAId && teamBId) {
            getRecords();
        }
    }, [teamAId, teamBId]);

    const openModal = (teamId: string, teamName: string) => {
        setCurrentTeamId(teamId);
        setCurrentTeamName(teamName);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentTeamId(null);
        setCurrentTeamName(null);
    };

    const getFixedPosition = (index: number) => {
        return fixedPositions[index] || { top: '0%', left: '0%' };
    };

    const getFixedNmes = (index: number) => {
        return NamesStyles[index] || { top: '0%', left: '0%' };
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="match-pair-wrap">
                <div className="match-info" style={{ gap: '0px' }}>
                    <div className="team-names">
                        <p className="match-date">{formatDate(roundData?.date)}</p>
                        <div className="score-main">
                            <h1 className="width-33 team-one">{roundData.ateamName ? roundData?.ateamName : roundData.aTeamName}</h1>
                            <div className="match-details width-33">
                                <p className="match-score">
                                    <div className="strong">{roundData.score ? roundData?.score.split('-')[0] : roundData?.result.split('-')[0]}
                                    </div>
                                    <span>-</span>
                                    <div className="strong">{roundData.score ? roundData?.score.split('-')[1] : roundData?.result.split('-')[1]}</div>
                                </p>
                            </div>
                            <h1 className="width-33">{roundData.bteamName ? roundData?.bteamName : roundData.bTeamName}</h1>
                        </div>
                    </div>
                </div>
                <div className='field-wrap'>
                    <div className="ground-image">
                        <div className="team-head">
                            <div style={{ width: '68%' }}>
                                <div className="teamName">{roundData.ateamName ? roundData?.ateamName : roundData.aTeamName}</div>
                                <div className="overflow-hidden">Coach: {coachA}</div>
                            </div>
                            <div className="view-team-button-wrap">
                                <button className="team-button" onClick={() => openModal(teamAId!, roundData.ateamName ? roundData?.ateamName : roundData.aTeamName)}>
                                    <span>View Team</span>
                                </button>
                            </div>
                        </div>
                        <img src={playground2} alt="playground" />
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
                        <div className="team-head">

                            <div style={{ width: '68%' }}>
                                <div className="teamName">{roundData.bteamName ? roundData?.bteamName : roundData.bTeamName}</div>
                                <div className="overflow-hidden">Coach: {coachB}</div>
                            </div>
                            <div className="view-team-button-wrap">
                                <button className="team-button" onClick={() => openModal(teamBId!, roundData.bteamName ? roundData?.bteamName : roundData.bTeamName)}>
                                    <span>View Team</span>
                                </button>
                            </div>
                        </div>
                        <img src={playground2} alt="playground" />
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

                {showModal && (
                    <TeamModal
                        teamId={currentTeamId}
                        teamName={currentTeamName}
                        startingPlayers={currentTeamId === teamAId ? startingAPlayers : startingBPlayers}
                        onClose={closeModal}
                    />
                )}
            </div>
        </>
    );
};

export default MatchPair;
