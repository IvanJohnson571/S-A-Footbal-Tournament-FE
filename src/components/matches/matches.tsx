import React, { useEffect, useState } from 'react';
import './matches.css';
import { Link } from 'react-router-dom';
import Groups from '../groups/groups';
import BracketsOne from '../brackets-view/brackets-one';
import BracketsTwo from '../brackets-view/brackets-two';
import BracketsThree from '../brackets-view/brackets-three';
import trophy from '../../assets/trophy.png'
import { get } from '../../services/requester.service';
import Loader from '../loader/loader';

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
        return <Loader />
    }

    const handleShrink = () => {
        setShrink(!isShrink);
    };


    return (
        <><div className="matches-wrap">
            {!isViewA ? <div>
                <Groups />
            </div> :
                <div className={`wrapper ${isShrink ? 'shrink' : ''}`}>
                    <div className="bracket-container">
                        {sixteenFinalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>
                                <Link
                                    key={round.id}
                                    to={`/match-pair/${round.ateamId}/${round.bteamId}`}
                                    state={{ roundData: round }}>
                                    <div className="match" key={round.id}>

                                        <div className="team">
                                            <div >{round.ateamName}</div>
                                            <div>{round.score.split('-')[0]}</div>
                                        </div>
                                        <div className="team">
                                            <div >{round.bteamName}</div>
                                            <div>{round.score.split('-')[1]}</div>
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
                                <Link
                                    key={round.id}
                                    to={`/match-pair/${round.ateamId}/${round.bteamId}`}
                                    state={{ roundData: round }}>
                                    <div className="match" key={round.id}>
                                        <div className="team">
                                            <div >{round.ateamName}</div>
                                            <div>{round.score.split('-')[0]}</div>
                                        </div>
                                        <div className="team">
                                            <div >{round.bteamName}</div>
                                            <div>{round.score.split('-')[1]}</div>
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
                                <Link
                                    key={round.id}
                                    to={`/match-pair/${round.ateamId}/${round.bteamId}`}
                                    state={{ roundData: round }}>
                                    <div className="match" key={round.id}>
                                        <div className="team">
                                            <div >{round.ateamName}</div>
                                            <div>{round.score.split('-')[0]}</div>
                                        </div>
                                        <div className="team">
                                            <div >{round.bteamName}</div>
                                            <div>{round.score.split('-')[1]}</div>
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
                                <Link
                                    key={round.id}
                                    to={`/match-pair/${round.ateamId}/${round.bteamId}`}
                                    state={{ roundData: round }}>
                                    <div className="match" key={round.id}>
                                        <div className="team">
                                            <div >{round.ateamName}</div>
                                            <div>{round.score.split('-')[0]}</div>
                                        </div>
                                        <div className="team">
                                            <div >{round.bteamName}</div>
                                            <div>{round.score.split('-')[1]}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="bracket-container space-around" style={{ marginLeft: '' }}>
                        {finalsList.map((round, roundIndex) => (
                            <div className="round" key={roundIndex}>

                                <div className="match finalist" key={round.id} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                    <div className="team" style={{ justifyContent: 'center' }}>
                                        <span>{round.winnerName}</span>
                                    </div>
                                </div>
                                <img src={trophy} alt="Winner" className="winner-image" />
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