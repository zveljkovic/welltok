import {
    AUTH_STORE_TOKEN
} from "../actionTypes";
import * as jsrsasign from "jsrsasign";

const initialState = {
    token: localStorage.getItem('authToken'),
    scopes: [],
    userId: null,
};
if (initialState.token) {
    const payload = jsrsasign.jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(initialState.token.split(".")[1]));
    initialState.scopes = payload.scopes;
    initialState.userId = payload.userId;
}

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_STORE_TOKEN: {
            const { token } = action.payload;

            if (token) {
                localStorage.setItem('authToken', token);
                const payload = jsrsasign.jws.JWS.readSafeJSONString(jsrsasign.b64utoutf8(token.split(".")[1]));
                return Object.assign({}, state, {
                    token,
                    userId: payload.userId,
                    scopes: payload.scopes,
                });
            } else {
                localStorage.removeItem('authToken');
                return Object.assign({}, state, {
                    token,
                    userId: null,
                    scopes: [],
                });
            }

        }
        default:
            return state;
    }
}
