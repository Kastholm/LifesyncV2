export interface BookModel {
    _id: number,
    title: string,
    slug: string,
    image: string[],
    hasRead: boolean,
    yearRead: number
}