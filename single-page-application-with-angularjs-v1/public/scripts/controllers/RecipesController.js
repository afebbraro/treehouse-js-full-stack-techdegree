//business logic for the recipes.html template
//The list of recipes can be filtered by the selected category
// When a recipe “Edit” button is clicked, the user
//is taken to the “Recipe Detail” screen, where they can view and edit the details of the recipe.
// Clicking the recipe “Delete” button deleted that recipes.
// Clicking the recipe “Add” button adds a new recipe
app.controller('RecipesController', function($scope, dataService, $location, $rootScope) {
    $scope.addRecipe = function() {
        console.log('add btn clicked');
        $rootScope.headingName = 'Add New';
        $location.path('/add');
    }

    $scope.editRecipe = function() {
        console.log('edit btn clicked');
        $rootScope.headingName = 'Edit';
        $rootScope.editing = !$rootScope.editing;
        console.log($rootScope.editing);
    }
    console.log('recipe controller being used');
});
