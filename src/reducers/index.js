import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import adReducer from "./ad.reducer";
import commentReducer from "./comment.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ads: adReducer,
  comments: commentReducer,
});

export default persistReducer(persistConfig, rootReducer);
