import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


function MainLayout({children}) {
    return <>
       <Navigation></Navigation>
        <main>
            { children }
        </main>
        <Footer></Footer>
    </>
        
}

export default MainLayout;