import React, { useEffect, useState } from 'react';
import './groups.css';
import { Link } from 'react-router-dom';
import { get } from '../../services/requester.service';
import Loader from '../loader/loader';

const Groups: React.FC = () => {

    const [finalGroupsList, setFinalGroupsList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRecords = async () => {
        try {
            let data = await get('api/teams/group-stage-teams');
            setFinalGroupsList(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getRecords();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="group-stage">
                {finalGroupsList.map((group) => (
                    <div key={group.groupName} style={{ paddingTop: '15px' }}>
                        <div className='group-header'>
                            <span className='group-name'>Group {group.groupName}</span>
                        </div>
                        <div className="group">
                            <ul>
                                {group.teams.map((team: any) => (
                                    <li key={team.id}>
                                        {team.name}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to={`/group-matches/${group.groupName}`}
                                state={{ groupName: group.groupName, teams: group.teams }}
                            >
                                <button>View</button>
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
            <div className='group-footer'></div>
        </>
    );
};

export default Groups;