import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom"; // 히스토리 모드 제거
import "./App.css";
import Alarm from "./pages/Alarm";
import BookInfo from "./pages/book/BookInfo";
import BookDeals from "./pages/book/BookDeals";
import ChatRoom from "./pages/Chat/ChatRoom";
import ChatRoomList from "./pages/Chat/ChatRoomList";
import ChangePassword from "./pages/Profile/ChangePassword";
import DealDetail from "./pages/Main/DealDetail";
import DealCreate from "./pages/deal/CreateDeal";
import FollowerList from "./pages/Follow/FollowerList";
import FollowingList from "./pages/Follow/FollowingList";
import LikeComments from "./pages/book/LikeComments";
import LikeBooks from "./pages/book/LikeBooks";
import LocationSetting from "./pages/Main/LocationSetting";
import LocationSearch from "./pages/user/LocationSearch";
import Main from "./pages/Main";
import MyComments from "./pages/Profile/MyComments";
import OauthLogin from "./pages/user/SignIn/OAuth";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/Profile/ProfileUpdate";
import PublicRoute from "./lib/PublicRoute.js";
import PrivateRoute from "./lib/PrivateRoute";
import Report from "./pages/Report";
import RecommendUser from "./pages/user/RecommendUser";
import SearchBook from "./pages/book/SearchBook";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import SearchUser from "./pages/SearchUser";
import SizeAlert from "./pages/SizeAlert";
import ToastMessage from "./components/common/ToastMessage";
import UserHistory from "./pages/Profile/UserHistory";

function App() {
  return (
    <div className="App">
      <div id="app-content">
        <Router>
          <PrivateRoute path="/" exact={true} component={Main} />
          <PrivateRoute
            path="/location"
            exact={true}
            component={LocationSetting}
          />
          <PrivateRoute
            path="/create/deal"
            exact={true}
            component={DealCreate}
          />
          <PrivateRoute
            path="/deal/:dealId"
            exact={true}
            component={DealDetail}
          />
          <PrivateRoute
            path="/update/deal"
            exact={true}
            component={DealCreate}
          />
          <PublicRoute
            restricted={true}
            path="/signin"
            exact={true}
            component={SignIn}
          />
          <PublicRoute
            restricted={true}
            path="/signup"
            exact={true}
            component={SignUp}
          />
          <PublicRoute
            restricted={true}
            path="/signup/search/location"
            exact={true}
            component={LocationSearch}
          />
          <PrivateRoute
            path="/search/location"
            exact
            component={LocationSearch}
          />
          <PrivateRoute path="/books" exact component={SearchBook} />
          <PrivateRoute path="/books/:isbn" exact component={BookInfo} />
          <PrivateRoute path="/books/:isbn/deals" exact component={BookDeals} />
          <PrivateRoute
            path="/recommend"
            exact={true}
            component={RecommendUser}
          />
          <Switch>
            <PrivateRoute
              path="/profile/update"
              exact={true}
              component={ProfileUpdate}
            />
            <PrivateRoute
              path="/profile/:id"
              exact={true}
              component={Profile}
            />
          </Switch>
          <PrivateRoute
            path="/profile/:id/history"
            exact={true}
            component={UserHistory}
          />
          <PrivateRoute
            path="/profile/:id/history/comments"
            exact={true}
            component={MyComments}
          />
          <PrivateRoute
            path="/profile/update/password"
            exact={true}
            component={ChangePassword}
          />
          <PrivateRoute
            path="/following/:userId"
            exact={true}
            component={FollowingList}
          />
          <PrivateRoute
            path="/follower/:userId"
            exact={true}
            component={FollowerList}
          />
          <PrivateRoute path="/alarm" exact={true} component={Alarm} />
          <PrivateRoute
            path="/redbell/:dealId"
            exact={true}
            component={Report}
          />
          <PrivateRoute
            path="/search/user"
            exact={true}
            component={SearchUser}
          />
          <PrivateRoute path="/chat" exact={true} component={ChatRoomList} />
          <PrivateRoute
            path="/chat/room/:id"
            exact={true}
            component={ChatRoom}
          />
          <PrivateRoute
            path="/book/likes/:isbn"
            exact={true}
            component={LikeBooks}
          />
          <PrivateRoute
            path="/comment/:id/likes"
            exact={true}
            component={LikeComments}
          />
          <PublicRoute
            path="/auth/:type/callback"
            exact={true}
            component={OauthLogin}
          />
          <PublicRoute
            restricted={true}
            path="/onboarding"
            exact={true}
            component={Onboarding}
          />
        </Router>
        <ToastMessage />
      </div>

      <div id="alert">
        <SizeAlert />
      </div>
    </div>
  );
}

export default App;
