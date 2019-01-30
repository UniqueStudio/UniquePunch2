import axios from "axios";

class RabbitAjax {
    static async get(url: string, data?: any, Authorization: boolean = true) {
        if (Authorization) {
            axios.defaults.headers.get["Authorization"] = localStorage.getItem("token");
        }
        return await axios.get(url, data || {});
    }
    static async post(url: string, data?: any, Authorization: boolean = true) {
        if (Authorization) {
            axios.defaults.headers.post["Authorization"] = localStorage.getItem("token");
        }
        return await axios.post(url, data || {});
    }
}

export default RabbitAjax;
