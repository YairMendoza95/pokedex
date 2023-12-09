import * as Joi from "joi";

export const JoiValidaionSchema = Joi.object({
    MONGO: Joi.required(),
    PORT: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(5),
});

// Nos ayuda a validar que las variables de entorno vengan como las necesitamos
 