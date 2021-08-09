import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";

import { bookReducer } from "../reducers/Books";
import { userReducer } from "../reducers/Users";
import { followReducer } from "../reducers/Follow";
import { dealReducer } from "../reducers/Deal";
const rootReducer = combineReducers({
  bookReducer,
  userReducer,
  followReducer,
  dealReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export default store;
