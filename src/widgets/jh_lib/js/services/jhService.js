angular.module('jh.services')
  .factory('jhService', ['$q', '$http', '$log', 'fluigService',
    ($q, $http, $log, fluigService) => ({

      getPrestacaoContas: function getPrestacaoContas(displaykey, fields) {
        return fluigService.getDataset('jh_prestacao_contas', {
          displaykey,
        }, fields);
      }

    })
  ]);
