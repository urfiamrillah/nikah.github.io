'use strict';

var app = angular.module('appRouter', ['ngRoute', 'ngAnimate']);
 

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider.when('/', {
    templateUrl: 'home_partial.html'
  }).when('/ceremony', {
    templateUrl: 'ceremony_partial.html'
  }).when('/guest-information', {
    templateUrl: 'guest_information_partial.html'
  }).when('/registries', {
    templateUrl: 'registries_partial.html'
  }).when('/proposal', {
    templateUrl: 'proposal_partial.html'
  }).when('/photos', {
    templateUrl: 'photos_partial.html'
  }).otherwise({
        redirectTo: '/'
  });
 
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);

}]);

app.controller('MainCtrl', ['$scope', function($scope) {

  // Whenever the route changes, reset the page to the top.
  $scope.$on('$routeChangeSuccess', function() {
    $(window).scrollTop(0);
  });


}]);

app.controller('NavController', ['$scope', '$location', function($scope, $location) {

  $scope.$location = $location;
  $scope.active = false;
  $scope.path = $location.path();

  // Whenever the route changes, set the navigation to be closed.
  $scope.$on('$routeChangeSuccess', function() {
    $scope.active = false;
    $scope.path = $location.path(); 
  });

  $scope.toggleActive = function() {
    $scope.active = !$scope.active;
  };

  $scope.closeNav = function() {
    $scope.active = false;
  };

  $scope.openNav = function() {
    $scope.active = true;
  };

  // Add selected route 
  $scope.getClass = function(path) {
    
    // Add leading "/" if necessary
    path = (path[0] === '/' ? path : "/" + path);

    if (path === $location.path()) {
      return "selected";
    }

    return "";
  };

}]);

// Add a directive for magnificPopup
app.directive("magnificPopupGallery", function() {

  return {

    restrict: 'A',

    link: function(scope, element, attrs) {

      $(element).magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
        },
        removalDelay: 300, // Delay in milliseconds before popup is removed
        // Class that is added to body when popup is open. 
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade',
        callbacks: {
          open: function() {
            //console.log("Opened!");
          },
          close: function() {
            //console.log("Closed!");
          }
        }
      });
    }
  };
});



// Wedding Countdown Timer.
app.directive("weddingCountdown", ["$interval", function($interval) {

  return {

    restrict: 'A',

    link: function(scope, element, attrs) {

      // Setup countdown timer
      var $countdown = $(element);
      var target = new Date(attrs.targetTime || '2014-11-08T00:00:00-05:00');
      var countdown_timer;

      var countdown_callback = function() {
      
        var now = new Date();
        var delta = (target - now); // in milliseconds
        var days = delta/(3600.0*24.0*1000.0);
        //console.log("countdown tick. delta: ", delta, " days: ", days);

        if (days > 0) {
          var days_rounded = Math.ceil(days);
          if (days_rounded === 1) {
            $countdown.html("One day to go!");
          } else {
            $countdown.html(days_rounded + " days to go!");
          }
        } else if (days < 0 && days > -1) {
          $countdown.html("It's wedding day!");
        } else {
          $countdown.html("");
          $interval.cancel(countdown_timer);
        }
      };

      countdown_timer =  $interval(countdown_callback, 30*1000.0);
      countdown_callback();
    }
  };

}]);

