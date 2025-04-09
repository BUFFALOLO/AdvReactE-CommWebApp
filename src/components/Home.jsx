import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const divStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    const imgStyles = {
        maxWidth: '60%',
        height: 'auto',
        marginTop: '2rem',
        borderRadius: '8px'
    }

    return (
        <div style={divStyles}>
            <h1 className="my-5 display-3">Mini Project: E-Commerce API</h1>
            <p className="lead">Completed by Lauren Farrell</p>
            <img 
                src="/src/assets/photo.jpg" 
                alt="E-Commerce Illustration" 
                style={imgStyles}
            />
        </div>
    )
}

export default Home;
