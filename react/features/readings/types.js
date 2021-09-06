// @flow

export const READING_TYPE_ERROR = 'error';
export const READING_TYPE_DEVOTIONAL = 'devotional';

export interface Reading {
    id: string,
    order: number,
    readingType: string,
    body: string,
};
