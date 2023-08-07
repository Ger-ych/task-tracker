import React, { useEffect, useState } from 'react'

import { TaskService } from '../../../services/task.service';
import { useAuth } from "../../../hooks/useAuth"
import { onlyDeveloper } from '../../../HOC/onlyDeveloper'
import Header from '../../ui/Header';
import Loading from "../../ui/Loading";


const MyTasks = () => {
    const { user } = useAuth();

    useEffect(() => {
        async function getMyTasks() {
            try {
                const my_tasks = await TaskService.getMyTasks(user.token);
                console.log(my_tasks);
            } catch (error) {
                console.error(error.message);
            }
        }

        getMyTasks();
    }, [user.token]);

    return (
        <main className='container'>
            <Header />
            <Loading />
        </main>
    )
}

export default onlyDeveloper(MyTasks)