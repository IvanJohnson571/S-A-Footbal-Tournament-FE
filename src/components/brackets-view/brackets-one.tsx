import './brackets.css'
import React from 'react';

function BracketsOne() {

    return (
        <>
            <div className="all-lines-wrapp">

                <div className="line-wrapper">
                    <div style={{ height: '6.14%' }} className="first-Line"></div>
                    <div style={{ height: '12.2%' }} className="upper-Line"></div>
                    <div style={{ height: '11.7%' }} className="upper-Line"></div>
                    <div className="upper-Line"></div>
                    <div style={{ height: '11.2%' }} className="upper-Line"></div>
                    <div style={{ height: '11.4%' }} className="upper-Line"></div>
                    <div style={{ height: '11.2%' }} className="upper-Line"></div>
                    <div className="upper-Line"></div>
                </div>

                <div className="line-wrapper" style={{ width: '1%' }}>
                    <div style={{ height: '6.14%' }}></div>
                    <div style={{ height: '12.6%' }} className="left-Line"></div>
                    <div style={{ height: '11.8%' }} ></div>
                    <div style={{ height: '12.5%' }} className="left-Line"></div>
                    <div style={{ height: '11.4%' }} ></div>
                    <div style={{ height: '11.9%' }} className="left-Line"></div>
                    <div style={{ height: '11.4%' }}></div>
                    <div style={{ height: '12.4%' }} className="left-Line"></div>
                </div>

                <div className="line-wrapper">
                    <div style={{ height: '12.14%' }} className="first-Line"></div>
                    <div style={{ height: '24%' }} className="upper-Line"></div>
                    <div style={{ height: '23.8%' }} className="upper-Line"></div>
                    <div style={{ height: '23.3%' }} className="upper-Line"></div>
                </div>

            </div>
        </>
    )

}

export default BracketsOne