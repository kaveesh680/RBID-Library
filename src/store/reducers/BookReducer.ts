import {IBook} from "../../types/LibraryTypes";
import {BookActionTypes} from "../types/BookActionTypes";
import {ADD_BOOK, DELETE_BOOK, UPDATE_BOOK} from "../constants/BookConstants";


const initialState: bookStateType = {
    books: []
}

interface bookStateType {
    books: IBook[]
}

export const BookReducer = (state: bookStateType = initialState, action: BookActionTypes) => {
    switch (action.type) {
        case ADD_BOOK: {
            return {
                ...state, books: [...state.books, action.payload]
            }
        }
        case DELETE_BOOK: {
            return {
                ...state, books: state.books.filter((book: IBook) => book.id !== action.payload)
            }
        }
        case UPDATE_BOOK: {
            return {
                ...state, books: state.books.map((book: IBook) => {
                    if (book.id === action.payload.id) {
                        return action.payload;
                    }
                    return book;
                })
            }
        }
        default:
            return state;
    }
}