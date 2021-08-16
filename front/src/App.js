import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import SearchBook from "./pages/book/SearchBook";
import "./App.css";
import Main from "./pages/Main";
import LocationSearch from "./pages/user/LocationSearch";
import RecommendUser from "./pages/user/RecommendUser";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import FollowerList from "./pages/Follow/FollowerList";
import FollowingList from "./pages/Follow/FollowingList";
import Alarm from "./pages/Alarm";
import LocationSetting from "./pages/Main/LocationSetting";
import DealDetail from "./pages/Main/DealDetail";
import DealCreate from "./pages/deal/CreateDeal";

import Report from "./pages/Report";
import SearchUser from "./pages/SearchUser";
import ToastMessage from "./components/common/ToastMessage";
import ChatRoom from "./pages/Chat/ChatRoom";
import ChatRoomList from "./pages/Chat/ChatRoomList";
import BookInfo from "./pages/book/BookInfo";
import { checkNewAlarm } from "./actions/Alarm";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkNewAlarm());
  }, []);
  return (
    <div className="App">
      <Router>
        <Route path="/" exact={true} component={Main} />
        <Route path="/location" exact={true} component={LocationSetting} />
        <Route path="/create/deal" exact={true} component={DealCreate} />
        <Route path="/deal/:dealId" exact={true} component={DealDetail} />
        <Route path="/update/deal" exact={true} component={DealCreate} />
        <Route path="/signin" exact={true} component={SignIn} />
        <Route path="/signup" exact={true} component={SignUp} />
        <Route
          path="/search/location"
          exact={true}
          component={LocationSearch}
        />
        <Route path="/books" exact component={SearchBook} />
        <Route path="/books/:isbn" component={BookInfo} />
        <Route path="/recommend" exact={true} component={RecommendUser} />
        <Route path="/following/list" exact={true} component={FollowingList} />
        <Route path="/follower/list" exact={true} component={FollowerList} />
        <Route path="/alarm" exact={true} component={Alarm} />
        <Route path="/redbell/:dealId" exact={true} component={Report} />
        <Route path="/search/user" exact={true} component={SearchUser} />
        <Route path="/chat" exact={true} component={ChatRoomList} />
        <Route path="/chat/room/:id" exact={true} component={ChatRoom} />
      </Router>
      <ToastMessage />
    </div>
  );
}

export default App;
