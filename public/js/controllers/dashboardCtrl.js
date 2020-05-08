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
                    return swal("Error", res.errorInfo, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while showing products!", 'error');
            });
    }

    $scope.buyProduct = function (productId) {
        console.log("product id", productId)
        if($rootScope.role !== "customer"){
            return swal("Error", "You aren't valid customer.", 'error');
        }
        const data = {};
        data.productId = productId;
        data.customer = $rootScope.userName;
        $http.post("/api/placeOrder", data)
            .success(function (res) {
                console.log("res", res);
                if (res.success) {
                    return swal("Done", res.result, 'success');
                } else {
                    return swal("Error", res.errorInfo, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while showing products!", 'error');
            });
    }

    $scope.getProducts();
});