import React, { useEffect, useState } from 'react'

import { useAuth } from "../../../hooks/useAuth"
import Header from '../../ui/Header';
import Loading from "../../ui/Loading";


const MyTasks = () => {
    const { user } = useAuth();

    return (
        <main className='container'>
            <Header />
            
        </main>
    )
}

export default MyTasks