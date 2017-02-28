module.exports = {

    /**
     *
     * @param helper
     * @param done
     */
    mount: function(helper, done) {
        this.helper = helper;
        return done();
    },

    /**
     *
     * @param done
     * @returns {*}
     */
    unmount: function(done) {
        return done();
    }
};