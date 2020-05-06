// var shoppingApp = angular.module("shoppingApp", []);

// shoppingApp.config(function () {
//     console.log("config")
// });

// shoppingApp.config(['$controllerProvider', function ($controllerProvider) {
//     $controllerProvider.allowGlobals();
// }]);

// shoppingApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
//     // Redirect any unmatched url
//     $urlRouterProvider.otherwise("/login.html");

//     $stateProvider
//         //register
//         .state('register', {
//             url: "/register",
//             templateUrl: "views/register.html",
//             data: { pageTitle: '' },
//             controller: "registerCtrl",
//         })
// }]);


var shoppingApp = angular.module("shoppingApp", ["ui.router", "AppCtrls"])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('about', {
                url: "/about",
                templateUrl: "views/about.html",
                data: { pageTitle: '' },
                controller: "aboutCtrl",
            })
            .state("state2", {
                url: "#",
                template: "<p>State 2</p>",
                controller: "Ctrl2"
            });
    });

var ctrls = angular.module("AppCtrls", []);

ctrls.controller("aboutCtrl", function ($scope) {
    console.log("aboutCtrl loaded.");
});

ctrls.controller("Ctrl2", function ($scope) {
    console.log("Ctrl2 loaded.");
});
