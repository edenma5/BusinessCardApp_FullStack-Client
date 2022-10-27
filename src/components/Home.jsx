import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate()

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <h1 className="mainTitle">{userInfo ? `Hello ${userInfo.fullName}` : "Business Card App"}</h1>
                <h6 className='littleTitle'>{userInfo ? <span style={{ fontFamily: 'Roboto' }}>Business Card App <span style={{ fontFamily: 'Dancing Script' }}>By Eden Maimon</span></span> : <span style={{ fontFamily: 'Dancing Script' }}>By Eden Maimon</span>}</h6>
            </div>

            {userInfo ?
                <div className='homePageContentContainer'>
                    <div className='homePageContent'>
                        <span className='specialWords' style={{ color: '#528265' }}>Welcome</span> back, it's nice to see you again <span className="emojiHand">👋🏼</span><br /><br />
                        Here, in <span style={{ cursor: 'pointer', color: 'rgb(0, 101, 101)', fontWeight: 'bolder', fontSize: '1.2em' }} onClick={() => navigate('/allbusinesscards')}>All Cards</span> tab you can find all the business cards which belongs to our business customers, who will be happy to provide you with professional, quality and kindly service.<br />
                        From small to large size businesses, everything here is in a simple and convenient system.<br /><br />
                        {userInfo?.isBusinessAccount && <p>in your <span style={{ cursor: 'pointer', color: 'rgb(0, 101, 101)', fontWeight: 'bolder', fontSize: '1.2em' }} onClick={() => navigate('/managmentcards')}>Personal Area</span>, You can always edit or delete your cards, And of course to create new business cards, as many as you want!</p>}
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
