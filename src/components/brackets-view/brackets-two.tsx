import './brackets.css'
import React from 'react';

function BracketsTwo() {

    return (
        <>
            <div className="all-lines-wrapp">

                <div className="line-wrapper">
                    <div style={{ height: '12.14%' }} className="first-Line"></div>
                    <div style={{ height: '23.5%' }} className="upper-Line"></div>
                    <div style={{ height: '23.8%' }} className="upper-Line"></div>
                    <div style={{ height: '23.5%' }} className="upper-Line"></div>

                </div>

                <div className="line-wrapper" style={{ width: '1%' }}>
                    <div style={{ height: '12.14%' }}></div>
                    <div style={{ height: '24.00%' }} className="left-Line"></div>
                    <div style={{ height: '23.7%' }} ></div>
                    <div style={{ height: '24.00%' }} className="left-Line"></div>
                    <div style={{ height: '13.3%' }} ></div>
                </div>

                <div className="line-wrapper">
                    <div style={{ height: '24.14%' }} className="first-Line"></div>
                    <div style={{ height: '47.4%' }} className="upper-Line"></div>
                    <div style={{ height: '26.4%' }}></div>
                </div>

            </div>
        </>
    )

}

export default BracketsTwo