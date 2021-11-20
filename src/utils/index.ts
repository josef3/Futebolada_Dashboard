export const isValidDate = (d: any) => !isNaN(d) && d instanceof Date;

export function shallowEqual(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }
    return true;
}

export const typeErrorMessage = (field: string) => `O campo ${field} deve ser um número`;
export const requiredMessage = (field: string) => `O campo ${field} é obrigatório`;

export const capitalize = (str: string) => !!str ? (str[0].toUpperCase() + str.slice(1)) : '';