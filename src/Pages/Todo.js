import React, { useCallback, useEffect, useState } from 'react';
import Card from '../component/Card/Card';
import Modal from '../component/Modals/Modal';
import Slider from '../component/slider/Slider';
import listimg from '../assets/Checklist-pana.svg'
import "./Todo.css"
import { applyMiddleware } from 'redux';

const Todo = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState([]);
    const [inputvalue, setInputvalue] = useState("");
    const onhide = () => { setShow(false) }
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(1);
    const [toggle, setToggle] = useState({ start: 0, end: counter })

    // function for the serch the task card

    const SearchInput = useCallback((orderDetails) => {
        if (inputvalue === undefined || inputvalue === "") {
            let arr = localStorage.getItem("taskdata")
            if (arr) {
                let obj = JSON.parse(arr);
                setSearch(obj)
            }
        }
        else {
            let templist = data.map((item) => item.task.toLowerCase())
            templist = data.filter((item) => item.task.toLowerCase().includes(inputvalue))
            setSearch(templist)
        }
    }, [data, inputvalue]);

    //single time call when page reload
    useEffect(() => {
        let arr = localStorage.getItem("taskdata")
        if (arr) {
            let obj = JSON.parse(arr);
            setData(obj)
            setSearch(obj)
        }
    }, [])

    //when anything changes on search box and no. of card option
    useEffect(() => {
        SearchInput();
        setToggle({ start: 0, end: counter })
    }, [counter, SearchInput])

    //function for the no. of card on the page
    const changeToggle = (start, end) => {
        console.log(start, end);
        setToggle({ start, end })
    }


    // function for delete the task from local storage
    const deletetask = (index) => {
        const templist = [...data];
        templist.splice(index, 1)
        localStorage.setItem("taskdata", JSON.stringify(templist))
        setData(templist)
    }

    // function for save the task to local storage
    const save = (taskobj) => {
        const templist = [...data];
        templist.push(taskobj)
        localStorage.setItem("taskdata", JSON.stringify(templist))
        setData(templist)
    }

    // function for update the task to local storage
    const update = (taskobj, index) => {
        const templist = [...data];
        templist[index] = taskobj
        localStorage.setItem("taskdata", JSON.stringify(templist))
        setData(templist)
    
    }




    return (
        <>
            <div>
                <div className='bg'>
                    <h1 className='text-center text-light'>Todo-List</h1>
                    <div><button className='button' onClick={() => setShow(true)}>Create Task</button></div>
                    <div className='select-card'>
                        <div className='btw'>
                            <input className="search" type="text" placeholder='Search.....'
                                value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} />
                        </div>
                        {/* no. of cards on particular page */}
                        <div className='select-card'>
                            <span>
                                <h1 className='number-of-card'>  </h1>
                            </span>
                            <select value={counter} className="dropdown text-center" onChange={(e) => setCounter(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* cards */}
                <div className='card-container'>
                    <div className='card-wrap'>
                        <img src={listimg} width="35%" className='img-list'/>
                    </div>
                    <div className='card-wrap'>
                        {
                            search?.slice(toggle.start, toggle.end).map((item, index) =>
                                <Card item={item} index={index}
                                    deletetask={deletetask} update={update} />)
                        }
                    </div>

                </div>
            </div>




            {/* modal open */}
            <div className='modal'>
                <Modal show={show} onhide={onhide} save={save} deletetask={deletetask} />
            </div>

            {/* pagination design */}
            <div className='slider'>
                <Slider page={counter} changeToggle={changeToggle} />
            </div>
        </>
    );
};

export default Todo;