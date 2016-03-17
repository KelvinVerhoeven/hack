var app = angular.module('myApp', []);

app.controller('CarCtrl', function ($scope, $http) {

    var count = 0;

    $scope.Send = function (dir) {
        var dataToSend = JSON.stringify({
            "position": dir,
            "time": "21:09:94",
            "naam" : "jonathan"
        });
        $("#textfield").append("<li>" + dir + "</li>");
        count = count + 1;
        if (count > 10) {
            $("#textfield").empty();
            count = 0;
        }

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        $http.post("/direction", dataToSend, config)
        .success(function (data, status, headers, config) {
            console.log("recieved:" + data);

        })
        .error(function (data, status, header, config) {
            console.log("Failed " + data);
            response = data;
        })

    }

});
