import React, { useEffect, useState } from 'react';
import './groups.css';
import { Link } from 'react-router-dom';
import { get } from '../../services/requester.service';

const Groups: React.FC = () => {

    const [finalGroupsList, setFinalGroupsList] = useState<any[]>([]);

    const getRecords = async () => {
        try {
            let data = await get('api/teams/group-stage-teams');
            setFinalGroupsList(data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    useEffect(() => {
        getRecords();
    }, []);

    return (
        <>
            <div className="group-stage">
                {finalGroupsList.map((group) => (
                    <div key={group.groupName} className="group">
                        <h2>Group {group.groupName}</h2>
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
                            <button>View matches</button>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Groups;