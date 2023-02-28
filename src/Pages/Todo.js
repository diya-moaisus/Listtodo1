import React, { useEffect, useState } from 'react';
import Card from '../component/Card/Card';
import Modal from '../component/Modals/Modal';
import Slider from '../component/slider/Slider';
import "./Todo.css"

const Todo = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState([]);
    const [inputvalue, setInputvalue] = useState("");
    const onhide = () => { setShow(false) }
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(1);
    const [toggle, setToggle] = useState({ start: 0, end: counter })


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
        Search();
        setToggle({ start: 0, end: counter })
    }, [inputvalue, counter])

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


    // function for the serch the task card
    function Search() {
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
    }

    return (
        <>
            <div>
                <div className='bg'>
                    <h1 className='text-center text-light'>TODO List</h1>
                    <div><button className='btn btn-primary' onClick={() => setShow(true)}>Create Task</button></div>
                    <div className='search'><span className='text-light'>Search here : </span><input type="text" value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} /></div>
                </div>
            </div>

            {/* no. of cards on particular page */}
            <div className='select-card'>
            <span>
            <h1 className='text-center search'>No.of card on page :- </h1>
            </span>
                <select value={counter} className="dropdown text-center" onChange={(e) => setCounter(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            {/* cards */}
            <div className='card-wrapp'>
                {
                    search?.slice(toggle.start, toggle.end).map((item, index) =>
                     <Card item={item} index={index}
                      deletetask={deletetask} update={update} />)
                }
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