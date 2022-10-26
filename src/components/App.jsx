import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Business from './Business';
import Signin from './Signin';
import Signup from './Signup';
import MyBusinessCards from './ManagmentCards';
import AllBusinessCards from './AllBusinessCards';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='business' element={<Business />} />
                    <Route path='signin' element={<Signin />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='managmentcards' element={<MyBusinessCards />} />
                    <Route path='allbusinesscards' element={<AllBusinessCards />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

