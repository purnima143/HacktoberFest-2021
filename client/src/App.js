import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';
import SignUp from './Component/SignUp/SignUp';
import SignIn from "./Component/SignIn/SignIn";
import Header from './Component/header';



function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <div className="App">
        <div>
          <Switch>
            <Route path="/header" component={Header}/>
            <Route path="/signup" component={SignUp} />
           
            <Route path="/signin" component={SignIn} />
          </Switch>
        </div>
      </div>
    </Provider> 
    </BrowserRouter>   
  );
}

export default App;