import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_FAILURE,
    FETCH_BOOKS_SUCCESS,
    BOOKS_LIST_CLEAR_MESSAGE,
    AUTH_STORE_TOKEN
} from "./actionTypes";
import {BookApi} from "../libraries/BookApi";
const fetchBookRequest = () => ({
    type: FETCH_BOOKS_REQUEST
});

const fetchBookFailure = errorMessage => ({
    type: FETCH_BOOKS_FAILURE,
    payload: {errorMessage}
});

const fetchBookSuccess = books => ({
    type: FETCH_BOOKS_SUCCESS,
    payload: {books}
});

const bookListClearMessages = () => ({
    type: BOOKS_LIST_CLEAR_MESSAGE,
});

export const storeAuthToken = (token) => ({
    type: AUTH_STORE_TOKEN,
    payload: { token },
});

export function fetchBooks() {
    return async (dispatch, getState) => {
        dispatch(fetchBookRequest());
        const {auth} = getState();
        console.log(auth);
        const response = await new BookApi(auth.token).fetchAllBooks();
        if (response.status === 'ok') {
            dispatch(fetchBookSuccess(response.data))
        } else {
            dispatch(fetchBookFailure(response.errorMessage))
        }
        setTimeout(() => dispatch(bookListClearMessages()), 3000);
    }
}
