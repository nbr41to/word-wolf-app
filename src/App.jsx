import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import Home from './Home'
import Room from './Room'
import Admin from './Admin'
import { subjects, shuffle } from './subjects'

function App() {

  // const [subjects, setSubjects] = useState(subjects)
  const [themes, setThemes] = useState()

  // useEffect(() => {
  //   let theme = shuffle(subjects)[0]
  //   theme = shuffle(theme)
  //   let themes = [theme[0], theme[1], theme[1], theme[1],]
  //   themes = shuffle(themes)
  //   setThemes(themes)
  // }, [])

  // const themeDialog = (theme) => {
  //   alert(`あなたのテーマ：${theme}`)
  // }

  return (
    <BrowserRouter>
      <h1 style={{ display: 'block', textAlign: 'center' }}>Online Word Wolf</h1>
      <hr />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/room/:id' component={Room} />
        <Route path='/adminnnnn' component={Admin} />
      </Switch>
      <hr />
      <small style={{ display: 'block', textAlign: 'center' }}>Copyright 2020 @tivehack</small>
    </BrowserRouter>
  );
}

export default App;
