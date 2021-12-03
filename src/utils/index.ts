export const isValidDate = (d: any) => !isNaN(d) && d instanceof Date;

export const capitalize = (str: string) => !!str ? str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) : '';

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


//ERRORS
export const generalError = 'Ocorreu um erro, por favor tente mais tarde!';

export const numberTypeErrorMessage = (field: string) => `O campo ${field} deve ser um número`;
export const dateTypeErrorMessage = (field: string) => `O campo ${field} deve ser uma data (formato: DD/MM/YYYY, exemplo: 01/02/2022)`;
export const dateTimeTypeErrorMessage = (field: string) => `O campo ${field} deve ser uma data (formato: DD/MM/YYYY hh:mm, exemplo: 01/02/2022 15:15)`;
export const requiredMessage = (field: string) => `O campo ${field} é obrigatório`;