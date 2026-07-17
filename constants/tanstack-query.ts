type Key = 'EMPLOYEE' | 'LABELING' | 'ITEM'
type Action = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'



type MutationKey = {
    [K in Key]: {
        [A in Action]: `${K}-${A}`
    }
}

export const MUTATION_KEY: MutationKey = {
    EMPLOYEE: {
        CREATE: 'EMPLOYEE-CREATE',
        READ: 'EMPLOYEE-READ',
        DELETE: 'EMPLOYEE-DELETE',
        UPDATE: 'EMPLOYEE-UPDATE'
    },
    ITEM: {
        CREATE: 'ITEM-CREATE',
        READ: 'ITEM-READ',
        DELETE: 'ITEM-DELETE',
        UPDATE: 'ITEM-UPDATE'
    },
    LABELING: {
        CREATE: 'LABELING-CREATE',
        READ: 'LABELING-READ',
        UPDATE: 'LABELING-UPDATE',
        DELETE: 'LABELING-DELETE'
    }
}