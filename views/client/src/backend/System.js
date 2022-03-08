import axios from "axios";
import Api from "./Api";

class System extends Api{

    updateSettings = async (data) => {
        delete data.loading;
        delete data.errorCode;
        return await axios.patch(`${this.endPoint()}/system`, data,{
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }

    fetchCurrentSettings = async () => {
        return await axios.get(`${this.endPoint()}/system`,{ withCredentials: true });
    }

}

export default new System;