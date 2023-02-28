import React, { useState, useEffect } from 'react';
import "./Slider.css";

const Slider = ({ page, changeToggle }) => {
    const [counter, setCounter] = useState(1);
    const [data, setData] = useState([]);
    const PageNumber = []

    //single time call when page reload
    useEffect(() => {
        let arr = localStorage.getItem("taskdata")
        if (arr) {
            let obj = JSON.parse(arr);
            setData(obj)
        }
    }, [])

    const total = data.length;

    // for(let i=1; i<=Math.ceil(total/page); i++){
    //     PageNumber.push(i);
    // }

    // it call when you click on next and prev or when counter value change
    useEffect(() => {
        const value = page * counter;
        changeToggle(value - page, value);
    }, [counter])

    //logic when click on next button and prev button
    const buttonClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1);
            } else {
                setCounter(counter - 1);
            }
        }
        else if (type === "next") {
            if (counter === Math.ceil(total / page)) {
                setCounter(counter);
            }
            else {
                setCounter(counter + 1);
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className='prev'>
                    <button className='btn btn-primary' onClick={() => buttonClick("prev")}>prev</button>
                </div>
                <div className='pagenumber'>
                    {/* <select value={counter} className="dropdown text-center" onChange={(e)=>setCounter(e.target.value)}>
                        {
                           PageNumber.map((item,index)=><option value={index+1}>{index+1}</option>)
                        }
                    </select> */}
                    <span className="dropdown text-center">{counter}</span>
                </div>
                <div className='next'>
                    <button className="btn btn-primary" onClick={() => buttonClick("next")} >next</button>
                </div>
            </div>
        </>
    );
};

export default Slider;