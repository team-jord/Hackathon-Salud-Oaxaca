import httpClient from "./HttpClient";

const prefix = "/s3url";

export default class ImagenesService {

    static async upload(file) {
        let data = new FormData();
        data.append("foto", file);
        const result = (await httpClient.post(prefix, data)).data;
        return {
            result,
        };
    }

    static async get(key) {
        const result = (await httpClient.get("s3Url2" + "/" + key)).data;

        return {
            result
        };
    }

    static async delete(key) {
        const result = (await httpClient.delete(prefix + "/" + key)).data;

        return {
            result
        };
    }
}

