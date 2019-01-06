/**
 * Classe com as mensagens de erro para o mongoose
 */
class Messages {
    required: string = "The '{PATH}' field is required";
    min: string = "The value '{VALUE}' is less than the minimum accepted";
    max: string = "The value '{VALUE}' is greater than the maximum accepted";
    enum: string = "The value '{VALUE}' is not valid for the field '{PATH}'";
}

export const messages = new Messages();