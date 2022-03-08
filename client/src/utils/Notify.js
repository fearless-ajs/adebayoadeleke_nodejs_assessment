import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Notify {
    constructor() {
        toast.configure();
    }

    success = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    error = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    warn = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    info = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }


}

export default new Notify;