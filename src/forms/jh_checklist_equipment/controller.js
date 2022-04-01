angular.module('jhApp', ['angular.fluig', 'ngAnimate', 'jh.services'])

  .controller('jhController', ['$scope', '$http', '$timeout', '$log', 'formService', 'fluigService', 'jhService', 'erpService', '$compile',
    function jhController($scope, $http, $timeout, $log, formService, fluigService, jhService, erpService, $compile) {
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
        // vm.checkLocal();
        vm.checkRules();
      };

      vm.buscaSerie = (field, input) => {
        if (input.$modelValue && input.$modelValue !== '') {
          vm.Form[field] = erpService.getEmpilhadeira(input.$modelValue)[0];
          if (!vm.Form[field]) {
            // vm.Form[field].B1_COD = null;
            // vm[`${field}_i`] = null;
            FLUIGC.toast({
              title: 'Erro ',
              message: 'Série não encontrada',
              type: 'danger'
            });
          }
        }
      }

      vm.zoomProdLoc = (table, field) => {
        var dataset = "dsContratosLoc";
        var fields = "COD_PRODUTO,Empilhadeira,DESC_PRODUTO,Descrição,TIPO_PRODUTO,tipo,CONTRATO,contrato,COD_CLIENTE,cliente,COD_LOJA,loja,NOME,nome,GRUPO,grupo,NUM_NOTA_SAIDA,NF Saída,DT_REMESSA_NF,Data Saída,NUM_NOTA_ENTRADA,NF Entrada,DT_DEVOLUCAO,Data Entrada,TIPO_CONTRATO,Tipo de Contrato,SIT_MOVIMENTO,Sit. Contrato,STATUS_MOVIMENTO,Status Movimento,BAT_INCLUSA,Bat. Inclusa,ATIVO,Ativo,HORIMETRO,Horimetro";
        //,tipo,AA3_CODPRO,Codigo,AA3_NUMSER,Serie,AA3_MODELO,Modelo,AA4_NSERAC,Acessorio,ATIVO,Ativo";
        var resultfields = "COD_PRODUTO,DESC_PRODUTO,TIPO_PRODUTO,CONTRATO,COD_CLIENTE,COD_LOJA,NOME,GRUPO,NUM_NOTA_SAIDA,DT_REMESSA_NF,DT_REMESSA_NF,NUM_NOTA_ENTRADA,DT_DEVOLUCAO,TIPO_CONTRATO,SIT_MOVIMENTO,STATUS_MOVIMENTO,BAT_INCLUSA,ATIVO,HORIMETRO";
        var title = "Selecione a empilhadeira";
        var filters = "";
        var type = table;
        var likefield = "";
        var likevalue = "";
        var searchby = "concatena";

        console.log(vm.Form[table]);

        if (vm.Form[table] != '' && vm.Form[table] != undefined &&
          vm.Form[table][field] != '' && vm.Form[table][field] != undefined) {
          filters = "concatena," + vm.Form[table][field];
        } else {
          vm.Form[table] = "";
        }

        type += '_i';

        tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby);
      }

      vm.zoomEmpilhadeira = (table, field) => {
        var dataset = "DSEMPILHADEIRAPROT";

        var fields = "B1_COD,Empilhadeira,B1_DESC,Descrição,B1_TIPO,Tipo,ATIVO,Ativo";
        var resultfields = "B1_COD,B1_DESC,B1_TIPO,ATIVO";
        var title = "Selecione a Empilhadeira";
        var filters = "";
        var type = table;
        var likefield = "";
        var likevalue = "";
        var searchby = "concatena";

        console.log(vm.Form[table]);

        if (vm.Form[table] != '' && vm.Form[table] != undefined &&
          vm.Form[table][field] != '' && vm.Form[table][field] != undefined) {
          filters = "concatena," + vm.Form[table][field];
        } else {
          vm.Form[table] = "";
        }

        type += '_i';

        tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby);
      }

      vm.zoomClientes = (table, field) => {
        var dataset = "dsClienteProt";
        var fields = "codigo,Codigo,loja,Loja,nome,Nome";
        var resultfields = "codigo,loja,nome";
        var title = "Clientes";
        var filters = "";
        var type = table;
        var likefield = "";
        var likevalue = "";
        var searchby = "filtro";

        if (vm.Form[table] != "" && vm.Form[table] != undefined &&
          vm.Form[table][field] != "" && vm.Form[table][field] != undefined) {
          filters = "filtro," + vm.Form[table][field];
        } else {
          vm.Form[table] = "";
        }

        type += '_i';

        tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby);
      }

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
        vm.FieldChecklist = jhService.getFieldChecklist(null, ['documentid', 'title', 'fieldName', 'fieldType', 'fieldFormat']);
        vm.ImageChecklist = jhService.getImageChecklist(null, ['documentid', 'title', 'help']);
        vm.ItemChecklist = jhService.getItemChecklist(null, ['documentid', 'title', 'instruction', 'acceptanceCriteria']);

        vm.GroupEquipment = jhService.getGroupEquipment();
        vm.FieldOptions = jhService.getFieldOptions();
        vm.ItemFields = jhService.getChecklistFields();

        vm.GroupFields = jhService.getGroupFields();
        vm.GroupImages = jhService.getGroupImages();
        vm.GroupItems = jhService.getGroupItem();
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
        vm.Form.itemFields = [];

        if (vm.Form.equipment && vm.Form.equipment.documentid) {
          // vm.Form.groups = jhService.getGroupEquipment(vm.Form.equipment.documentid);
          vm.Form.groups = vm.GroupEquipment.filter(g => g.documentid == vm.Form.equipment.documentid);
          vm.Form.groups.forEach(group => {
            group.group = group.group_group;
            let fields = (group.group.groupType == 'fields') ? vm.GroupFields.filter(g => g.documentid == group.groupId) : [];
            let images = (group.group.groupType == 'images') ? vm.GroupImages.filter(g => g.documentid == group.groupId) : [];
            let checklist = (group.group.groupType == 'checklist') ? vm.GroupItems.filter(g => g.documentid == group.groupId) : [];

            fields.forEach(field => {
              field.field = vm.FieldChecklist.filter(f => f.documentid == field.field_field.documentid)[0]; //field.field_field;
              // let options = jhService.getFieldOptions(field.field.documentid);
              let options = vm.FieldOptions.filter(f => f.documentid == field.field.documentid);

              options.forEach(option => {
                option.label = option.option_label;
                option.value = option.option_value;
              });

              vm.Form.options = vm.Form.options.concat(options);
            });
            images.forEach(image => {
              image.image = vm.ImageChecklist.filter(i => i.documentid == image.image_image.documentid)[0]; //image.image_image;
            });
            checklist.forEach(item => {
              item.item = vm.ItemChecklist.filter(i => i.documentid == item.item_item.documentid)[0]; //item.item_item;
              // let itemFields = jhService.getChecklistFields(item.item.documentid);
              let itemFields = vm.ItemFields.filter(f => f.documentid == item.item.documentid);

              itemFields.forEach(field => {
                field.label = field.field_label;
                field.pre = field.field_pre;
                field.pos = field.field_pos;
              });

              vm.Form.itemFields = vm.Form.itemFields.concat(itemFields);
            });

            vm.Form.fields = vm.Form.fields.concat(fields);
            vm.Form.images = vm.Form.images.concat(images);
            vm.Form.checklist = vm.Form.checklist.concat(checklist);
          });
        }
      }

      vm.upload = (obj, desc) => {
        JSInterface.showCamera(desc);
        if (vm.Params.mobile) {
          obj.docDesc = desc;
        }
        else {
          parent.ECM.attachmentTable.on('change', () => {

            var load = FLUIGC.loading(window);

            load.show();

            var timer = setInterval(() => {

              $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {

                console.log("Id >>>" + attachment.id);
                console.log("Name >>> " + attachment.name);
                console.log("Description >>> " + attachment.description);

                if (attachment.description == desc) {

                  obj.docDesc = desc;

                  $scope.$apply();

                  $(window.top.document).find('#attachmentsStatusTab').trigger('click');

                  load.hide();

                  clearInterval(timer);
                }

              });

            }, 1000);

          });
        }
      }

      vm.deleteFile = (obj, desc) => {
        if (vm.Params.mobile) {
          obj.docDesc = null;
        } else {
          $.each(parent.ECM.attachmentTable.getData(), function (i, attachment) {
            var attachmentDescription = attachment.description;
            if (attachmentDescription == obj.docDesc) {
              parent.WKFViewAttachment.removeAttach([i]);
            }
          });
          obj.docDesc = null;
        }
      }

      vm.openDocument = (docId, docVersion) => {
        var parentOBJ;

        if (window.opener) {
          parentOBJ = window.opener.parent;
        } else {
          parentOBJ = parent;
        }

        var cfg = {
          url: "/ecm_documentview/documentView.ftl",
          maximized: true,
          title: "Visualizador de Documentos",
          callBack: function () {
            parentOBJ.ECM.documentView.getDocument(docId, docVersion);
          },
          customButtons: []
        };

        parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
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

function setSelectedZoomItem(row) {
  console.log(row);
  angular.element("form").scope().vm.Form[row.inputId.replace('_i', '')] = row;
  // angular.element("form").scope().vm[row.inputId] = 
  angular.element("form").scope().$apply();
}