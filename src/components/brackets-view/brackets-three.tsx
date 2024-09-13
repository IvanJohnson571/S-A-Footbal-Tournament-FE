import './brackets.css'
import React from 'react';

function BracketsThree() {

    return (
        <>
            <div className="all-lines-wrapp">

                <div className="line-wrapper">
                    <div style={{ height: '24.14%' }} className="first-Line"></div>
                    <div style={{ height: '47.2%' }} className="upper-Line"></div>

                </div>

                <div className="line-wrapper" style={{ width: '1%' }}>
                    <div style={{ height: '24.1%' }}></div>
                    <div style={{ height: '47.8%' }} className="left-Line"></div>
                    <div style={{ height: '25.3%' }} ></div>
                </div>

                <div className="line-wrapper">
                    <div style={{ height: '48.50%' }} className="first-Line"></div>
                    <div style={{ height: '51.00%' }}></div>
                </div>

            </div>
        </>
    )

}

export default BracketsThree