// @flow

export type Reading = {

    /**
     * unique ID of this reading
     */
    id: string,

    /**
     * The sort order of this reading
     */
    order: number,

    /**
     * The type of this reading
     */
    readingType: string,

    /**
     * The text of this reading
     */
    body: string,
};
