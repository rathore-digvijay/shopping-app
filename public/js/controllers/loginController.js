ctrls.controller("loginCtrl", function ($scope, $http, $location) {
    console.log("loginCtrl loaded.");

    $scope.login = function () {
        console.log("here inside this login method", $scope.formData);
        if (!$scope.formData || !$scope.formData.userName || !$scope.formData.password) {
            return swal("Error", "Fill the complete details", 'error');
        }
        $http.post("/api/login", $scope.formData)
            .success(function (res) {
                console.log("res", res);
                if (res.success) {
                    $location.path('/dashboard');
                } else {
                    return swal("Error", res.errorInfo, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while Signup", 'error');
            });
    }
});