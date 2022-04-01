angular.module('jhApp', ['angular.fluig', 'ngAnimate', 'jh.services', 'jh.directives', 'ui.sortable'])

  .controller('jhController', ['$scope', '$http', '$timeout', '$log', 'formService', 'fluigService', '$compile', 'jhService',
    function jhController($scope, $http, $timeout, $log, formService, fluigService, $compile, jhService) {
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
        vm.sortableOptions = {
          handle: '.handle'
        };

        vm.checkLocal();
        vm.Itens = jhService.getItemChecklist(null, ['documentid', 'title']);
        vm.Images = jhService.getImageChecklist(null, ['documentid', 'title']);
        vm.Fields = jhService.getFieldChecklist(null, ['documentid', 'title']);
        vm.Groups = jhService.getGroupChecklist();
        if (vm.Params.formMode == 'ADD') {
          vm.Form.fields.push({});
        } else {
          vm.Form.checklist.forEach(item => {
            item.item = vm.Itens.filter(i => i.documentid == item.item.documentid)[0];
          })
          vm.Form.images.forEach(image => {
            image.image = vm.Images.filter(i => i.documentid == image.image.documentid)[0];
          })
          vm.Form.fields.forEach(field => {
            field.field = vm.Fields.filter(f => f.documentid == field.field.documentid)[0];
          })
        }
      };

      vm.changeTitle = () => {
        vm.Errors = [];

        if (vm.Params.formMode == 'ADD') {
          const existItem = vm.Groups.filter(gr => gr.title === vm.Form.title)[0];

          if (existItem) {
            vm.Errors.push('Grupo já cadastrado com essa descrição');
          }
        }
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
