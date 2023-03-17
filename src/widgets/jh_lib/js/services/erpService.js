angular.module('jh.services')
  .factory('erpService', ['$http', '$log', 'fluigService',
    ($http, $log, fluigService) => ({

      getProdutoSaldo: (empresa, filial, codigo) => {
        const constraints = [];
        let dataset;

        constraints.push(DatasetFactory.createConstraint('empresa', empresa, empresa, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('filial', filial, filial, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));

        try {
          dataset = DatasetFactory.getDataset('protheus_consulta_armazem_saldo', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },
      getArmazem: () => {
        const constraints = [];
        let dataset;

        try {
          dataset = DatasetFactory.getDataset('protheus_consulta_local', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },

      /**
       * Retorna os estabelecimentos cadastrados no ERP
       *
       * @param {string} cod_empresa
       * @returns
       */
      getEstabelecimento: function getEstabelecimento(codigo) {
        const constraints = [];
        let dataset;

        if (codigo) {
          constraints.push(DatasetFactory.createConstraint('codigo', codigo, codigo, ConstraintType.MUST));
        }

        try {
          dataset = DatasetFactory.getDataset('jh_erp_consulta_estabelecimento', null, constraints)
            .values;
        } catch (error) {
          $log.error(error);
        }

        return fluigService.fixDataset(dataset, null, true);
      },
      getProduto: (codigo, fields) => {
        return fluigService.getDataset('protheus_consulta_produto', {
          codigo
        }, fields, null, true);
      },
      getEmpFilial: (fields) => {
        return fluigService.getDataset('dsEmpFilial', {
        }, fields, null, true);
      },
      getContratoLoc: (serie, fields) => {
        return fluigService.getDataset('dsContratosLoc', {
          serie
        }, fields, null, true);
      },
      getEmpilhadeira: (filtro, fields) => {
        return fluigService.getDataset('dsempilhadeiraProt', {
          filtro
        }, fields, null, true);
      },
      getEndereco: (filtro, fields) => {
        return fluigService.getDataset('protheus_consulta_endereco', {
          filtro
        }, fields, null, true);
      }
    })
  ]);
