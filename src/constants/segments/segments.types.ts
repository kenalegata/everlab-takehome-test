export interface SEGMENT_FIELDS_TYPE {
    [key: string]: string[];
}

export interface SEGMENT_SUBFIELDS_TYPE {
    [key: string]: {
        [subfield: string]: string[];
    };
}