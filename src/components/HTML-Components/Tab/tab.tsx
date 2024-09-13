import React, { useState } from 'react';
import './tab.css';

const Tabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('tab1');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab1')}
                >
                    Tab 1
                </button>
                <button
                    className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab2')}
                >
                    Tab 2
                </button>
                <button
                    className={`tab-button ${activeTab === 'tab3' ? 'active' : ''}`}
                    onClick={() => handleTabClick('tab3')}
                >
                    Tab 3
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'tab1' && <div>Content for Tab 1</div>}
                {activeTab === 'tab2' && <div>Content for Tab 2</div>}
                {activeTab === 'tab3' && <div>Content for Tab 3</div>}
            </div>
        </div>
    );
};

export default Tabs;
