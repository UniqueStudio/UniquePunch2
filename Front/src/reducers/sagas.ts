import { checkLoginStatus, UserInfoType } from "../model/checkLoginStatus";
import { put, takeEvery, all } from "redux-saga/effects";
import { login, logout } from "./action";

export const checkLoginStatusSaga = function*() {
    const { status, data } = yield checkLoginStatus();
    if (status) {
        const token = localStorage.getItem("token") || "";
        const { isAdmin, avatar, username } = data as UserInfoType;
        yield put(login(token, isAdmin, avatar, username));
    } else {
        yield put(logout());
    }
};

export const watchLoginStatusSaga = function*() {
    yield takeEvery("CHECK_LOGIN_STATUS_ASYNC", checkLoginStatusSaga);
};

export default function* sagaRoot() {
    yield all([watchLoginStatusSaga()]);
}
