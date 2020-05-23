import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { TopMenu } from './layouts/TopMenu';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <TopMenu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
      <Layout.Footer />
    </>
  );
}

export default App;
