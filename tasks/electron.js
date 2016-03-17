!function () {
    'use strict';

    module.exports = (gulp, config)=> {
        return {
            '_electron:clean': {
                doc: 'private electron clean task description',
                run (){

                }
            },
            'build-electron': {
                doc: 'build electron task description',
                tasks:['_electron:clean','build'],
                run () {

                }
            }
        }
    };

}()
