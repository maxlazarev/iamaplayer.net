var jwt         = require('jwt-simple');
var constants   = require('../constants');

module.exports = {
    /**
     * Generates token
     *
     * @param {obj} userData
     * @returns {{token: *, expires: *, user: *}}
     */
    genToken: function(userData) {
        var expireDate = this.setExpirationDate(constants.TOKEN_EXPIRE_DAYS);
        var token = jwt.encode({
            exp: expireDate
        }, constants.TOKEN_SECRET);

        return {
            token: token,
            expires: expireDate,
            user: userData
        };
    },
    /**
     * Sets token expirtation date
     *
     * @param {int} numDays
     * @returns {obj}
     */
    setExpirationDate: function(numDays) {
        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }
};
