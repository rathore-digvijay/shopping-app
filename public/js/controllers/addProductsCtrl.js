ctrls.controller("addProductsCtrl", function ($scope, $rootScope, $location, $http) {
    console.log("addProductsCtrl loaded.");
    console.log($rootScope.userName)
    console.log($rootScope.role)

    if(!$rootScope.userName || !$rootScope.role){
        $location.path('/login');
    }


    $scope.submitProduct = function () {
        if (!$scope.formData || !$scope.formData.productName || !$scope.formData.price) {
            return swal("Error", "Fill the complete product details", 'error');
        }
        const data = {};
        data.productName = $scope.formData.productName;
        data.price = $scope.formData.price;
        data.description = $scope.formData.description || "";
        data.userName = $rootScope.userName || "Admin";
        console.log("data");
        $http.post("/api/addProduct", data)
            .success(function (res) {
                console.log("res", res);
                if (res.success) {
                    const msg = "Your product " + $scope.formData.productName+ " is listed for sale."
                    swal("Product Listed", msg, "success");
                    $location.path('/dashboard');
                } else {
                    return swal("Error", res.errorInfo, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while adding products!", 'error');
            });
    }

});