!function () {
    'use strict';

    const gulp = require('gulp'),
        config = require('./gulp.config'),
        taskBundles = require('require-dir')('./tasks'),
        Table = require('cli-table2'),
        colors = require('colors');

    var bundles = new Map();

    /**
     * Uses the loaded modules to create a map of bundles.
     * Each bundle is an object. The properties of bundle are task definitions.
     * Each task definition should contain a doc, run or tasks property.
     */
    for (let name in taskBundles) {
        var tasks = taskBundles[name](gulp, config);
        bundles.set(name, tasks);
    }

    /**
     * Register tasks available in the bundles.
     */
    !function register() {
        bundles.forEach((tasks, bundleName)=> {
            for (let name in tasks) {
                var task = tasks[name];
                if (task.run && !task.tasks) {
                    gulp.task(name, task.run);
                } else if (!task.run && task.tasks) {
                    gulp.task(name, task.tasks);
                } else if (task.run && task.tasks) {
                    gulp.task(name, task.tasks, task.run);
                }

            }
        });

    }();

    /**
     * Generates a table on the CLI with available tasks.
     * @param ignorePrivateTasks Show only public tasks if true, else show all tasks.
     */
    var helpTask = (ignorePrivateTasks)=> {
        console.log('\nAvailable tasks:');
        var head = ['task', 'bundle', 'description', 'dependencies'];
        if(!ignorePrivateTasks) head.splice(2, 0, 'public');
        var table = new Table({
            head: head
        });

        bundles.forEach((tasks, bundleName)=> {

            for (let name in tasks) {
                var isPrivate = name.startsWith('_');
                if (ignorePrivateTasks && isPrivate) continue;
                var task = tasks[name];
                var row = [isPrivate ? name.grey : name.underline, isPrivate ? bundleName.grey : bundleName, task.doc, task.tasks ? task.tasks.join() : ''];
                if(!ignorePrivateTasks){
                    row.splice(2, 0, !isPrivate);
                }
                table.push(row);
            }
        });

        console.log(table.toString());
    };

    gulp.task('help', ()=>helpTask(true));
    gulp.task('help:dev', ()=>helpTask());
}();