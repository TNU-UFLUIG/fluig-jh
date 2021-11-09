angular.module('jhApp', ['angular.fluig', 'ngAnimate', 'jh.services', 'jh.directives'])

  .controller('jhController', ['$scope', '$http', '$timeout', '$log', 'formService', 'fluigService', '$compile',
    function jhController($scope, $http, $timeout, $log, formService, fluigService, $compile) {
      const vm = this;

      if (window.location.hostname == 'localhost') {
        angular.forEach(angular.element('[tablename]'),
          (value) => {
            const table = angular.element(value);
            angular.forEach(table.find('tbody'), tbody => {
              angular.element(tbody)
                .attr('ng-non-bindable', null);
              $compile(table)($scope);
            })
          });
      }

      formService.updateForm($scope, vm)
        .then(() => {
          vm.start();
        });

      vm.start = function start() {
        vm.checkLocal();
      };

      vm.removeChild = function removeChild(Array, item) {
        FLUIGC.message.confirm({
          message: 'Deseja excluir esse registro?',
          title: 'Excluir'
        }, (result) => {
          if (result) {
            Array.splice(Array.indexOf(item), 1);
            $scope.$apply();
          }
        });
      };

      vm.checkLocal = function checkLocal() {
        if (window.location.hostname == 'localhost') {
          vm.Params = {
            edit: true,
            user: 'admin',
            formMode: 'ADD' // MOD
          };

          $http.get('/src/forms/partials/data.json').then(result => {
            vm.FieldChecklist = result.data.jh_field_checklist;
            vm.GroupChecklist = result.data.jh_group_checklist;
            vm.ImageChecklist = result.data.jh_image_checklist;
            vm.ItemChecklist = result.data.jh_item_checklist;
          })
        }
      }

    }
  ])
  .directive('contenteditable', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, elm, attr, ngModel) {

        function updateViewValue() {
          ngModel.$setViewValue(this.innerHTML);
        }
        //Binding it to keyup, lly bind it to any other events of interest 
        //like change etc..
        elm.on('keyup', updateViewValue);

        scope.$on('$destroy', function () {
          elm.off('keyup', updateViewValue);
        });

        ngModel.$render = function () {
          elm.html(ngModel.$viewValue);
        }

      }
    }
  })
