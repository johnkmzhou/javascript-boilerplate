import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
