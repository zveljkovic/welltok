import { combineReducers } from "redux";
import bookList from "./bookList";
import auth from "./auth";
import { reducer as sematable } from 'sematable';

export default combineReducers({ bookList, sematable, auth });
