(function () {
'use strict';

    /**
     * @ngInject
     */
    function StateConfig($stateProvider) {
        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'scripts/views/signup/signup-partial.html',
            controller: 'SignupController',
            resolve: {
                SSOClients: function($log, $http, $q, WebConfig) {
                    var dfd = $q.defer();
                    $http.get(WebConfig.api.hostname + '/openid/clientlist/', { cache: true })
                        .success(function(data) {
                            if (data && data.clients) {
                                dfd.resolve(data.clients);
                            } else {
                                $log.error('unexpected result for sso client list:');
                                $log.error(data);
                                dfd.resolve({});
                            }
                        })
                        .error(function(data, status) {
                            $log.error('Failed to fetch SSO client list:');
                            $log.error(status);
                            $log.error(data);
                            dfd.resolve({});
                        });
                    return dfd.promise;
                }
            },
            params: {
                next: undefined,
                nextParams: undefined,
            }
        });
    }

    /**
     * @ngdoc overview
     * @name driver.views
     * @description
     * # driver
     */
    angular
      .module('driver.views.signup', [
        'ui.router',
        'ase.auth'
      ]).config(StateConfig);

})();
