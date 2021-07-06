import { applyMiddleware, compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk, logger))
);

export const persistor = persistStore(store);
export default { store, persistor };
