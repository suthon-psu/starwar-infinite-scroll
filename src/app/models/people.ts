export interface People{
    name: string
    height: string
    mass: string
}

export interface PeopleQueryResult {
    hasNext: boolean
    results: People[]
}