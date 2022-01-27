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
        vm.Fields = jhService.getFieldChecklist();
      };

      vm.changeTitle = () => {
        vm.Errors = [];

        if (vm.Params.formMode == 'ADD') {
          const existItem = vm.Fields.filter(fl => fl.title === vm.Form.title)[0];

          if (existItem) {
            vm.Errors.push('Campo já cadastrado com essa descrição');
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
                    const reg2 = reg[2].replace('\r', '');
                    const fieldType = reg2 == 'livre' ? 'livre' : 'combo';
                    console.log(fieldType)
                    let options = [];
                    if (fieldType == 'combo') {
                      reg2.split('|').forEach(o => {
                        options.push({
                          option_label: o.split('=')[1],
                          option_value: o.split('=')[0]
                        })
                      })
                    }

                    vm.ItensImportar.push({
                      displaykey: reg[0],
                      title: reg[0],
                      fieldName: reg[1],
                      fieldType,
                      options,
                      'metadata#parent_id': 207735
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
