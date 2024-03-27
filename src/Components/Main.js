import React from 'react'
import { Routes, Route } from 'react-router'
import { Home } from './Home'
import { Pubg } from './Pubg'
import { FreeFire } from './FreeFire'
import { Telegram } from './Telegram'
import { Instagram } from './Instagram'
import { Signup } from './Signup'
import "./style.css"
import { Signin } from './Signin'

export  function Main() {
  return (
    <div className='Main'>
        <Routes>
            <Route path='/' element={<Signup/>} />
            <Route path='/Signin' element={<Signin/>} />
            <Route path='/Home' element={<Home/>} />
            <Route path='/Pubg' element={<Pubg/>} />
            <Route path='/FreeFire' element={<FreeFire/>} />
            <Route path='/Telegram' element={<Telegram/>} />
            <Route path='/Instagram' element={<Instagram/>}/>
        </Routes>
    </div>
  )
}
