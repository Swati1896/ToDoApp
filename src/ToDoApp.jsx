import React, { useEffect } from 'react';
import { useState } from 'react';

import './ToDoApp.css';

 function ToDoApp() {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [dateTime, setDateTime] = useState('');
    

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (!inputValue) return;

        if (tasks.includes(inputValue)) {
            setInputValue('')
            return;
            
        }

        setTasks((prev)=>[...prev, inputValue]);

        setInputValue('');

    }

    //Date and Time

    useEffect(() => {
        const interval = setInterval (() =>{
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();

        setDateTime (`${formattedDate} - ${formattedTime}`);  
        
    }, 1000);

    return()=>clearInterval(interval);
}, []);

    function handleDelete(value) {
        console.log(tasks);
        console.log(value);
        
        const updatedTasks = tasks.filter((curTask) => curTask !== value);
        setTasks(updatedTasks);

    };

    function handleClear() {
        setTasks([]);
    }

    return (

        <section className="todo-container">
            <header>
                <h1>To Do List</h1>
                <h2 className="date-time">{dateTime}</h2>
            </header>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" value={inputValue} className="todo-input" 
                        onChange={(e)=>handleInputChange(e.target.value)} autoComplete='off' />
                    </div>
                    <div>
                        <button className="todo-btn" type="submit">Add Task</button>
                    </div>
                </form>
            </section>
            <section className="myUnOrdList">
                <ul>
                    {
                        tasks.map((curTask, index)=>{
                            return(
                            <li key={index} className='todo-item'>
                                <span>{curTask}</span>
                                <button className='check-btn'>C</button>
                                <button className='delete-btn' onClick={()=>handleDelete(curTask)}>D</button>
                            </li>
                            );
                        })
                    }
                </ul>
            </section>
            <section>
            <button className='clear-btn' onClick={handleClear}>Clear All</button>
            </section>
        </section>
        
    );
}
export default ToDoApp;