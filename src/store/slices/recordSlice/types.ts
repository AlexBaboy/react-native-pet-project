export enum Published {
    Published= 'Published',
    Draft = 'Draft'
}

export type RecordState = {
    id: number,
    title: string,
    description: string,
    published: Published,
    img: string,
    createdAt: string
};

export type initialStateType = {
    records: RecordState[]
}