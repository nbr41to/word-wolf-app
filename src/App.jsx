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
      <h1>Word Wolf App</h1>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/play/:id' component={Room} />
        <Route path='/adminnnnn' component={Admin} />
      </Switch>
    </BrowserRouter >
  );
}

export default App;
