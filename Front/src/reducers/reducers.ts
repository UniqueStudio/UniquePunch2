import { combineReducers } from "redux";
import { UserStore, userReducer } from "./user";

export interface StoreState {
    user: UserStore;
}

export const reducers = combineReducers({
    user: userReducer
});
