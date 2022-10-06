import Joi, {ObjectSchema} from "joi";
import { NextFunction, Response, Request } from "express";
import Logging from "../library/Logging";
import { IUser } from "../models/User";
import { IPost } from "../models/Post";

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body)
            next()
        } catch (error) {
            Logging.error(error)
            return res.status(422).json({error})
        }
    }
}

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
            uid: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().required(),
            uid: Joi.string().required()
        })
    },
    post: {
        create: Joi.object<IPost>({
            authorId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/) //mongo id is alphanumeric & 24 char long
                .required(),
            title: Joi.string().required(),
            body: Joi.string().required(),
            date: Joi.date()
        }),
        update: Joi.object<IPost>({
            authorId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required(),
            body: Joi.string().required(),
            date: Joi.date()
        })
    }
}