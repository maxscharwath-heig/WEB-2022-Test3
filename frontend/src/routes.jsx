import React from 'react'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'

const Routes = () => {
  return (
    <>
      <Route path="/createroom" component={Home}/>
      <Route path="/game/:gameId" component={Game}/>
    </>
  )
}

export default Routes
