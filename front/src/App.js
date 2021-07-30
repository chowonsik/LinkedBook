import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import FollowerList from './routes/FollowerList';
import FollowingList from './routes/FollowingList';
import Profile from "./routes/Profile";
import Alarm from './routes/Alarm';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/noti" exact={true} component={Alarm}/>
        <Route path='/profile/follower/list' exact={true} component={FollowerList} />
        <Route path='/profile/following/list' exact={true} component={FollowingList} />
        <Route exact path="/profile" component={Profile} />
      </Router>
    </div>
  );
}

export default App;
