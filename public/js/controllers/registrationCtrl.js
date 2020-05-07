ctrls.controller("registerCtrl", function ($scope) {
    console.log("registerCtrl loaded.");

    $scope.register = function () {
        console.log("here inside this login method", $scope.formData)
    }
});