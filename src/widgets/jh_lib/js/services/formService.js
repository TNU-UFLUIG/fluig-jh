angular.module('jh.services')
  .factory('formService', ['$q', '$http', '$compile', '$timeout', '$log', 'globalService',
    ($q, $http, $compile, $timeout, $log, globalService) => ({
      /**
       * Atualiza os dados do formulário com as informações recebidas pelo Fluig
       *
       * @param {any} scope
       * @param {any} fields
       */
      updateForm: function updateForm(scope, vm) {
        const loading = FLUIGC.loading('body');

        angular.element('form')
          .hide();

        loading.show();

        const defer = $q.defer();

        scope.$watch('$viewContentLoaded', () => {
          vm.Form = {};
          vm.Errors = [];

          this.updateChildren(scope, vm);

          if (angular.element('#Params')
            .val() !== '') {
            vm.Params = angular.fromJson(angular.element('#Params')
              .val());
          } else {
            vm.Params = {
              edit: true,
              etapa: 'inicio'
            };
          }

          const fields = [];

          angular.forEach(angular.element('[ng-value]'), (value) => {
            const a = angular.element(value);

            if (a.attr('name')) {
              const name = a.attr('name');
              const jstype = a.attr('jstype');

              // $log.log('jstype', name, jstype);
              if (fields.indexOf(name) < 0) {
                fields.push(name);
                const element = angular.element(`[name='${name}']`);

                if (element.val() !== '') {
                  vm.Form[name] = this.jsval(jstype, element.val());
                  // jstype === 'text' ? element.val() :
                  //   globalService.isJson(element.val()) ?
                  //     angular.fromJson(element.val()) :
                  //     element.val();
                }
              }
            }
          });

          parent.$('body')
            .find('#ecm-cardPublisher-principal')
            .css('height', '100%');
          parent.$('.feedback-btn')
            .hide();

          scope.processDefinition =
            parent.ECM && parent.ECM.workflowView ? parent.ECM.workflowView.processDefinition : {};

          defer.resolve();
          loading.hide();
          $timeout(() => {
            angular.element('form')
              .fadeIn();
          });
        });

        return defer.promise;
      },

      updateChildren: function updateChildren(scope, vm) {
        angular.forEach(angular.element('[tablename]'),
          (value) => {
            const table = angular.element(value);

            const tablename = table.attr('tablename');

            vm.Form[tablename] = [];

            angular.forEach(table.find('tbody tr'), child => {
              const childElement = angular.element(child);

              if (childElement.attr('detail')) {
                childElement.attr('style', null);
                childElement.attr('detail', null);
                childElement.attr('detailname', null);

                angular.forEach(childElement
                  .find('[name]'), field => {
                    const fieldElement = angular.element(field);
                    fieldElement.attr('name', fieldElement.attr('name') + '___{{$index+1}}')
                  });
              } else {
                let obj = {};
                angular.forEach(childElement
                  .find('[name]'), field => {

                    const element = angular.element(field);
                    if (element.attr('ng-value')) {
                      const name = element.attr('name')
                        .split('_')[1];
                      const jstype = element.attr('jstype');

                      // $log.log('jstype', name, jstype);

                      if (name) {
                        obj[name] = this.jsval(jstype, element.val());
                        // obj[name] = globalService.isJson(element.val()) ?
                        //   angular.fromJson(element.val()) :
                        //   element.val();
                      }
                    }
                  });

                vm.Form[tablename].push(obj);
                childElement.remove();

              }

            });

            angular.forEach(table.find('tbody'), tbody => {
              angular.element(tbody)
                .attr('ng-non-bindable', null);
            })

            angular.forEach(table.find('.bpm-mobile-column'), value => {
              const bpmColumn = angular.element(value);
              const tdContent = bpmColumn.find('.td-content')[0];
              $log.log(bpmColumn)
              if (tdContent) {
                const tdContentElement = angular.element(tdContent);
                $log.log(tdContentElement.html());
                bpmColumn.class = '';
                bpmColumn.html(tdContentElement.contents());
              }
            });
            $compile(table)(scope);
          });
      },
      jsval: (type, val) => {
        let jsval = '';

        switch (type) {
          case 'text':
            jsval = val;
            break;
          default:
            jsval = globalService.isJson(val) ?
              angular.fromJson(val) :
              val;
            break;
        }

        return jsval;
      }
    })
  ]);
