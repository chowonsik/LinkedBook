import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";

import { bookReducer } from "../reducers/Books";
import { userReducer } from "../reducers/Users";
import { followReducer } from "../reducers/Follow";
import { reportReducer } from "../reducers/Report";
import { searchReducer } from "../reducers/Search";
import { notificationReducer } from "../reducers/Notification";
const rootReducer = combineReducers({
  bookReducer,
  userReducer,
  followReducer,
  reportReducer,
  searchReducer,
  notificationReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export default store;
