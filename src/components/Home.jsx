import React from 'react';
import { useNavigate } from 'react-router-dom';

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
                <h1 className="mainTitle">Business Card App</h1>
                <h6 className='littleTitle'><span style={{ fontFamily: 'Dancing Script', letterSpacing: '4px', fontSize: '1.1em' }}>By Eden Maimon</span></h6>
            </div>

            {userInfo ?
                <div className='homePageContentContainer'>
                    <div className='homePageContent'>
                        <span>{textByTime()} <br /></span><span className='specialWords' style={{ color: '#528265' }}>{userInfo.fullName}</span><span className="emojiHand">👋🏼</span><br /><br />
                        In <span style={{ cursor: 'pointer', color: 'rgb(0, 101, 101)', fontWeight: 'bolder', fontSize: '1.2em' }} onClick={() => navigate('/allbusinesscards')}>All Cards</span> tab you can find all the business cards which belongs to our business customers, who will be happy to provide you with professional, quality and kindly service.<br />
                        From small to large size businesses, everything here is in a simple and convenient system.<br /><br />
                        {userInfo?.isBusinessAccount && <p>In your <span style={{ cursor: 'pointer', color: 'rgb(0, 101, 101)', fontWeight: 'bolder', fontSize: '1.2em' }} onClick={() => navigate('/managmentcards')}>Personal Area</span>, You can always edit or delete your cards, And of course to create new business cards, as many as you want!</p>}
                    </div>
                </div> :
                <div className='homePageContentContainer'>
                    <div className='homePageContent'>
                        <span className='specialWords' style={{ color: '#528265' }}>Welcome</span> to the best business card application in the world!<br /><br />
                        It seems that you are not logged in yet.<br />
                        We invite you to register by clicking <span style={{ cursor: 'pointer', color: 'rgb(0, 101, 101)', fontWeight: 'bolder', fontSize: '1.2em' }} onClick={() => navigate('/signup')}>here!</span> <span className='specialWords' style={{ color: 'lightsteelblue', rotate: '10deg', fontSize: '1em', marginLeft: '3rem' }}>It's free!!</span><br />
                        Or <span style={{ cursor: 'pointer', color: 'rgb(0, 101, 101)', fontWeight: 'bolder', fontSize: '1.2em' }} onClick={() => navigate('/signin')}>sign in</span> if you already have an account.<br />
                    </div>
                </div>}
        </div>
    )
}
