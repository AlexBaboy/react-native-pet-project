export enum Published {
    Published= 'Published',
    Draft = 'Draft'
}

export type RecordState = {
    id?: number,
    title: string,
    description: string,
    published: string,
    photoUrl: string,
    createdAt?: string
};

export type initialStateType = {
    records: RecordState[]
}