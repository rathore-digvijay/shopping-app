ctrls.controller("registerCtrl", function ($scope, $http, $location) {
    console.log("registerCtrl loaded.");

    $scope.register = function () {
        // console.log("here inside this login method", $scope.formData)
        if (!$scope.formData || !$scope.formData.role || !$scope.formData.userName || !$scope.formData.password) {
            return swal("Error", "Fill the complete form", 'error');
        }
        $http.post("/api/registration", $scope.formData)
            .success(function (res) {
                console.log("res", res);
                if(res.success){
                    swal("Success", res.result, "success");
                    $location.path('/login');
                }else{
                    return swal("Error", res.errorInfo, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while Signup", 'error');
            });
    }
});