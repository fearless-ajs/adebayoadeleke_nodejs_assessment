class Core {
    constructor() {
    }

    randomString = (length) => {
        let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = "";
        let charactersLength = characters.length;

        for ( let i = 0; i < length ; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
module.exports = Core;