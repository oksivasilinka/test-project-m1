export const SORT_TYPES = {
    asc: 'ASC',
    desc: 'DESC',
} as const

export type SortTypes = typeof SORT_TYPES[keyof typeof SORT_TYPES];