import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import FollowerList from "./routes/FollowerList";

function App() {
  return (
    <div className="App">
      <Router>
        <Route
          to="/profile/follower/list"
          exact={true}
          component={FollowerList}
        />
      </Router>
    </div>
  );
}

export default App;
