import React from 'react'
import './loader.css';

const Loader: React.FC = () => {


    return (
        <>
            <div className='loader-wrapper'>
                <div className="spinner-square">
                    <div className="square-1 square"></div>
                    <div className="square-2 square"></div>
                    <div className="square-3 square"></div>
                </div>
            </div>
        </>


    )
}

export default Loader;
