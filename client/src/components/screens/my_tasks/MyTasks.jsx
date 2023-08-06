import React, { useEffect, useState } from 'react'

import { useAuth } from "../../../hooks/useAuth"
import { onlyDeveloper } from '../../../HOC/onlyDeveloper'
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

export default onlyDeveloper(MyTasks)