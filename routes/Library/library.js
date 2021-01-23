module.exports = {
    express: require('express'),
    errorData: require('../ERROR/errorcode'),
    router: require('express').Router(),
    db: require('../DATABASE/db'),
    bcrypt: require('bcrypt'),
    uuid: require('uuid'),
    jwt:require('jsonwebtoken'),
    async:require('async'),
    csv:require('csv-parser'),
    fs:require('fs'),
    authorization: require('../Auth/tokenValidation'),
    bodyContentValidation: require('../Validation/bodyValidation'),
}