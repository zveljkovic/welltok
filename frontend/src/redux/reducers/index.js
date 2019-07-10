import { combineReducers } from "redux";
import bookList from "./bookList";
import { reducer as sematable } from 'sematable';

export default combineReducers({ bookList, sematable });
