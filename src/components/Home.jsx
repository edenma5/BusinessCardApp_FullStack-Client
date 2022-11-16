import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

const textByTime = function () {
    const currentTime = new Date().getHours();
    let currentGreeting;
    if (currentTime < 12 && currentTime >= 5) {
        currentGreeting = 'Good morning';
    } else if (currentTime >= 12 && currentTime < 18) {
        currentGreeting = 'Good afternoon';
    } else if (currentTime >= 18 && currentTime < 24) {
        currentGreeting = 'Good evening';
    } else {
        currentGreeting = 'Good night';
    }
    return currentGreeting;
}

export default function Home() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate()

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <motion.h1
                    animate={{ opacity: [0, 1], x: [-400, 0] }}
                    transition={{ duration: .6 }}
                    className="mainTitle">Business Card App
                </motion.h1>
            </div>

            <motion.div
                animate={{ opacity: [0, 1], y: [300, 0] }}
                transition={{ duration: .8 }}
                className='homePageContentContainer'>
                <div className='homePageContent'>
                    {userInfo?.isBusinessAccount === false &&
                        <p>
                            <span style={{ fontWeight: 'bolder', fontSize: '1.2em', color: '#46364a', letterSpacing: '2px' }}>{textByTime()} </span><span className='specialWords' style={{ color: 'rgb(132, 160, 150)' }}> {userInfo.fullName}</span><span className="emojiHand">👋🏼</span><br /><br />
                            In the <span className='linksText' onClick={() => navigate('/allbusinesscards')}>All Cards</span> tab you can find all the business cards which belongs to our business customers, who will be happy to provide you with professional, quality and kindly service.
                        </p>
                    }

                    {userInfo?.isBusinessAccount &&
                        <p>
                            <span style={{ fontWeight: 'bolder', fontSize: '1.2em', color: '#46364a', letterSpacing: '2px' }}>{textByTime()} </span><span className='specialWords' style={{ color: 'rgb(132, 160, 150)' }}> {userInfo.fullName}</span><span className="emojiHand">👋🏼</span><br /><br />
                            You are a business customer 👔<br /> you have permission for all website operations.<br /><br />
                            In your <span className='linksText' onClick={() => navigate('/managmentcards')}>Personal Area</span>, you can view all business cards of your business, as well as edit or delete them.<br /><br />
                            In the <span className='linksText' onClick={() => navigate('/managmentcards')}>Create new card</span> tab, you can create new business cards as you wish.
                        </p>
                    }

                    {!userInfo &&
                        <p>
                            <span className='specialWords' style={{ color: 'rgb(132, 160, 150)' }}>Welcome</span> to the best business card application in the world!<br /><br />
                            It seems that you are not logged in yet.<br />
                            We invite you to register by clicking <span className='linksText' onClick={() => navigate('/signup')}>here!</span>
                            <span className='specialWords' style={{ letterSpacing: '2px', color: 'lightsteelblue', rotate: '-7deg', fontSize: '1em', marginLeft: '1rem' }}>It's free!!</span><br />
                            Or <span className='linksText' onClick={() => navigate('/signin')}>sign in</span> if you already have an account.
                        </p>
                    }
                </div>
            </motion.div>
        </div>
    )
}
