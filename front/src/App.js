import { HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import FollowerList from './routes/FollowerList';
import Alarm from './routes/Alarm';
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/noti" exact={true} component={Alarm}/>
        <Route path="/profile/follower/list" exact={true} component={FollowerList} />
      </Router>
    </div>
  );
}

export default App;
