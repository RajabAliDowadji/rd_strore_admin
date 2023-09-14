import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./Hooks/redux/Index";
import rootSaga from "./Hooks/Saga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
export const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);
