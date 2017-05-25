var app = angular.module('app', ['ngRoute'])
.controller('mainCtrl', function($scope, dataService) {

    $scope.helloWorld = dataService.helloWorld;

    dataService.getRecipes(function(response) {
        console.log(response.data);
        $scope.recipes = response.data;
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
})
.controller('RecipesController', function($scope, dataService) {
    //The list of recipes can be filtered by the selected category
    // When a recipe “Edit” button is clicked, the user is
    // taken to the “Recipe Detail” screen, where they can
    // view and edit the details of the recipe.
    // Clicking the recipe “Delete” button deleted that recipes.
    // Clicking the recipe “Add” button adds a new recipe
})
.controller('RecipeDetailController', function($scope, dataService){
    // Add or update a recipe. Allow the user to provide the following values::
    // Name (text box)
    // Description (multi-line text box)
    // Category (select list)
    // Prep Time (text box)
    // Cook Time (text box)
    // Add one or more ingredients and steps to a recipe.
    // The user should be able to provide the following values:
    // Item (select list)
    // Condition (text box)
    // Quantity (text box)
    // Add a step to a recipe. The user should be
    // able to provide the following values:
    // Description (text box)
});
