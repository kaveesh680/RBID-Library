import {ADD_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHOR} from "../constants/AuthorConstant";
import {AddAuthor, DeleteAuthor, UpdateAuthor} from "../types/AuthorActionTypes";
import {IAuthor} from "../../types/LibraryTypes";

export const addAuthor = (author: IAuthor): AddAuthor => {
    return {
        type: ADD_AUTHOR,
        payload: author
    }
}

export const deleteAuthor = (id: string): DeleteAuthor => {
    return {
        type: DELETE_AUTHOR,
        payload: id
    }
}

export const updateAuthor = (author: IAuthor): UpdateAuthor => {
    return {
        type: UPDATE_AUTHOR,
        payload: author
    }
}
