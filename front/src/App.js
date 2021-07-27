import React from 'react';
import { HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import FollowerList from './routes/FollowerList';
import FollowingList from './routes/FollowingList';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Route path='/profile/follower/list' exact={true} component={FollowerList} />
        <Route path='/profile/following/list' exact={true} component={FollowingList} />
      </Router>
    </div>
  );
}

export default App;
