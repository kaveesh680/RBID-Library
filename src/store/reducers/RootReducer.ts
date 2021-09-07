import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {AuthorReducer} from "./AuthorReducer";
import {BookReducer} from "./BookReducer";

export const rootReducer = combineReducers({
    authorReducer: AuthorReducer,
    bookReducer: BookReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools());
