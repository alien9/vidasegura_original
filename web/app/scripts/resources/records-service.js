(function () {
    'use strict';

    /* ngInject */
    function Records($resource, Config) {
        return $resource(Config.api.hostname + '/api/records/:id/', {id: '@uuid'}, {
            create: {
                method: 'POST'
            },
            get: {
                method: 'GET'
            },
            query: {
                method: 'GET',
                transformResponse: function(data) { return angular.fromJson(data).results; },
                isArray: true
            },
            update: {
                method: 'PATCH'
            }
        });
    }

    angular.module('driver.resources')
    .factory('Records', Records);

})();
