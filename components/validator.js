/**
 * Validates email adresses
 *
 * @param {str} email
 * @returns {bool}
 */
module.exports.email = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};
