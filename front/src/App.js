import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import FollowerList from "./routes/FollowerList";
import Profile from "./routes/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/profile" component={Profile} />
        <Route
          path="/profile/follower/list"
          exact={true}
          component={FollowerList}
        />
      </Router>
    </div>
  );
}

export default App;
