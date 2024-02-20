import { validateResultsHandler } from "@middlewares/index.middlewares";
import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";

export const validatorAddTechnologyRequest = [
    body('name', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(), // No puede venir vacio

    body("image")
        .optional()
        .custom((value) => {
            let flag = false
            const file = value[0]?.originalname.split(".").pop();
            if (file === 'png' || file === 'jpeg' || file === 'jpg') flag = true
            return flag
        })
        .withMessage('Debe enviar UNA imagen de formato .png o .jpeg o jpg.'),

    body('idCategory', "Este campo es requerido")
        .exists({ checkFalsy: true }) // Los campos con valores falsos (por ejemplo, "", 0, falso, nulo) tampoco existirán'),
        .trim() // Elimina los espacios del comienzo y final del texto
        .notEmpty(),

    (req: Request, res: Response, next: NextFunction) => validateResultsHandler(req, res, next)
]