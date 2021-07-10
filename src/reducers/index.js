import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import adReducer from "./ad.reducer";
import commentReducer from "./comment.reducer";
import filterReducer from "./filter.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ads: adReducer,
  comments: commentReducer,
  filter: filterReducer,
});

export default persistReducer(persistConfig, rootReducer);
