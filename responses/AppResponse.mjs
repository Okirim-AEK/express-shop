const AppResponse = (statusCode, data = '') => {
    if (data) {
        return {
        status: 'success',
        statusCode: statusCode,
        data
     }   
    }
    return {
        status: 'success',
        statusCode:statusCode,
    }
}

export default AppResponse;