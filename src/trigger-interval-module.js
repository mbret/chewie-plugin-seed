/**
 * class TaskPrintDate
 * @see task-print-date.js.
 */
class TriggerIntervalModule {

    /**
     * @see task-print-date.js.
     * @param {Object} plugin
     * @param {Object} info
     */
    constructor(plugin, info) {
        this.plugin = plugin;
        this.info = info;
        this.currentInterval = null;
    }

    /**
     * @see task-print-date.js.
     * @param {Object} options
     * @param {Function} trigger
     * @param {Function} done - We do not need to call done here as the trigger is supposed to run continuously (interval).
     * We could have a timeout instead of interval and in this case after the timeout is done, we would call the done() function.
     */
    newDemand(options, trigger, done) {
        let self = this;

        // we simulate asynchronous treatment. Date is printed after 3 seconds.
        this.currentInterval = setInterval(function() {
            // you can use native console object but chewie has built-in logger which is more readable.
            self.plugin.helper.logger.info("Today is %s", (new Date()).toDateString());
            return trigger();
        }, options.interval);
    }

    /**
     * @see task-print-date.js.
     * @param {Function} done
     */
    stop(done) {
        // we clear the asynchronous task possibly running
        clearInterval(this.currentInterval);
        done();
    }
}

module.exports = TriggerIntervalModule;