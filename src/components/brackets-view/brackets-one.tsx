import './brackets.css'
import React from 'react';

function BracketsOne() {

    return (
        <>
            <div className="all-lines-wrapp">

                <div className="line-wrapper">
                    <div style={{ height: '5.14%' }} className="first-Line"></div>
                    <div style={{ height: '12.2%' }} className="upper-Line"></div>
                    <div style={{ height: '12.2%' }} className="upper-Line"></div>
                    <div className="upper-Line"></div>
                    <div className="upper-Line"></div>
                    <div className="upper-Line"></div>
                    <div style={{ height: '13.2%' }} className="upper-Line"></div>
                    <div className="upper-Line"></div>
                </div>

                <div className="line-wrapper" style={{ width: '1%' }}>
                    <div style={{ height: '5.14%' }}></div>
                    <div style={{ height: '12.4%' }} className="left-Line"></div>
                    <div style={{ height: '12.4%' }} ></div>
                    <div style={{ height: '12.5%' }} className="left-Line"></div>
                    <div style={{ height: '12.3%' }} ></div>
                    <div style={{ height: '12.3%' }} className="left-Line"></div>
                    <div style={{ height: '13.4%' }}></div>
                    <div style={{ height: '12.4%' }} className="left-Line"></div>
                </div>

                <div className="line-wrapper">
                    <div style={{ height: '11.14%' }} className="first-Line"></div>
                    <div style={{ height: '24.4%' }} className="upper-Line"></div>
                    <div style={{ height: '24.4%' }} className="upper-Line"></div>
                    <div style={{ height: '25.3%' }} className="upper-Line"></div>
                </div>

            </div>
        </>
    )

}

export default BracketsOne