import React, { useState } from 'react';
import "./Modal.css";



function Modal({ show, onhide, save }) {
    const [task, setTask] = useState();
    const [status, setStatus] = useState("incomplete");
    const submit = () => {
        const data = { task, status }
        console.log("data", data);
        save(data);
        setTask(" ");
        onhide()
    }
    return (
        show&&
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <h1 className='text-size'>Create Task</h1>
                    <button onClick={() => onhide()}> X</button>
                </div>
                <div className='modal-body'>
                    <p className='text-light padding'>Your Task</p>
                    <div className='center'><input type="text" value={task} onChange={(e) => setTask(e.target.value)} className='input-box ' /></div>
                </div>
                <div className='modal-body'>
                    <p className='text-light padding-dropdown'>Status</p>
                    <div className='center'>
                        <select type="dropdown" className='input-box' value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="incomplete">InCompleted</option>
                            <option value="complete">Completed</option>
                        </select>
                    </div>
                </div>
                <div className="footer">
                    <button className='btn btn-primary' onClick={submit}>Add</button>
                    <button className='btn ml btn-brown' onClick={() => onhide()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
    export default Modal;
