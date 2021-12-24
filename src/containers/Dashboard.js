import React from 'react'
import Main from '../components/main/main'
import ClientMain from '../components/main/ClientMain'
import Sidebar from '../components/sidebar/sidebar'

const Dashboard = ({permission}) => {
    var main;
    switch (permission) {
        case "admin":
            main = <Main />
            break;
    
        default:
            main = <ClientMain />
            break;
    }
    return (
        <>  
            <Sidebar permission={permission} />
            {main}
        </>
    )
}

export default Dashboard
