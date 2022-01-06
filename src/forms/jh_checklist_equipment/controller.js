angular.module('jhApp', ['angular.fluig', 'ngAnimate', 'jh.services'])

  .controller('jhController', ['$scope', '$http', '$timeout', '$log', 'formService', 'fluigService', 'jhService', '$compile',
    function jhController($scope, $http, $timeout, $log, formService, fluigService, jhService, $compile) {
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
        vm.checkRules();
      };

      vm.checkRules = function checkRules() {
        vm.etapas = ['consulta', 'inicio', 'revisarSolicitacao', 'analisarErros'];

        vm.regras = {};
        [
          { regra: 'showProudutos', def: true, etapas: vm.etapas },
          { regra: 'showHeader', def: true, etapas: vm.etapas },
          { regra: 'showDestino', def: true, etapas: ['consulta', 'destinarMaterial', 'analisarErros'] },
          { regra: 'enableProdutos', def: true, etapas: ['inicio', 'destinarMaterial', 'analisarErros'] },
          { regra: 'enableDestino', def: true, etapas: ['destinarMaterial', 'analisarErros'] }
        ].forEach(o => {
          vm.regras[o.regra] = vm.Params.user == "adminx" && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });

        if (vm.Params.etapa == 'inicio') {
          vm.Form.solicitante = fluigService.getUsuarios(vm.Params.user)[0];
          vm.Form.requestDate = new Date().getTime();
        }

        vm.Equipments = jhService.getEquipment();
        vm.GroupChecklist = jhService.getGroupChecklist();
        vm.FieldChecklist = jhService.getFieldChecklist();
        vm.ImageChecklist = jhService.getImageChecklist();
        vm.ItemChecklist = jhService.getItemChecklist();
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

      vm.changeEquipment = () => {

        console.log('changeEquipment');

        vm.Form.fields = [];
        vm.Form.images = [];
        vm.Form.checklist = [];
        vm.Form.options = [];

        if (vm.Form.equipment && vm.Form.equipment.documentid) {
          vm.Form.groups = jhService.getGroupEquipment(vm.Form.equipment.documentid);
          vm.Form.groups.forEach(group => {
            group.group = group.group_group;
            let fields = (group.group.groupType == 'fields') ? jhService.getGroupFields(group.groupId) : [];
            let images = (group.group.groupType == 'images') ? jhService.getGroupImages(group.groupId) : [];
            let checklist = (group.group.groupType == 'checklist') ? jhService.getGroupItem(group.groupId) : [];

            fields.forEach(field => {
              field.field = field.field_field;
              let options = jhService.getFieldOptions(field.field.documentid);
              options.forEach(option => {
                option.label = option.option_label;
                option.value = option.option_value;
              });

              vm.Form.options = vm.Form.options.concat(options);
            });
            images.forEach(image => {
              image.image = image.image_image;
            });
            checklist.forEach(item => {
              item.item = item.item_item;
            });

            vm.Form.fields = vm.Form.fields.concat(fields);
            vm.Form.images = vm.Form.images.concat(images);
            vm.Form.checklist = vm.Form.checklist.concat(checklist);
          });
        }
      }

      vm.checkLocal = function checkLocal() {
        if (window.location.hostname == 'localhost') {
          vm.Params = {
            edit: true,
            etapa: "destinarMaterial", // destinarMaterial
            user: 'admin',
            formMode: 'MOD' // MOD
          };

          $http.get('/src/forms/partials/data.json').then(result => {
            vm.FieldChecklist = result.data.jh_field_checklist;
            vm.GroupChecklist = result.data.jh_group_checklist;
            vm.ImageChecklist = result.data.jh_image_checklist;
            vm.ItemChecklist = result.data.jh_item_checklist;
            vm.Equipments = result.data.jh_equipment;
          })

          vm.Form.solicitante = { nome: "ALEX FERREIRA" };
        }
      }

    }
  ]);
