import Head from 'next/head'
import NavBar from '../NavBar'
import { useState } from 'react';
import GlobalCss from '../../globalcss';

import { UserContext } from './userContext'
import User from '../../interfaces/user';

const PageLayout = ({ children }) => {
    return <div className='page-layout'>
        <Head>
            {/* Roboto Font: */}
            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
        </Head>
        {/*<UserContext.Provider value={user}></UserContext.Provider>*/}
        <NavBar />

        <div className='page-layout-contain'>
            {children}
        </div>

        <GlobalCss />
        
    </div>
}

export default PageLayout;