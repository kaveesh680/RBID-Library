import {ADD_BOOK, DELETE_BOOK, UPDATE_BOOK} from "../constants/BookConstants";
import {IBook} from "../../types/LibraryTypes";


export interface AddBook {
    type: typeof ADD_BOOK,
    payload: IBook
}

export interface DeleteBook {
    type: typeof DELETE_BOOK,
    payload: string
}

export interface UpdateBook {
    type: typeof UPDATE_BOOK,
    payload: IBook
}

export type BookActionTypes = AddBook | DeleteBook | UpdateBook