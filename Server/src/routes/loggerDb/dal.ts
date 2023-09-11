import { IFilterPagination } from "@interface/pagination";
import { IRegisterDbSchema } from "@models/ICollections"
import collections from "@models/index.collections";
import { ApplicationError } from "@utils/applicationError";
import { FilterQuery, PaginateOptions, PaginateResult } from "mongoose";



const getAllLogerDb = async (opts: IFilterPagination): Promise<PaginateResult<IRegisterDbSchema>> => {
    try {
        const { page, filterText = '' } = opts

        const options: PaginateOptions = {
            page,
            limit: 3,
            populate: { strictPopulate: false, path: 'User' }
        }
        const query: FilterQuery<IRegisterDbSchema> = {
            ...((filterText !== '') && {
                type: { $regex: new RegExp(filterText), $options: 'i' }
            }),
        }
        return await collections.RegisterDb.paginate(query, options)
    } catch (error) {
        throw new ApplicationError({ 
            message: 'Ha ocurrido un error al obtener el listado de registros', 
            source: error 
        })
    }
}

export default {
    getAllLogerDb,
}