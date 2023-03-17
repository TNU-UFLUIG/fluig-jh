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

        if (vm.Params.etapa == 'inicio' && vm.Params.formMode == 'ADD') {
          vm.Form.solicitante = fluigService.getUsuarios(vm.Params.user)[0];
          vm.Form.requestDate = new Date().getTime();
          vm.Form.materiais.push({ produtoCod: '' });
        }
        vm.Armazens = erpService.getArmazem();
        vm.Filiais = erpService.getEmpFilial();
        vm.Empresas = [...new Set(vm.Filiais.map(f => f.empresa))].map(e => { return { empresa: e } })

        vm.ArmazensL = vm.Armazens.filter(a => isNaN(Number(a.codigo)));
        vm.ArmazensN = vm.Armazens.filter(a => !isNaN(Number(a.codigo)));

        angular.forEach(vm.Form.materiais, m => {
          m.ArmazensByType = vm.Armazens.filter(a => isNaN(Number(a.codigo)) == isNaN(Number(m.armazemOrig)));
        })

        vm.Form.empresaCodigo = '01';
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

      vm.changeArmazemDestinoL = () => {
        vm.enderecoDestinoL = null;
      }
      vm.changeArmazemDestinoN = () => {
        vm.enderecoDestinoN = null;
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
          if (vm.armazemDestinoL && isNaN(Number(material.armazemOrig))) {
            material.armazemDest = vm.armazemDestinoL;
            material.enderecoDest = vm.enderecoDestinoL;
          }
          if (vm.armazemDestinoN && !isNaN(Number(material.armazemOrig))) {
            material.armazemDest = vm.armazemDestinoN;
            material.enderecoDest = vm.enderecoDestinoN;
          }
        });

        vm.armazemDestinoL = null;
        vm.enderecoDestinoL = null;
        vm.armazemDestinoN = null;
        vm.enderecoDestinoN = null;
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

      vm.zoomProduto = (material, index) => {
        var dataset = "protheus_consulta_produto";
        var fields = "filial,Filial,codigo,Código,descricao,Descrição";
        var resultfields = "filial,codigo,descricao";
        var title = "Selecione o produto";
        var filters = "";
        var type = `material_produtoCod___${index + 1}`;
        var likefield = "";
        var likevalue = "";
        var searchby = "codigo";

        console.log(type);
        // filters = `filial,${vm.Form.filialCodigo}`;

        tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby);
      }

      vm.zoomFilial = () => {
        var dataset = "dsEmpFilial";
        var fields = "filial,Filial,descFilial,Descrição";
        var resultfields = "filial,descFilial";
        var title = "Selecione a filial";
        var filters = "";
        var type = 'filialCodigo';
        var likefield = "";
        var likevalue = "";
        var searchby = "descFilial";

        // filters = "descFilial,";

        // type += '_i';

        tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby);
      }

      vm.buscaFilial = () => {
        let filial = vm.Filiais.filter(f => f.filial == vm.Form.filialCodigo)[0];
        if (filial) {
          vm.Form.filialCodigo = filial.filial;
          vm.Form.filialDescricao = filial.descFilial;
        } else {
          FLUIGC.toast({
            title: 'Erro ',
            message: 'Filial não encontrada',
            type: 'danger'
          });

          vm.Form.filialCodigo = '';
          vm.Form.filialDescricao = '';
        }
      }

      vm.buscaProduto = (material, index) => {
        if (material.produtoCod && material.produtoCod !== '') {

          let produto = erpService.getProduto(material.produtoCod).filter(p => p.codigo == material.produtoCod)[0]
          if (produto) {
            vm.setProduto(index, produto.codigo, produto.descricao);

          } else {
            FLUIGC.toast({
              title: 'Erro ',
              message: 'Produto não encontrado',
              type: 'danger'
            });

            material.produtoCod = '';
            material.produtoDesc = '';
          }
        } else {
          material.produtoDesc = '';
        }
      }

      vm.setProduto = (index, codigo, descricao) => {
        vm.Form.materiais[index].produtoCod = codigo;
        vm.Form.materiais[index].produtoDesc = descricao;
        vm.changeProduto(vm.Form.materiais[index]);
      }

      vm.changeProduto = material => {
        if (material.produtoCod && material.produtoCod !== '') {
          vm.Errors = [];
          let produtoSaldo = erpService.getProdutoSaldo(vm.Form.empresaCodigo, vm.Form.filialCodigo, material.produtoCod);

          if (!produtoSaldo || produtoSaldo.length == 0) {
            FLUIGC.message.error({
              message: 'Produto sem saldo',
              title: 'Oops'
            });
            // vm.Errors.push(`Produto ${material.produtoCod} sem saldo`)
            material.produtoCod = null;
            material.produtoDesc = null;
            return;
          }

          produtoSaldo = produtoSaldo[0];
          material.armazemOrig = produtoSaldo.armazem;
          material.enderecoOrig = produtoSaldo.endereco;

          material.ArmazensByType = vm.Armazens.filter(a => isNaN(Number(a.codigo)) == isNaN(Number(material.armazemOrig)));

          console.log(produtoSaldo);
        }
      }

      vm.checkLocal = function checkLocal() {
        return;
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


function setSelectedZoomItem(row) {
  console.log(row);

  if (row.inputId == "filialCodigo") {
    angular.element("form").scope().vm.Form.filialCodigo = row.filial;
    angular.element("form").scope().vm.Form.filialDescricao = row.descFilial;
  }

  if (/^material_produtoCod/.test(row.inputId)) {
    let index = row.inputId.split('___')[1] || 1;
    index = index - 1;

    angular.element("form").scope().vm.setProduto(index, row.codigo, row.descricao);
  }

  angular.element("form").scope().$apply();
}