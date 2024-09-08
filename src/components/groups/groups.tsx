import React from 'react';
import './groups.css';
import { useCsvData } from '../../services/CsvDataContext';
import { Link } from 'react-router-dom';

const Groups: React.FC = () => {

    const { data } = useCsvData();
    let teams = data.teams;
    let teamsLast = data.teams.slice(1);
    let removedElement = teamsLast.pop();
    let groupsNames = ['A', 'B', 'C', 'D', 'E', 'F'];

    let finalGroupsList: any[] = [];

    console.log('teams: ', teams);
    //console.log('teamsLast: ', teamsLast);

    for (let i = 0; i < groupsNames.length; i++) {

        for (let k = 0; k < teamsLast.length; k += 4) {

            let groupName = teamsLast[k][3].split('\r')[0];

            if (groupsNames[i] == groupName) {

                finalGroupsList.push({
                    groupName: groupName,
                    teams: [
                        { id: teamsLast[k][0], name: teamsLast[k][1] },
                        { id: teamsLast[k + 1][0], name: teamsLast[k + 1][1] },
                        { id: teamsLast[k + 2][0], name: teamsLast[k + 2][1] },
                        { id: teamsLast[k + 3][0], name: teamsLast[k + 3][1] },
                    ],
                });

            }

        }

    }

    console.log('finalGroupsList: ', finalGroupsList);

    return (
        <>
            <div className="group-stage">
                {finalGroupsList.map((group) => (
                    <div key={group.groupName} className="group">
                        <h2>Group {group.groupName}</h2>
                        <ul>
                            {group.teams.map((team) => (
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