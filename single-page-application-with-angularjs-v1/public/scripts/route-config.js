
(function() {
  'use strict';

  // The Angular $routeProvider is used to configure routes for your application.

  // Three routes are configured below:
  // 1) The root of the application "/" which serves up the "Recipes" view.
  // 2) The recipe edit route "/edit/:id" which serves up the "Recipe Detail" view.
  // 3) The recipe add route "/add" which also serves up the "Recipe Detail" view.


  // Set up routes for the "Recipes" and "Recipe Detail" screens:
  // Uncomment the commented-out code in the route-config.js file in the scripts folder
  // The / route will display the "Recipes" screen.
  // The /edit/{id} route will display the "Recipe Detail" screen for the specified recipe ID.
  // The /add route will display the "Recipe Detail" screen (with no data).
  // To create links to the "Recipes" and "Recipe Detail" screens, you can add HTML anchor elements with href attribute values of /#/ and /#/edit/{id} (or /#/add if you want to add a recipe). Be sure to replace {id} with an actual recipe ID from your a record in your database.
  // From your controllers, you can browse to the "Recipes" and "Recipe Detail" screens using the built-in AngularJS $location service's path method. For instance, after a user has saved a recipe using the “Recipe Detail” screen, you can send the user back to the “Recipes” screen with: $location.path('/').
  //


  angular
    .module('app')
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'RecipesController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipes.html'
      })
      .when('/edit/:id', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html'
      })
      .when('/add', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
