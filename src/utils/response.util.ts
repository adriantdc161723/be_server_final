class ResponseUtil {
    async RESPONSE (status: number = 0, response: any = {}, count: number = 0, message: string = ""){
        return {status, response, count, message};
    }
}

export default ResponseUtil;