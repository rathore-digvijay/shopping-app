var shoppingApp = angular.module("shoppingApp", ["ui.router", "AppCtrls"])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/login");

        $stateProvider
            
            .state('register', {
                url: "/register",
                templateUrl: "views/register.html",
                data: { pageTitle: '' },
                controller: "registerCtrl",
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                data: { pageTitle: '' },
                controller: "loginCtrl",
            })
            .state("state2", {
                url: "#",
                template: "<p>State 2</p>",
                controller: "Ctrl2"
            });
    });

var ctrls = angular.module("AppCtrls", []);

ctrls.controller("Ctrl2", function ($scope) {
    console.log("Ctrl2 loaded.");
});
