 function responseTemplate(statusString, result, language, customMessage) {
    let obj = { status: true, statusString, result, message: "" }
    if (statusString != "OK") {
        obj.status = false;
    }
    if (customMessage) {
        obj.message = customMessage
    }
    if (statusString != "OK") {
        //query and get custom message
        // obj.message = await findMessageByStatus(statusString, language);
    }
    return obj;
}

 


module.exports = {
    responseTemplate
}
