import React, { useState } from 'react';
import "./Card.css"
import UpdateModal from '../Modals/UpdateModal';

const Card = ({ item, index, deletetask, update }) => {
    const [show, setShow] = useState(false);
    const onhide = () => { setShow(false) }

    return (
        <>
            <div className='card'>
                <div className='card-header text-incomplete'>
                    <h3 className='text-center'>{item.task}</h3>
                </div>
                <div className='task-heading'>
                    <h5 className='text-center text-incomplete'>{item.status}</h5>
                </div>
                <div className='card-btn'>
                    <button className='butn' onClick={() => setShow(true)}>Update </button>
                    <button className='butn' onClick={() => deletetask(index)}>Delete</button>
                </div>
            </div>
            <div className='modal'>
                <UpdateModal show={show} onhide={onhide} update={update} item={item} index={index} />
            </div>
        </>
    );
};

export default Card;