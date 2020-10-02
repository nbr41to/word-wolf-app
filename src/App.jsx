import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GlobalStyle } from './GlobalStyle'
import Layout from './components/layout'
import Home from './Home'
import Room from './Room'
import Admin from './Admin'

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/room/:id' component={Room} />
          <Route path='/adminnnnn' component={Admin} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
