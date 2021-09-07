import {ADD_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHOR} from "../constants/AuthorConstant";
import {IAuthor} from "../../types/LibraryTypes";

export interface AddAuthor {
    type: typeof ADD_AUTHOR,
    payload: IAuthor
}

export interface DeleteAuthor {
    type: typeof DELETE_AUTHOR,
    payload: string
}

export interface UpdateAuthor {
    type: typeof UPDATE_AUTHOR,
    payload: IAuthor
}

export type AuthorActionTypes = AddAuthor | DeleteAuthor | UpdateAuthor