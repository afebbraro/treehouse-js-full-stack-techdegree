// The base URL for the REST API is http://localhost:5000/.
angular.module('app').
service('dataService', function($http) {
    // GET /api/recipes - Gets all of the recipes.
    this.getRecipes = function(callback) {
        $http.get('/api/recipes')
        .then(callback);
    }

    // POST /api/recipes - Adds a recipe.
    // this.getRecipes = function(callback) {
    //     $http.post('/api/recipes', data)
    //     .then(callback);
    // }

    // GET /api/categories - Gets all of the categories.
    this.getCategories = function(callback) {
        $http.get('/api/categories')
        .then(callback);
    }

    // GET /api/fooditems - Gets all of the food items.
    this.getFoodItems = function(callback) {
        $http.get('/api/fooditems')
        .then(callback);
    }


    // GET /api/recipes?category={category} - Gets all of the recipes for the specified category.
    // this.getRecipes = function(callback) {
    //     $http.get('/api/recipes?category={category}')
    //     .then(callback);
    // }

    // GET /api/recipes/{id} - Gets the recipe for the specified ID.
    // this.getCategories = function(callback) {
    //     $http.get('/api/{id}')
    //     .then(callback);
    // }

    // PUT /api/recipes/{id} - Updates the recipe for the specified ID.
    // this.getFoodItems = function(callback) {
    //     $http.put('/api/{id}', data)
    //     .then(callback);
    // }

    // DELETE /api/recipes/{id} - Deletes the recipe for the specified ID.
    this.deleteRecipe = function(callback) {

        console.log('the' + 'has been deleted!');
        // $http.delete('/api/{id}')
        // .then(callback);
    }
})
