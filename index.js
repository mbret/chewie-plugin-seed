module.exports = {

    /**
     *
     * @param helper
     * @param done
     */
    mount: function(chewie, helper, done) {
        this.chewie = chewie;
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
