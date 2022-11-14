import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <motion.h1
                    whileInView={{ opacity: [0, 1], x: [-400, 0] }}
                    transition={{ duration: .6 }}
                    className="mainTitle">About Us</motion.h1>
            </div>

            <motion.div
                whileInView={{ opacity: [0, 1], y: [300, 0] }}
                transition={{ duration: .8 }}
                className='aboutContentContainer'>
                <div className='aboutContent'>
                    <span className='specialWords' style={{ color: 'rgb(132, 160, 150)' }}>Welcome </span> to the best business card application in the world!<br /><br />
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
            </motion.div>
        </div>
    )
}
