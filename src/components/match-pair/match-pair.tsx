import React, { useState } from 'react';
import './match-pair.css';
import playground from '../../assets/field.jpg'


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

const MatchPair: React.FC = () => {


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