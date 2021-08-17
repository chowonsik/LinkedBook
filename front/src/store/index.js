import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";

import { bookReducer } from "../reducers/Books";
import { userReducer } from "../reducers/Users";
import { userProfileReducer } from "../reducers/Profile";
import { followReducer } from "../reducers/Follow";
import { dealReducer } from "../reducers/Deal";
import { reportReducer } from "../reducers/Report";
import { searchReducer } from "../reducers/Search";
import { notificationReducer } from "../reducers/Notification";
import { chatReducer } from "../reducers/Chat";
import { myHistoryReducer } from "../reducers/MyHistory";
import { commentReducer } from "../reducers/Comments";

const rootReducer = combineReducers({
  bookReducer,
  userReducer,
  userProfileReducer,
  followReducer,
  dealReducer,
  reportReducer,
  searchReducer,
  notificationReducer,
  chatReducer,
  myHistoryReducer,
  commentReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export default store;
