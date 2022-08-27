module.exports = function isValideJson(body) {
    try {
        JSON.parse(body);
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
}