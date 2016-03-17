!function () {
    'use strict';

    module.exports = (gulp, config)=> {
        return {
            clean: {
                doc: 'clean task description',
                run (){

                }
            },
            build: {
                doc: 'build task description',
                run () {

                }
            },
            default: {
                doc: 'default task description',
                tasks: ['clean', 'build']
            }
        }
    };

}()
