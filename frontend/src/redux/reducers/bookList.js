import {FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, BOOKS_LIST_CLEAR_MESSAGE} from "../actionTypes";

const initialState = {
    isFetching: false,
    books: [],
    errorMessage: null,
    successMessage: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_BOOKS_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                books: [],
                errorMessage: null,
                successMessage: null,
            });
        }
        case FETCH_BOOKS_SUCCESS: {
            const { books } = action.payload;
            return Object.assign({}, state, {
                isFetching: false,
                books: books,
                errorMessage: null,
                successMessage: 'Data loaded successfully',
            });
        }
        case FETCH_BOOKS_FAILURE: {
            const { errorMessage } = action.payload;
            return Object.assign({}, state, {
                isFetching: false,
                books: [],
                errorMessage: errorMessage,
                successMessage: null,
            });
        }
        case BOOKS_LIST_CLEAR_MESSAGE: {
            return  Object.assign({}, state, {
                errorMessage: null,
                successMessage: null,
            });
        }

        default:
            return state;
    }
}
