ctrls.controller("dashboardCtrl", function ($scope, $rootScope, $location) {
    console.log("dashboardCtrl loaded.");
    console.log($rootScope.userName)
    console.log($rootScope.role)

    // if(!$rootScope.userName || !$rootScope.role){
    //     $location.path('/login');
    // }

    $scope.greeting = "Hi " + $rootScope.userName + ". Have a good day here!! What you want to do?"
    $rootScope.role = 'seller';
    if ($rootScope.role == "seller") {
        $scope.records = ["A", "B", "C", "D"]
        $scope.list = [
            { "Heading": "Home", "link": "/products" },
            { "Heading": "Add Items", "link": "/addProducts" },
            { "Heading": "Purchase Notification", "link": "" },
        ]
    } else {
        $scope.records = ["AQ", "BQ", "CQ", "DQ"]
        $scope.list = [
            { "Heading": "Home", "link": "/products" },
            { "Heading": "Cart", "link": "" },
            { "Heading": "Purchase", "link": "" }
        ]
    }
    // $scope.login = function () {
    //     console.log("here inside this login method", $scope.formData);
    //     if (!$scope.formData || !$scope.formData.userName || !$scope.formData.password) {
    //         return swal("Error", "Fill the complete details", 'error');
    //     }
    //     $http.post("/api/login", $scope.formData)
    //         .success(function (res) {
    //             console.log("res", res);
    //             if (res.success) {
    //                 $location.path('/dashboard');
    //             } else {
    //                 return swal("Error", res.errorInfo, 'error');
    //             }
    //         }).error(function (err) {
    //             return swal("Error", "Error while Signup", 'error');
    //         });
    // }
});