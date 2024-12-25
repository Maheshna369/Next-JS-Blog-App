"use client"
import React from 'react'
import Modal from './Modal';
import { useContext } from 'react';
import { ModalContext } from '@/app/context/ModalContext';
import { useRef } from 'react';
const WelcomeModal = (props) => {
    const {modal, setModal}= useContext(ModalContext);
    const WelcomeModal= props.WelcomeModal;
    const setWelcomeModal= props.setWelcomeModal;
    const ref= useRef();
    const handleClose=(e)=>{
        if(ref.current===e.target){
            setWelcomeModal(false);
        }
    }
  return (
    <div ref={ref} onClick={(e)=>handleClose(e)} className='h-screen w-screen fixed inset-0 flex flex-col justify-center items-center backdrop-blur-sm z-10'>
        <div className='h-80 w-80 shadow-2xl flex flex-col justify-evenly items-center bg-white text-black border-2 border-white rounded-xl'>
        <h3 className='text-2xl text-yellow-300 m-3'>Welcome to My Blog App</h3>
        <p className='m-3'>Do Register yourself and Post your articles to be a part of maphy's blog community</p>
        <p className='m-3'>If you want to help me, <button onClick={()=>setModal(true)} className='border-2 rounded-3xl text-yellow-500 bg-purple-400 p-3'>Click Here !</button></p>
        </div>
        {modal && <Modal/>}
    </div>
    
  )
}

export default WelcomeModal
