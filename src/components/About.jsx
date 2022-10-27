import React from 'react'

export default function About() {
    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <h1 className="mainTitle">About Us</h1>
            </div>

            <div className='aboutContentContainer'>
                <div className='aboutContent'>
                    <span className='specialWords' style={{ color: '#528265' }}>Welcome </span> to the best business card application in the world!<br /><br />
                    You can enjoy a professional business card to promote your business!<br />
                    Your business card can contain:<br />
                    <ul>
                        <li>Picture of your logo business</li>
                        <li>Data about every detail in your business</li>
                        <li>Creation date information</li>
                        <li>The ability to edit and delete</li>
                        And many more..
                    </ul>

                </div>
            </div>
        </div>
    )
}
