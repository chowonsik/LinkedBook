import React, { useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import LocationSearch from "./pages/user/LocationSearch";
import RecommendUser from "./pages/user/RecommendUser";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { getUserProfile } from "./actions/Users";
import ProfileUpdate from "./pages/Profile/ProfileUpdate";
import UserHistory from "./pages/Profile/UserHistory";
import ChangePassword from "./pages/Profile/ChangePassword";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // 내프로필 가져오기 여기선 2가 내 아이디로 가정
    dispatch(getUserProfile(2));
  }, []);

  return (
    <div className="App">
      <Router>
        <Route path="/" exact={true} component={Main} />
        <Route path="/signin" exact={true} component={SignIn} />
        <Route path="/signup" exact={true} component={SignUp} />
        <Route
          path="/search/location"
          exact={true}
          component={LocationSearch}
        />
        <Route path="/recommend" exact={true} component={RecommendUser} />
        <Route path="/profile/:id" exact={true} component={Profile} />
        <Route path="/profile/history" exact={true} component={UserHistory} />
        <Route path="/profile/update" exact={true} component={ProfileUpdate} />
        <Route
          path="/profile/update/password"
          exact={true}
          component={ChangePassword}
        />
      </Router>
    </div>
  );
}

export default App;
