import collections from "@models/index.collections"
import { IGetTechnologiesRequest } from "./dto/getSkills.dto"
import { ApplicationError } from "@utils/applicationError";
import { ICategorySchema, ISkillSchema, ITechnologySchema } from "@models/ICollections";
import { FilterQuery, PaginateOptions, PaginateResult, Types } from "mongoose";
import { ICreateTechnologyRequest } from "./dto/createTechnology.dto";
import config from 'config'
import { IUpdateTechnologyRequest } from "./dto/updateTechnology.dto";
import { IDeleteTechnologyRequest } from "./dto/deleteTechnology.dto";

const getSkills = async (
    payload: IGetTechnologiesRequest
): Promise<ISkillSchema[] | null> => {
    // try {
    //     return await collections.Skill.find({
    //         user: new Types.ObjectId(payload.usrId)
    //     }).populate([
    //         { strictPopulate: false, path: 'Technology' },
    //         { strictPopulate: false, path: 'Category' }
    //     ])
    // } catch (error) {
    //     throw new ApplicationError({
    //         message: 'Ocurrio un error al obtener las tecnologias', source: error
    //     });
    // }
    return "asd" as any
}

const createTechnology = async (
    payload: ICreateTechnologyRequest
): Promise<ITechnologySchema> => {
    try {
        /* 
            -> Verificar si el usuario tiene un registro de Skills con
                la categoria de la tecnologia que quiere crear.
            -> Caso de no tener, crear registro de ISkilSchema
            -> Crear registro de nueva tecnologia
            -> Insertar idTecnologia dentro del technologysList de ISkillSchema
             
        
        */

        // const newTechnology = await collections.Technology.create({
        //     name: payload.name,
        //     image: `${config.get('server.public_url')}/${payload.image[0].filename}`,
        //     category: new Types.ObjectId(payload.idCategory),
        //     user: new Types.ObjectId(payload.usrId)
        // })

        // await collections.User.findByIdAndUpdate(
        //     payload.usrId,
        //     {
        //         $push: { techologyList: new Types.ObjectId(newTechnology._id) }
        //     }
        // )

        // return newTechnology
        return "asd" as any
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al crear una tecnologia',
            source: error
        })
    }
}

const updateTechnology = async (
    payload: IUpdateTechnologyRequest
): Promise<ITechnologySchema | null> => {
    // try {
    //     return await collections.Technologies.findByIdAndUpdate(
    //         payload.idTechnology,
    //         {
    //             name: payload.name,
    //             image: payload.image,
    //             category: new Types.ObjectId(payload.idCategory)
    //         }
    //     )
    // } catch (error) {
    //     throw new ApplicationError({
    //         message: 'Ha ocurrido un error al actualziar esta tecnologia',
    //         source: error
    //     })
    // }
}

const deleteTechnology = async (
    payload: IDeleteTechnologyRequest
): Promise<boolean> => {
    // try {
    //     const techDelete = await collections.Technologies.deleteById(payload.idTechnology)

    //     await collections.Users.findByIdAndUpdate(
    //         payload.usrId,
    //         {
    //             $pull: { techologyList: new Types.ObjectId(payload.idTechnology) }
    //         }
    //     )

    //     return techDelete.deletedCount === 1
    // } catch (error) {
    //     throw new ApplicationError({ message: 'Ha ocurrido un error al eliminar este album', source: error })
    // }
}

const findTechnologyByFields = async (
    objFind: any
): Promise<ITechnologySchema | null> => {
    // try {
    //     return await collections.Technologies.findOne(objFind)
    // } catch (error) {
    //     throw new ApplicationError({
    //         message: 'Ha ocurrido un error al obtener la tecnologia',
    //         source: error
    //     });
    // }
}


const findCategoryByFields = async (
    objFind: any
): Promise<ICategorySchema | null> => {
    // try {
    //     return await collections.Categories.findOne(objFind)
    // } catch (error) {
    //     throw new ApplicationError({
    //         message: 'Ha ocurrido un error al obtener la categoria',
    //         source: error
    //     });
    // }
}

export default {
    getSkills,
    createTechnology,
    updateTechnology,
    deleteTechnology,
    findTechnologyByFields,
    findCategoryByFields
}


// const getTechnologies = async (
//     payload: IGetTechnologiesRequest
// ): Promise<PaginateResult<ITechnologySchema>> => {
//     try {
//         const query: FilterQuery<ITechnologySchema> = {
//             _id: payload.usrId
//         }
//         const options: PaginateOptions = {
//             page: payload.page,
//             limit: 6,
//             populate: { strictPopulate: false, path: 'Categories' }
//         }

//         return await collections.Technologies.paginate(query, options)
//     } catch (error) {
//         throw new ApplicationError({
//             message: 'Ocurrio un error al obtener las tecnologias', source: error
//         });
//     }
// }