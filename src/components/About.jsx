import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <motion.h1
                    animate={{ opacity: [0, 1], x: [-400, 0] }}
                    transition={{ duration: .6 }}
                    className="mainTitle">About us</motion.h1>
            </div>

            <motion.div
                animate={{ opacity: [0, 1], y: [300, 0] }}
                transition={{ duration: .8 }}
                className='aboutContentContainer'>
                <div className='aboutContent'><span className='specialWords' style={{ color: 'rgb(132, 160, 150)' }}>Welcome </span> to the best business card application in the world!<br /><br />
                    You can enjoy a professional business card to promote your business!<br />
                    Your business card can contain:<br />
                    <ul>
                        <li>A picture of your business</li>
                        <li>Details to describe your business such as name and description, phone number and business address.</li>
                        <li>Creation date information</li>
                        <li>The ability to edit and delete</li>
                    </ul><br />
                    All customers who have registered to the site will have access to all the business cards that the business owners have created.<br />
                    With an easy and convenient interface you can search for the relevant business card for you.<br /><br />
                    Business customers will be able to enjoy full access to the site,<br /> such as:
                    <ul>
                        <li>Create a new business card.</li>
                        <li>A personal area to manage your business card.</li>
                    </ul>
                </div>
            </motion.div>
        </div>
    )
}
