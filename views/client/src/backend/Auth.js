import Helper, {endPoint} from "./Api";
import axios from "axios";
import Api from "./Api";

class Auth extends Api{

    authenticateUser = async (email, password) => {
        return await axios.post(`${this.endPoint()}/users/sign-in`, {
            email,
            password
        },{ withCredentials: true });
    }

    updateSettings = async (...data) => {
        return await axios.post(`${this.endPoint()}/system`, { data
        },{ withCredentials: true })
            .then(response => {
                return response
            })
            .catch(error => {
                // console.log(error.response.data)
                return error
            });
    }

    isUserLoggedIn = async () => {
        return axios.post(`${this.endPoint()}/users/is-logged-in`, {
        },{ withCredentials: true });
    }

    logout = async () => {
       await axios.post(`${this.endPoint()}/users/sign-out`, {},{ withCredentials: true });
    }
}

export default new Auth;