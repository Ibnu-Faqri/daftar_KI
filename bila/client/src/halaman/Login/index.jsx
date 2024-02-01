import React, { useRef, useState } from 'react'
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigasi = useNavigate()
  const [error , seterror] = useState('')
  const submitlogin = async () =>{
    const respons = await fetch("http://localhost:5000/login", {
      method:"post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
    })

    const data = await respons.json()
    seterror("")
    if(data.status) {
      localStorage.setItem('token' , data.token)
      localStorage.setItem('role' , data.role)
      setToken(data.role)
    } else {
      seterror(data.message ??'terjadi kesalahan')
    }
    
  }
  return (
    <div className={styles.login}>
      <img src="bumn.jpg" alt=""  className={styles.bumn} />
      <img src="taspen.png" alt="" className={styles.taspen} />
      <p>{error}</p>
      <div>
        <input type="text" placeholder='Email' ref={emailRef}/>
        <input type="password" placeholder='Password'ref={passwordRef} />
        <button onClick={submitlogin}>login</button>
      </div>
    </div>
  )
}
