class ApiResponseFormatter {
    constructor(res) {
        this.res = res;
    }

    successResponse = (code = '', data='') => {
        this.res.status(code).json({
            status: 'success',
            data: {
                data: data
            }
        });
    }
}