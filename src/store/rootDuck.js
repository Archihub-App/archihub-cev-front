import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as app from "./ducks/app.duck";
import * as museo from "./ducks/museo.duck";

export const rootReducer = combineReducers({
  app: app.reducer,
  museo: museo.reducer,
});

export function* rootSaga() {
  yield all([]);
}
