import React, { useEffect, useState } from 'react';
import './match-pair.css';
import playground from '../../assets/field.jpg'
import { get } from '../../services/requester.service';
import { useParams } from 'react-router-dom';
import { log } from 'console';


const players = [
    { number: 1, position: { top: '10%', left: '5%' } },
    { number: 2, position: { top: '30%', left: '10%' } },
    { number: 3, position: { top: '50%', left: '10%' } },
    { number: 4, position: { top: '70%', left: '10%' } },
    { number: 5, position: { top: '90%', left: '5%' } },
    { number: 6, position: { top: '30%', left: '40%' } },
    { number: 7, position: { top: '50%', left: '40%' } },
    { number: 8, position: { top: '70%', left: '40%' } },
    { number: 9, position: { top: '30%', right: '40%' } },
    { number: 10, position: { top: '50%', right: '40%' } },
    { number: 11, position: { top: '70%', right: '40%' } },
];

interface Player {
    id: number;
    fullName: string;
    position: string;
    teamId: number;
}

const MatchPair: React.FC = () => {
    const { teamAId, teamBId } = useParams<{ teamAId: string; teamBId: string }>();
    const [teamAPlayers, setTeamAPlayers] = useState<Player[]>([]);
    const [teamBPlayers, setTeamBPlayers] = useState<Player[]>([]);
    const [matches, setMatches] = useState([]);

    const getRecords = async () => {
        try {
            let data = await get(`api/players/teams/${teamAId}/${teamBId}`);
            setTeamAPlayers(data.TeamAPlayers);
            setTeamBPlayers(data.TeamBPlayers);
            console.log('2 teams!!! ', data);
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

    return (
        <>
            <div className='field-wrap'>
                <div className="ground-image">
                    <img src={playground} alt="playground" />
                    <div className="player" style={{ top: "10%", left: "20%" }}>Player 1</div>
                    <div className="player" style={{ top: "30%", left: "40%" }}>Player 2</div>
                    <div className="player" style={{ bottom: "15%", right: "25%" }}>Player 3</div>
                </div>
                <div className="ground-image">
                    <img src={playground} alt="playground" />
                </div>
            </div>
        </>
    );
};

export default MatchPair;