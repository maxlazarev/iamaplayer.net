var jwt = require('jwt-simple');
module.exports = {
    /**
     * Generates token
     *
     * @param {obj} userData
     * @returns {{token: *, expires: *, user: *}}
     */
    genToken: function(userData) {
        var expireDate = this.setExpirationDate(global.TOKEN_EXPIRE_DAYS);
        var token = jwt.encode({
            exp: expireDate
        }, global.TOKEN_SECRET);

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
     */
    setExpirationDate: function(numDays) {
        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }
}