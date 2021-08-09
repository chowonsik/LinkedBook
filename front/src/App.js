import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import LocationSearch from "./pages/user/LocationSearch";
import RecommendUser from "./pages/user/RecommendUser";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import FollowerList from "./pages/Follow/FollowerList";
import FollowingList from "./pages/Follow/FollowingList";
import LocationSetting from "./pages/Main/LocationSetting";
import DealDetail from "./pages/Main/DealDetail";
import DealCreate from "./pages/deal/CreateDeal";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact={true} component={Main} />
        <Route path="/location" exact={true} component={LocationSetting} />
        <Route path="/deal" exact={true} component={DealCreate} />
        <Route path="/deal/:dealId" exact={true} component={DealDetail} />
        <Route path="/signin" exact={true} component={SignIn} />
        <Route path="/signup" exact={true} component={SignUp} />
        <Route
          path="/search/location"
          exact={true}
          component={LocationSearch}
        />
        <Route path="/recommend" exact={true} component={RecommendUser} />
        <Route path="/following/list" exact={true} component={FollowingList} />
        <Route path="/follower/list" exact={true} component={FollowerList} />
      </Router>
    </div>
  );
}

export default App;
