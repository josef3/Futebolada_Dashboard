import * as Yup from 'yup';
//-------------------- Utils --------------------------
import { numberTypeErrorMessage, requiredMessage } from 'utils';
//----------------------------------------------------------

const higherOrEqualMessage = (field: string, value: number = 0) => `O nº de ${field} deve ser igual ou superior a ${value}`;
const lowerOrEqualMessage = (field: string, value: number = 60) => `O nº de ${field} deve ser inferior ou igual a ${value}`;

const schema = Yup.object({
    idWeek: Yup.number()
        .typeError(numberTypeErrorMessage('Id Semana'))
        .required(requiredMessage('Id semana')),
    stats: Yup.array().of(
        Yup.object({
            idPlayer: Yup.number()
                .typeError(numberTypeErrorMessage('Id Jogador'))
                .required(requiredMessage('Id jogador')),
            goals: Yup.number()
                .typeError(numberTypeErrorMessage('Golos'))
                .min(0, higherOrEqualMessage('Golos'))
                .max(60, lowerOrEqualMessage('Golos'))
                .required(requiredMessage('Golos')),
            assists: Yup.number()
                .typeError(numberTypeErrorMessage('Assistências'))
                .min(0, higherOrEqualMessage('Assistências'))
                .max(60, lowerOrEqualMessage('Assistências'))
                .required(requiredMessage('Assistências')),
            shotsTarget: Yup.number()
                .typeError(numberTypeErrorMessage('Remates Enquadrados'))
                .min(0, higherOrEqualMessage('Remates Enquadrados'))
                .max(60, lowerOrEqualMessage('Remates Enquadrados'))
                .max(Yup.ref('totalShots'), 'O nº de remates enq. não pode ser superior ao total')
                .required(requiredMessage('Remates Enquadrados')),
            totalShots: Yup.number()
                .typeError(numberTypeErrorMessage('Total de Remates'))
                .min(0, higherOrEqualMessage('Total de Remates'))
                .max(60, lowerOrEqualMessage('Total de Remates'))
                .required(requiredMessage('Total de Remates')),
            tackles: Yup.number()
                .typeError(numberTypeErrorMessage('Desarmes'))
                .min(0, higherOrEqualMessage('Desarmes'))
                .max(60, lowerOrEqualMessage('Desarmes'))
                .required(requiredMessage('Desarmes')),
            interceptions: Yup.number()
                .typeError(numberTypeErrorMessage('Recuperações'))
                .min(0, higherOrEqualMessage('Recuperações'))
                .max(60, lowerOrEqualMessage('Recuperações'))
                .required(requiredMessage('Recuperações')),
            blocks: Yup.number()
                .typeError(numberTypeErrorMessage('Bloqueios'))
                .min(0, higherOrEqualMessage('Bloqueios'))
                .max(60, lowerOrEqualMessage('Bloqueios'))
                .required(requiredMessage('Bloqueios')),
            nutmegsSuffered: Yup.number()
                .typeError(numberTypeErrorMessage('Cuecas Sofridas'))
                .min(0, higherOrEqualMessage('Cuecas Sofridas'))
                .max(60, lowerOrEqualMessage('Cuecas Sofridas'))
                .required(requiredMessage('Cuecas Sofridas')),
            nutmegsMade: Yup.number()
                .typeError(numberTypeErrorMessage('Cuecas Efetuadas'))
                .min(0, higherOrEqualMessage('Cuecas Efetuadas'))
                .max(60, lowerOrEqualMessage('Cuecas Efetuadas'))
                .required(requiredMessage('Cuecas Efetuadas')),
        })
    )
}).required();

export default schema;