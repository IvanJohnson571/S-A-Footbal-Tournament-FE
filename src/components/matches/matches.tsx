import React, { useEffect, useState } from 'react';
import './matches.css';
import { useCsvData } from '../../services/CsvDataContext';
import { Link } from 'react-router-dom';
import Groups from '../groups/groups';
import BracketsOne from '../brackets-view/brackets-one';
import BracketsTwo from '../brackets-view/brackets-two';
import BracketsThree from '../brackets-view/brackets-three';
import trophy from '../../assets/trophy.png'
import { get } from '../../services/requester.service';
import { log } from 'console';

interface Match {
    team1: string;
    team2: string;
    score1: number;
    score2: number;
}

interface BracketProps {
    matches: Match[][];
}

const Matches: React.FC = () => {

    const [isViewA, setIsViewA] = useState(true);
    const [isShrink, setShrink] = useState(false);
    const [eightFinalsList, setEightFinalsList] = useState<any[]>([]);
    const [forthFinalsList, setForthFinalsList] = useState<any[]>([]);
    const [semiFinalsList, setSemiFinalsList] = useState<any[]>([]);
    const [finalsList, setFinalsList] = useState<any[]>([]);
    const [sixteenFinalsList, setSixteenFinalsList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function toggleView(state: boolean) {
        setIsViewA(state);
    }

    const getFinals = async () => {
        try {
            let data = await get('api/finals');
            const finalsTeamsList = data;
            console.log('finalsTeamsList: ', finalsTeamsList);
            const eightFinals = finalsTeamsList.SixteenFinals;
            const forthFinals = finalsTeamsList.ForthFinals;
            const semiFinals = finalsTeamsList.SemiFinals;
            const finals = finalsTeamsList.Finals;

            setEightFinalsList(eightFinals);
            setForthFinalsList(forthFinals);
            setSemiFinalsList(semiFinals);
            setFinalsList(finals);

            const sixteenFinals = [
                eightFinals[3],
                eightFinals[1],
                eightFinals[5],
                eightFinals[4],
                eightFinals[2],
                eightFinals[0],
                eightFinals[6],
                eightFinals[7]
            ];

            setSixteenFinalsList(sixteenFinals);

        } catch (error) {
            console.error('Error fetching matches:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFinals();
    }, []);

    if (isLoading) {
        return <div>Loading finals data...</div>;
    }

    const handleShrink = () => {
        setShrink(!isShrink);
    };


    return (
        <><div className="matches-wrap">
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
                <div className={`wrapper ${isShrink ? 'shrink' : ''}`}>
                    <div className="bracket-container">
                        {sixteenFinalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <Link key={round.id} to={`/match-pair/${round.ateamId}/${round.bteamId}`}>
                                    <div className="match" key={round.id}>

                                        <div className="team">
                                            <span >{round.ateamName}</span>
                                        </div>
                                        <div className="team">
                                            <span >{round.bteamName}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <BracketsOne />
                    <div className="bracket-container space-around" style={{ marginLeft: '0px' }}>
                        {forthFinalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <Link key={round.id} to={`/match-pair/${round.id}`}>
                                    <div className="match" key={round.id}>
                                        <div className="team">
                                            <span >{round.ateamName}</span>
                                        </div>
                                        <div className="team">
                                            <span >{round.bteamName}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <BracketsTwo />
                    <div className="bracket-container space-around" style={{ marginLeft: '0px' }}>
                        {semiFinalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <Link key={round.id} to={`/match-pair/${round.id}`}>
                                    <div className="match" key={round.id}>
                                        <div className="team">
                                            <span >{round.ateamName}</span>
                                        </div>
                                        <div className="team">
                                            <span >{round.bteamName}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <BracketsThree />
                    <div className="bracket-container space-around">
                        {finalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <Link key={round.id} to={`/match-pair/${round.id}`}>
                                    <div className="match" key={round.id}>
                                        <div className="team">
                                            <span >{round.ateamName}</span>
                                        </div>
                                        <div className="team">
                                            <span >{round.bteamName}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="bracket-container space-around">
                        {finalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <div className="match" key={round.id} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <img src={trophy} alt="Winner" className="winner-image" />
                                    <div className="team">
                                        <span>{round.winnerName}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
        </>
    );
};

export default Matches;