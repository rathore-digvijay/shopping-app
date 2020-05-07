ctrls.controller("loginCtrl", function ($scope) {
    console.log("loginCtrl loaded.");

    $scope.login = function () {
        console.log("here inside this login method", $scope.formData)
    }
});