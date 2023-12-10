/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import {
    ICallSrvRequest,
    ICallSrvError,
    ICallSrvResponse,
    IConfigInit,
    IHeaders, ICallBackendOptions
} from './interface/index.interfaces';
import { magnamentStorage } from '@/utils/index.utils';
import { ui } from '../index.libraries';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let srv: AxiosInstance;
let headersCfg: IHeaders

export const apiSrv = {

    /**
     * Inicializacion de config del ApiSrv
     * @param {*} config 
     */
    init: (config: IConfigInit) => {
        apiSrv.setHeaders(config.info)

        srv = axios.create({
            baseURL: config.url,
            withCredentials: true,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'es-ES,es;q=0.9',
                'Content-Type': 'application/json;charset=UTF-8',
            }
        })
        srv.interceptors.request.use(
            (request: InternalAxiosRequestConfig) => {
                /// Setear los headers que actualice por aca....
                type headersKeyType = keyof typeof headersCfg; // No lo entendi, pero anda XD.

                for (const headerKey in headersCfg) {
                    if (headerKey) {
                        const value = headersCfg[headerKey as headersKeyType]
                        request.headers.set(headerKey, value)
                    }
                }
                return request
            },
            (error: AxiosError) => { return Promise.reject(error); }
        )
        srv.interceptors.response.use(
            (response: AxiosResponse) => { return response; },
            (error: AxiosError) => {
                // Hice que el 401 sea especifico de token
                if (error.response?.status === 401) {
                    magnamentStorage.remove("user");
                    window.location.href = `${window.location.origin}/auth`;

                    // Hacer q aparezca un popup con el mensaje
                    //ui.notify.showNotify('Se inicio sesion', 'error')
                }
                return Promise.reject(error.response);
            }
        )
    },

    setHeaders: (headers: IHeaders) => {
        headersCfg = headers
    },

    /**
     * 
     * @param preCallback Function exceute end-point to back 
     * @param options Declare if this function has loader or status
     * @returns Return data with these attributes: info: {type: string; msg: string; data: any}
     */
    callBackend: async (
        preCallback: () => Promise<ICallSrvResponse>, options: ICallBackendOptions
    ): Promise<ICallSrvResponse> => {

        let res = {} as ICallSrvResponse

        try {
            //if (options.loader) showPopupSpinnerFn(true, false, '')

            res = await preCallback() as ICallSrvResponse

            if (res.info.type === 'error') throw new Error(res.info.msg)

            if (options.status && res.info.msg) {
                ui.notify.showNotify(res.info.msg, res.info.type)
            }
        } catch (error: unknown) {
            const err = error as Error
            ui.notify.showNotify(err.message, 'error')
        } finally {
            //const time = options.status ? 3000 : 0
            //setTimeout(() => {
            //    showPopupSpinnerFn(false, false, '')
            //}, time);
        }
        return res.info.data ?? ((res.info.type !== 'error') && (res.info.type !== 'warning'))
    },

    callSrv: async (optCallSrv: ICallSrvRequest): Promise<ICallSrvResponse> => {

        const { method, path, data } = optCallSrv
        let res = {} as ICallSrvResponse

        try {
            if (method === "GET") {
                const params = { ...(data && data) }
                res = await (await srv.get(path, {
                    params: params || {}
                })).data
            }
            if (method === "POST") res = await (await srv.post(path, data)).data
            if (method === "PUT") res = await (await srv.put(path, data)).data
            if (method === "DELETE") res = await (await srv.delete(path)).data
        } catch (error: unknown) {
            const err = error as ICallSrvError
            err.data.info
                ? res = err.data
                : res = { info: { type: 'error', msg: err.message } }
        }
        return res
    }
}

