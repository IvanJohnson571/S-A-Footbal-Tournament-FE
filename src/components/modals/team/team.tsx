import React, { useState, useEffect } from 'react';
import './team.css';
import { TeamModalProps } from '../../../interfaces/common';

const TeamModal: React.FC<TeamModalProps> = ({ teamId, teamName, startingPlayers, onClose }) => {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div className={`modal-backdrop ${isClosing ? 'fade-out' : ''}`}>
            <div className={`modal-content ${isClosing ? 'slide-down' : ''}`}>
                <div className="modal-header">
                    <h2>{teamName} starting team</h2>
                    <button className="close-button" onClick={handleClose}>
                        <span>x</span>
                    </button>
                </div>
                <table className="players-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Player</th>
                            <th>Pos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {startingPlayers.map((player, index) => (
                            <tr key={player.id}>
                                <td>{index + 1}</td>
                                <td>{player.fullName}</td>
                                <td>{player.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamModal;
