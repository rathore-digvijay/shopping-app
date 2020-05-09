ctrls.controller("purchaseListCtrl", function ($scope, $rootScope, $location, $http) {
    console.log("purchaseListCtrl loaded.");
    console.log($rootScope.userName)
    console.log($rootScope.role)

    if (!$rootScope.userName || !$rootScope.role) {
        console.log("here in check cond")
        $location.path('/login');
    }

    $scope.showGreeting = false;
    $scope.adminLogin = $rootScope.role == "seller" ? true : false;
    $scope.customerLogin = $rootScope.role === "customer" ? true : false;

    $scope.getPurchaseList = function () {
        const data = { "userName" : $rootScope.userName};
        $http.post("/api/getPurchaseList", data)
            .success(function (res) {
                console.log("res purchase list", res);
                if (res.success) {
                    if (res.result.length > 0) {
                        $scope.dataList = res.result;
                    } else {
                        $scope.greeting = "Hi " + $rootScope.userName + ",  Nothing in your purchaseList."
                        $scope.showGreeting = true;
                    }
                } else {
                    return swal("Error", res.errorInfo, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while showing products!", 'error');
            });
    }

    $scope.changeStatus = function (list, status) {
        console.log("product id", list.status, status)
        if ($rootScope.role !== "seller") {
            return swal("Error", "You aren't valid seller.", 'error');
        }
        if (list.status != "Order Requested"){
            return swal("Error", "This order is already "+ list.status, 'error');
        }
        const data = {};
        data.userName = $rootScope.userName;
        data.purchaseId = list._id;
        data.status = status;
        $http.post("/api/changeOrderStatus", data)
            .success(function (res) {
                console.log("res", res);
                if (res.success) {
                    swal("Done", res.result, 'success');
                    $scope.getPurchaseList();
                } else {
                    return swal("Error", res.errorInfo, 'error');
                }
            }).error(function (err) {
                return swal("Error", "Error while Updating status!", 'error');
            });
    }

    $scope.getPurchaseList();
});