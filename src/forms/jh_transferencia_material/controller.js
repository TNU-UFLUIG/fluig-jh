angular.module('jhApp', ['angular.fluig', 'ngAnimate', 'jh.services'])

  .controller('jhController', ['$scope', '$http', '$timeout', '$log', 'formService', 'fluigService', '$compile', 'erpService',
    function jhController($scope, $http, $timeout, $log, formService, fluigService, $compile, erpService) {
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
        vm.etapas = ['consulta', 'inicio', 'destinarMaterial', 'revisarSolicitacao', 'analisarErros'];

        vm.regras = {};
        [
          { regra: 'showProudutos', def: true, etapas: vm.etapas },
          { regra: 'showHeader', def: true, etapas: vm.etapas },
          { regra: 'showFilial', def: true, etapas: vm.etapas },
          { regra: 'showDestino', def: true, etapas: ['consulta', 'destinarMaterial', 'analisarErros'] },
          { regra: 'showOrigem', def: true, etapas: ['consulta', 'inicio', 'destinarMaterial', 'analisarErros'] },
          { regra: 'enableProdutos', def: true, etapas: ['inicio', 'destinarMaterial', 'analisarErros'] },
          { regra: 'enableOrigem', def: true, etapas: ['analisarErros'] },
          { regra: 'enableDestino', def: true, etapas: ['destinarMaterial', 'analisarErros'] }
        ].forEach(o => {
          vm.regras[o.regra] = vm.Params.user == "adminx" && vm.Params.edit ? true : o.etapas.indexOf(vm.Params.etapa) >= 0 ? o.def : false;
        });

        if (vm.Params.etapa == 'inicio') {
          vm.Form.solicitante = fluigService.getUsuarios(vm.Params.user)[0];
          vm.Form.requestDate = new Date().getTime();
          vm.Form.materiais.push({});
        }
        vm.Armazens = erpService.getArmazem();
        vm.Filiais = erpService.getEmpFilial();
        vm.Empresas = [...new Set(vm.Filiais.map(f => f.empresa))].map(e => { return { empresa: e } })
      }

      vm.changeEmpresa = () => {
        vm.EmpFiliais = vm.Filiais.filter(f => f.empresa == vm.Form.empresa.empresa);
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

      vm.removeSelecionados = (Array) => {
        const selecionados = Array.filter(m => m.seleciona);
        if (selecionados.length == 0) {
          FLUIGC.message.error({
            message: 'Selecione os materiais que deseja direcionar',
            title: 'Oops'
          });
          return;
        }

        FLUIGC.message.confirm({
          message: 'Deseja excluir os registros selecionados?',
          title: 'Excluir'
        }, (result) => {
          if (result) {
            selecionados.forEach(item => {
              Array.splice(Array.indexOf(item), 1);
            });

            $scope.$apply();
          }
        });
      }

      vm.alteraSelecionados = () => {
        const selecionados = vm.Form.materiais.filter(m => m.seleciona);
        if (selecionados.length == 0) {
          FLUIGC.message.error({
            message: 'Selecione os materiais que deseja direcionar',
            title: 'Oops'
          });
          return;
        }
        selecionados.forEach(material => {
          material.armazemDest = vm.armazemDestino;
          material.enderecoDest = vm.enderecoDestino;
        })

        vm.armazemDestino = null;
        vm.enderecoDestino = null;
        vm.direcionarModal = false;
      }

      vm.selecionarTodos = () => {
        vm.Form.materiais.forEach(material => {
          material.seleciona = true;
        })
      }

      vm.limparSelecao = () => {
        vm.Form.materiais.forEach(material => {
          material.seleciona = false;
        })
      }

      vm.openModalDirecionar = () => {
        vm.direcionarModal = true;
      }

      vm.changeProduto = material => {

        console.log('vm.changeProduto', material)
        if (material.produto && material.produto.codigo) {
          vm.Errors = [];
          let produtoSaldo = erpService.getProdutoSaldo(vm.Form.empresa.empresa, vm.Form.filial.filial, material.produto.codigo);

          if (!produtoSaldo || produtoSaldo.length == 0) {
            FLUIGC.message.error({
              message: 'Produto sem saldo',
              title: 'Oops'
            });
            // vm.Errors.push(`Produto ${material.produto.codigo} sem saldo`)
            material.produto = null;
            return;
          }

          produtoSaldo = produtoSaldo[0];

          console.log(produtoSaldo);

          if (produtoSaldo && produtoSaldo.armazem) {
            material.armazemOrig = vm.Armazens.filter(a => a.codigo == produtoSaldo.armazem)[0];

            if (material.armazemOrig && material.armazemOrig.codigo) {
              material.enderecoOrig = produtoSaldo.endereco;
            }
          }

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

          vm.Form.solicitante = { nome: "ALEX FERREIRA" };
          vm.Form.processInstanceId = 123;
          vm.Form.requestDate = new Date().getTime();
          vm.Form.area = "TECNOLOGIA DA INFORMAÇÃO";
          vm.Form.materiais = [
            {
              "produto": {
                "produto": {
                  "descricao": "PRODUTO A"
                },
                "origem": {
                  "codigo": 3,
                  "descricao": "ARMAZEM C",
                  "enderecos": [
                    {
                      "codigo": "PI03A01",
                      "descricao": "PORTARIA 1",
                      "endereco": "RUA SAO SEBASTIAO 80, VILA. OSASCO/SP",
                      "displaykey": "PI03A01 - RUA SAO SEBASTIAO 80, VILA. OSASCO/SP"
                    }
                  ],
                  "displaykey": "3 - ARMAZEM C"
                },
                "descricao": "PRODUTO A"
              }
            },
            {
              "produto": {
                "produto": {
                  "descricao": "PRODUTO B"
                },
                "origem": {
                  "codigo": 2,
                  "descricao": "ARMAZEM B",
                  "enderecos": [
                    {
                      "codigo": "PI03A01",
                      "descricao": "PORTARIA 1",
                      "endereco": "RUA SAO PAULO 20, CENTRO. DIADEMA/SP",
                      "displaykey": "PI03A01 - RUA SAO PAULO 20, CENTRO. DIADEMA/SP"
                    }
                  ],
                  "displaykey": "2 - ARMAZEM B"
                },
                "descricao": "PRODUTO B"
              }
            },
            {
              "produto": {
                "produto": {
                  "descricao": "PRODUTO E"
                },
                "origem": {
                  "codigo": 2,
                  "descricao": "ARMAZEM B",
                  "enderecos": [
                    {
                      "codigo": "PI03A01",
                      "descricao": "PORTARIA 1",
                      "endereco": "RUA SAO PAULO 20, CENTRO. DIADEMA/SP",
                      "displaykey": "PI03A01 - RUA SAO PAULO 20, CENTRO. DIADEMA/SP"
                    }
                  ],
                  "displaykey": "2 - ARMAZEM B"
                },
                "descricao": "PRODUTO E"
              }
            }
          ];
        }
        vm.Armazens = [
          {
            codigo: 1, descricao: 'ARMAZEM A', enderecos: [
              { codigo: 'PI03A01', descricao: 'PORTARIA 1', endereco: 'RUA PADRAO 100, CENTRO. SAO PAULO/SP' },
              { codigo: 'PI03A02', descricao: 'PORTARIA 2', endereco: 'RUA PADRAO 130, CENTRO. SAO PAULO/SP' },
              { codigo: 'PI03A03', descricao: 'PORTARIA 3', endereco: 'RUA PADRAO 150, CENTRO. SAO PAULO/SP' },
            ]
          },
          {
            codigo: 2, descricao: 'ARMAZEM B', enderecos: [
              { codigo: 'PI03A01', descricao: 'PORTARIA 1', endereco: 'RUA SAO PAULO 20, CENTRO. DIADEMA/SP' }
            ]
          },
          {
            codigo: 3, descricao: 'ARMAZEM C', enderecos: [
              { codigo: 'PI03A01', descricao: 'PORTARIA 1', endereco: 'RUA SAO SEBASTIAO 80, VILA. OSASCO/SP' }
            ]
          },
          {
            codigo: 4, descricao: 'ARMAZEM D', enderecos: [
              { codigo: 'PI03A01', descricao: 'PORTARIA 1', endereco: 'RUA JOSE BONIFACIO 220, CENTRO. ITUPEVA/SP' }
            ]
          },
          {
            codigo: 5, descricao: 'ARMAZEM E', enderecos: [
              { codigo: 'PI03A01', descricao: 'PORTARIA 1', endereco: 'RUA ORIENTE 100, CENTRO. SAO PAULO/SP' }
            ]
          },
          {
            codigo: 6, descricao: 'ARMAZEM F', enderecos: [
              { codigo: 'PI03A01', descricao: 'PORTARIA 1', endereco: 'RUA DOM BOSCO 100, BAIRRO PADRAO. CAMPINAS/SP' }
            ]
          },
        ]

        vm.Produtos = [
          { descricao: 'PRODUTO A' },
          { descricao: 'PRODUTO B' },
          { descricao: 'PRODUTO C' },
          { descricao: 'PRODUTO D' },
          { descricao: 'PRODUTO E' },
          { descricao: 'PRODUTO F' },
          { descricao: 'PRODUTO G' },
        ]

        vm.Materiais = [
          { produto: vm.Produtos[0], origem: vm.Armazens[2] },
          { produto: vm.Produtos[1], origem: vm.Armazens[1] },
          { produto: vm.Produtos[2], origem: vm.Armazens[0] },
          { produto: vm.Produtos[3], origem: vm.Armazens[0] },
          { produto: vm.Produtos[4], origem: vm.Armazens[1] },
          { produto: vm.Produtos[5], origem: vm.Armazens[2] }
        ]

        vm.Materiais.forEach(material => {
          material.descricao = `${material.produto.descricao}`
        });

        vm.Armazens.forEach(armazem => {
          armazem.displaykey = `${armazem.codigo} - ${armazem.descricao}`;
          armazem.enderecos.forEach(endereco => {
            endereco.displaykey = `${endereco.codigo} - ${endereco.endereco}`;
          })
        });
      }
    }
  ]);
