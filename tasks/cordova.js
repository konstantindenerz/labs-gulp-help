!function () {
    'use strict';

    module.exports = (gulp, config)=> {
        return {
            '_cordova:clean': {
                doc: 'private cordova clean task description',
                run (){

                }
            },
            '_cordova:sign': {
                doc: 'private cordova sign task description',
                run(){

                }
            },
            'build-cordova': {
                doc: 'build cordova task description',
                tasks: ['_cordova:clean', 'build', '_cordova:sign'],
                run () {

                }
            }
        }
    };

}()
