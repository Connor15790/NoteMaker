import React, { useContext, useEffect } from 'react';

const About = ({ mode }) => {
    return (
        <>
            <div className='container' style={{ width: "60%", marginTop: "20px" }}>
                <h1 className='mb-5' style={{ textAlign: "center", color: mode === "light" ? "black" : "white" }}>NoteMaker</h1>
                <p style={{ textAlign: "justify", fontSize: "20px", color: mode === "light" ? "black" : "white" }}>Welcome to our Note-Maker Platform, a powerful and user-friendly application built with the MERN stack (MongoDB, Express.js, React, and Node.js) to help you effortlessly create, manage, and store your notes. With our platform, you can easily enter a note title, description, and tag, while our rich text editor offers features like adding bullets, making text bold, italic, or underlined, and even transforming text to uppercase, lowercase, or removing extra spaces. Each user's notes are stored separately, ensuring a personalized and secure experience accessible only by logging in or signing up. Additionally, our platform offers advanced sorting and searching capabilities, allowing you to organize your notes by date or search by tags, making it simple to keep your ideas well-organized and easily accessible.</p>
            </div>

            <div className="d-flex py-2" style={{ backgroundColor: mode === "light" ? "#5b5b5b" : "black", justifyContent: "center", margin: "auto", position: "fixed", width: "100%", bottom: "0px", zIndex: 1000 }}>
                <p style={{ color: "white", margin: "auto" }}>Copyright NoteMaker Library 2024 | All rights reserved</p>
            </div>
        </>
    )
}

export default About;