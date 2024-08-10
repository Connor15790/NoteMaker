import React, { useContext, useState } from 'react';
import Notes from './Notes';

const Home = (props) => {
    const { showAlert, mode } = props;
    return (
        <div>
            <div className='container'>
                <Notes showAlert={showAlert} mode={mode} />
            </div>

            <div className="d-flex py-2" style={{ backgroundColor: mode === "light" ? "#5b5b5b" : "black", justifyContent: "center", margin: "auto", position: "relative", width: "100%", bottom: "0px", zIndex: 1000 }}>
                <p style={{ color: "white", margin: "auto" }}>Copyright NoteMaker Library 2024 | All rights reserved</p>
            </div>
        </div>
    )
}

export default Home;