ctrls.controller("dashboardCtrl", function ($scope, $rootScope, $location, $http) {
    console.log("dashboardCtrl loaded.");
    console.log($rootScope.userName)
    console.log($rootScope.role)

    // if(!$rootScope.userName || !$rootScope.role){
    //     $location.path('/login');
    // }
    
    $scope.showGreeting = false;
    $rootScope.role = 'customer';
    $scope.adminLogin = $rootScope.role == "seller" ? true : false;
    
    $scope.getProducts = function () {
        $http.get("/api/listProducts")
        .success(function (res) {
                console.log("res", res);
                if(res.success){
                    if(res.result.length > 0){
                        $scope.productList = res.result;
                    }else{
                        $scope.greeting = "Hi " + $rootScope.userName + ". Have a good day here!! What you want to do?"
                        $scope.showGreeting = true;
                    }
                }else{
                    return swal("Error", res.info, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while showing products!", 'error');
            });
    }

    $scope.buyProduct = function (productId) {
        console.log("product id", productId)
        $http.get("/api/listProducts")
            .success(function (res) {
                console.log("res", res);
                if (res.success) {
                    if (res.result.length > 0) {
                        $scope.productList = res.result;
                    } else {
                        $scope.greeting = "Hi " + $rootScope.userName + ". Have a good day here!! What you want to do?"
                        $scope.showGreeting = true;
                    }
                } else {
                    return swal("Error", res.info, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while showing products!", 'error');
            });
    }

    $scope.getProducts();
});