import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Doing from './components/Doing';
import Done from './components/Done';
import Tasks from './components/Tasks';
import ToDo from './components/ToDo';
import NotFound from './components/NotFound';

function App() {


  return (
         
    <Router>  
      <Navbar />
      <Switch>
      <Route exact path="/" component={Tasks} />
        <Route exact path="/todo" component={ToDo} />
        <Route exact path="/doing" component={Doing} />
        <Route exact path="/done" component={Done} />

        <Route path="*" component={NotFound} />
      </Switch>

    </Router>
    
  );
}

export default App;
