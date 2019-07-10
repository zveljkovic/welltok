import { FETCH_BOOKS_REQUEST, FETCH_BOOKS_FAILURE, FETCH_BOOKS_SUCCESS, BOOKS_LIST_CLEAR_MESSAGE } from "./actionTypes";
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

export function fetchBooks() {
    return async (dispatch) => {
        dispatch(fetchBookRequest());
        const response = await BookApi.fetchAllBooks();
        if (response.status === 'ok') {
            dispatch(fetchBookSuccess(response.data))
        } else {
            dispatch(fetchBookFailure(response.errorMessage))
        }
        setTimeout(() => dispatch(bookListClearMessages()), 3000);
    }
}
