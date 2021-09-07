import {IBook} from "../../types/LibraryTypes";
import {ADD_BOOK, DELETE_BOOK, UPDATE_BOOK} from "../constants/BookConstants";
import {AddBook, DeleteBook, UpdateBook} from "../types/BookActionTypes";


export const addBook = (book: IBook): AddBook => {
    return {
        type: ADD_BOOK,
        payload: book
    }
}

export const deleteBook = (id: string): DeleteBook => {
    return {
        type: DELETE_BOOK,
        payload: id
    }
}

export const updateBook = (book: IBook): UpdateBook => {
    return {
        type: UPDATE_BOOK,
        payload: book
    }
}