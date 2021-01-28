import Head from 'next/head'

import GlobalCss from '../../globalcss';
import PageLayout from '../PageLayout';
import PostComment from '../comments/PostComment';
import { useRouter } from 'next/router';
import CommentsSection from '../comments/CommentsSection';

const NodeLayout = ({ children }) => {
    const router = useRouter()
    const nodeName = router.route.split('/').pop();

    return <PageLayout>

        <div className='row'>

        <div className='leftcolumn shadow margin padding'>
            <div>{children}</div>
            <CommentsSection nodeName={nodeName} />
            <PostComment nodeName={nodeName} />
        </div>


        <div className='rightcolumn'>
            <div className='shadow margin padding'>
                Hola
            </div>
            <div className='shadow margin padding'>
                Hola
            </div>
        </div>

        </div>

        <style jsx>{`
        
.leftcolumn {  
    background-color: red; 
  float: left;
  width: 75%;
  max-width: 600px;
}

/* Right column */
.rightcolumn {
    display: flex;
    flex-direction: column;
    background-color: yellow;
  float: left;
  width: 25%;
  padding-left: 20px;
}

.row {
  display: flex;
  flex-direction: row;
}

@media screen and (max-width: 800px) {
  .row {   
    flex-wrap: wrap;
  }

  .leftcolumn, .rightcolumn {
      width: 100%;
  }
}

        `}</style>

    </PageLayout>

    return <div className='page-layout'>
        <Head>
            {/* Roboto Font: */}
            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
        </Head>
        {/*<UserContext.Provider value={user}></UserContext.Provider>*/}

        {children}

        <GlobalCss />


        
    </div>
}

export default NodeLayout;