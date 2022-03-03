import { createStore, applyMiddleware } from "redux";
import reducer from "./pieChart/reducer";
import saga from "./pieChart/saga";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
export default store;
