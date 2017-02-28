'use strict';

// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname);

const chewie = require("chewie-system");

// Start the system
chewie.start({
    settings: {
        // Here you are using a custom bootstrap. The custom bootstrap is ran after the system bootstrap. You can set up some tasks before
        // the system is ready.
        bootstrap: function(chewie, done) {
            // this method will automatically reinstall your plugin (delete and then save).
            // Since the plugin is installed at startup it will automatically be mounted.
            chewie.repositoriesHelper.reinstallPluginFromDisk(__dirname + "/..")
                .then(() => done())
                .catch(done);
        },
        // Instead of using default path we use local path so it is possible to have various plugins/hooks projects without conflicts.
        system: {
            tmpDir: "./.chewie/.tmp",
            appDataPath: "./.chewie"
        },
        // This setting ensure your plugin to be always synchronized. Usually if a plugin
        // is mounted with the same package version it's not synchronized again. So you don't have
        // to increment the version every time you test your code. This option is designed for development
        // as it will have more impact on startup time and hard drive access.
        alwaysSynchronizePlugins: true
    }
});