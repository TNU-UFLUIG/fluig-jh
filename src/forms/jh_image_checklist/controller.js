angular.module('jhApp', ['angular.fluig', 'ngAnimate', 'jh.services', 'jh.directives', 'ngFileUpload'])

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
        vm.checkLocal();
        vm.Images = jhService.getImageChecklist();
        if (vm.Params.formMode == 'ADD') {
          vm.Form.fields.push({});
        }
      };

      vm.changeTitle = () => {
        vm.Errors = [];

        if (vm.Params.formMode == 'ADD') {
          const existItem = vm.Images.filter(im => im.title === vm.Form.title)[0];

          if (existItem) {
            vm.Errors.push('Imagem já cadastrada com essa descrição');
          }
        }
      };

      vm.readFile = function readFile(file) {
        if (file) {
          vm.ItensImportar = [];
          const reader = new FileReader();
          reader.readAsText(file, 'UTF-8');
          reader.onload = function (evt) {
            $scope.$apply(() => {
              const lines = evt.target.result.split('\n');

              lines.forEach((line) => {
                if (line !== '') {
                  const reg = line.split(';');
                  console.log(reg);
                  let exist = vm.ItensImportar.filter(i => i.title == reg[0])[0];
                  if (!exist) {
                    vm.ItensImportar.push({
                      displaykey: reg[0],
                      title: reg[0],
                      help: reg[1],
                      'metadata#parent_id': 3438 //207753
                    })
                  }
                }
              });
            });
          };
          reader.onerror = function (evt) {
            console.log('error reading file', evt);
          };
        }
      };

      vm.importar = () => {
        vm.ItensImportar.forEach(item => {
          fluigService.newCard(item).then(result => {
            console.log(result);
          })
        })
      }

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
