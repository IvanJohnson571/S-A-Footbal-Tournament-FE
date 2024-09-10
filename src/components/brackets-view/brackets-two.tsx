import './brackets.css'
import React from 'react';

function BracketsTwo() {

    return (
        <>
            <div className="all-lines-wrapp">

                <div className="line-wrapper">
                    <div style={{ height: '11.14%' }} className="first-Line"></div>
                    <div style={{ height: '25.2%' }} className="upper-Line"></div>
                    <div style={{ height: '25.2%' }} className="upper-Line"></div>
                    <div style={{ height: '24.2%' }} className="upper-Line"></div>

                </div>

                <div className="line-wrapper" style={{ width: '1%' }}>
                    <div style={{ height: '11.14%' }}></div>
                    <div style={{ height: '25.5%' }} className="left-Line"></div>
                    <div style={{ height: '25.3%' }} ></div>
                    <div style={{ height: '24.3%' }} className="left-Line"></div>
                    <div style={{ height: '13.3%' }} ></div>
                </div>

                <div className="line-wrapper">
                    <div style={{ height: '24.14%' }} className="first-Line"></div>
                    <div style={{ height: '49.4%' }} className="upper-Line"></div>
                    <div style={{ height: '26.4%' }}></div>
                </div>

            </div>
        </>
    )

}

export default BracketsTwo