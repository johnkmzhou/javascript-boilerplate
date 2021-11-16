import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { TopMenu } from './layouts/TopMenu';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreatePost } from './pages/CreatePost';
import { NoMatch } from './pages/NoMatch';

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
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
      <Layout.Footer />
    </>
  );
}

export default App;
