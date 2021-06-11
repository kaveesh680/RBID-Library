export interface IAuthor {
    name:string,
    id:string
}

export interface IBookDetails{
    name:string,
    author:IAuthor,
    isbn:string
}

export interface IBook {
    id:string,
    details:IBookDetails
}

export interface ILabelOption{
    id:string,
    label:string
}