import {IAuthor} from "../../types/LibraryTypes";
import {ADD_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHOR} from "../constants/AuthorConstant";
import {AuthorActionTypes} from "../types/AuthorActionTypes";

const initialState: authorStateType = {
    authors: []
}

interface authorStateType {
    authors: IAuthor[]
}

export const AuthorReducer = (state: authorStateType = initialState, action: AuthorActionTypes) => {
    switch (action.type) {
        case ADD_AUTHOR: {
            return {
                ...state, authors: [...state.authors, action.payload]
            }
        }
        case DELETE_AUTHOR: {
            return {
                ...state,
                authors: state.authors.filter((author: IAuthor) =>
                    author.id !== action.payload
                )
            }
        }
        case UPDATE_AUTHOR: {
            return {
                ...state,
                authors: state.authors.map((author: IAuthor) => {
                    if (author.id === action.payload.id) {
                        return action.payload
                    }
                    return author
                })
            }
        }
        default:
            return state
    }
}



