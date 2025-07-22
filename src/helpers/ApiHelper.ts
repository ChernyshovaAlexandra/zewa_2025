import { apiClient } from "@/api";

export type CheckData = {
    telegram_id: number;
    fn: string;
    fd: string;
    fp: string;
    sum: string;
    date: string;
    imgBase64?: string
    hash: string,
    payload: string,
    ts: number
}

class ApiHelper {
    static async sendAuthDataToServer(data: {
        telegram_id: number,
        username: string,
        hash: string,
        ts: number,
        payload: string
    }) {
        try {

            const response = await apiClient.post("/api/start", data, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error('Ошибка при отправке авторизационных данных на сервер:', error);
            throw error;
        }
    }




    static async activateCoupon(data: {
        telegram_id: number,
        type: "barcode" | "code",
        coupon_id: number,
        hash: string,
        payload: string,
        ts: number
    }) {
        try {
            const response = await apiClient.post("/api/activate-coupon", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseData = response.data;

            if (responseData.success) {
                return responseData
            } else {
                return responseData.message;
            }
        } catch (error) {
            return error;
        }
    }


    static async addCheckImageManual(data: {
        telegram_id: number;
        imgBase64: string;
        hash: string,
        payload: string,
        ts: number
    }) {
        try {
            const response = await apiClient.post("/api/add-check", {
                telegram_id: data.telegram_id,
                img: data.imgBase64,
                hash: data.hash || "",
                ts: data.ts,
                payload: data.payload,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = response.data;

            if (responseData.success) {
                return responseData
            } else {
                return responseData;
            }
        } catch (error) {
            return error;
        }
    }

    static async checkScanData(data: CheckData) {
        try {
            const response = await apiClient.post("/api/add-check", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = response.data;
            return responseData
        } catch (error) {
            return error;
        }
    }

    static parseQRCode(rawValue: string): any {
        const params = new URLSearchParams(rawValue.replace(/&/g, '&'));
        const date = params.get('t') || '';
        const sum = params.get('s') || '';
        const fn = params.get('fn') || '';
        const fd = params.get('i') || '';
        const fp = params.get('fp') || '';
        return {
            fn,
            fd,
            fp,
            sum,
            date
        };
    }


    static async finishGame(data: {
        telegram_id: number;
        game: number;
        result: number;
        hash: string,
        payload: string,
        ts: number
    }) {
        try {
            const response = await apiClient.post("/api/game/result", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = response.data;
            return responseData;
        }
        catch (error) {
            return false;
        }
    }

    static async startGameWithApi(data: {
        telegram_id: number;
        game: number;
        hash: string,
        payload: string,
        ts: number
    }) {
        try {
            const response = await apiClient.post("/api/game/start", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = response.data;
            return responseData;
        }
        catch (error) {
            return error;
        }
    }

    static async getHistory(data: {
        telegram_id: number;
        hash: string,
        payload: string,
        ts: number
    }) {
        try {
            const response = await apiClient.post("/api/history", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = response.data;
            if (responseData.success) {
                return responseData;
            } else {
                return responseData.message;
            }
        }
        catch (error) { return error; }
    }
}

export default ApiHelper;
