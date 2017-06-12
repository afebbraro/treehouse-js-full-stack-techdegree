var app = angular.module('app', ['ngRoute']);

(function(app) {
    app.controller('mainCtrl', function($scope, dataService) {
        dataService.getRecipes(function(response) {
            console.log(response.data);
            $scope.recipes = response.data;

            // Loop thru recipes as long as there's recipes in the array
            // add each recipe's name to
            // for($scope.recipes.length > 0)
        });

        dataService.getFoodItems(function(response) {
            console.log(response.data);
            $scope.foodItems = response.data;
        });

        dataService.getCategories(function(response) {
            console.log(response.data);
            $scope.categories = response.data;
        });

        dataService.deleteRecipe(function(recipe) {
            dataService.deleteRecipe(recipe);
        });
    });
 })(app);
