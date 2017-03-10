/**
 * class TaskPrintDate
 * A plugin module is a simple class that is instantiated when a scenario start.
 * An instance is unique to a node but can have several demand (not only one). However it can stop only
 * one time. The stop method is called when the scenario stop.
 */
class TaskPrintDateModule {

    /**
     * Constructor get the plugin instance and info relative to the module for convenience. It also allow you to use
     * same class to handle multiple module by checking info.id. For this seed we should get "printDate" as id.
     * @param {Object} plugin
     * @param {Object} info - Simple literal object that reflect chewie module package information.
     */
    constructor(plugin, info) {
        this.plugin = plugin;
        this.info = info;
        this.currentDemand = null;
    }

    /**
     * This method is called every new demand coming from the scenario.
     * You need to call done otherwise the scenario cannot stop automatically as your task is never done.
     * @param {Object} options - In this seed example, the task does not have option and will get {}. See the trigger instead.
     * @param {Function} done
     */
    newDemand(options, done) {
        let self = this;

        // we simulate asynchronous treatment. Date is printed after 3 seconds.
        this.currentDemand = setTimeout(function() {
            // you can use native console object but chewie has built-in logger which is more readable.
            self.plugin.helper.logger.info("Today is %s", (new Date()).toDateString());
            return done();
        }, 3000);
    }

    /**
     * Like in plugin instance, stop method is called when the task is done or if the scenario is stopping by user.
     * You should always interrupt your async tasks on stop method to make sure nothing will happens once your module is supposed
     * stopped.
     * @param {Function} done
     */
    stop(done) {
        // we clear the asynchronous task possibly running
        clearTimeout(this.currentDemand);
        done();
    }
}

module.exports = TaskPrintDateModule;