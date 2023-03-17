INICIO = 0;
INICIO_ = 4;

FIM = 10;

INTEGR_BASE = 16;

VALOR_INICIAL = " - ";
VALOR_OK = "OK ";
VALOR_NOK = "NOK";
VALOR_NA = "NA ";
VALOR_MAU = "MAU USO";
VALOR_PR = "PEQ.REPAROS   ";
VALOR_GR = "GRA.REPAROS   ";
VALOR_RT = "REPAROS TOTAIS";
VALOR_SIM= "TOTAL  ";
VALOR_PAR= "PARCIAL";
VALOR_TDB= "TDB";



$ ( document ).ready(function() {	

	//readonly campos zoom
	
	$("#inspetor").attr("readonly","true");
	$("#sol_data").attr("readonly","true");
	$("#sol_hora").attr("readonly","true");
	$("#cod_cli").attr("readonly","true");
	//$("#serie").attr("readonly","true");
	$("#resp_com").attr("readonly","true");
/*	$("#desc_novo_gestor").attr("readonly","true");
	$("#desc_novo_departamento").attr("readonly","true");
	$("#descricao_filial").attr("readonly","true");
	
	$("#sol_gestor").attr("readonly","true");
	$("#sol_data_gestor").attr("readonly","true");
	$("#sol_depto_desc_gestor").attr("readonly","true");
	
	$("#resp_ti").attr("readonly","true");
	$("#sol_data_ti").attr("readonly","true");
	$("#resp_depto_desc").attr("readonly","true");
	
*/	
//	alert("foi")
/*	
	if ((getWKNumState() == 0)){ //Início 
		
		//$("#desc_novo_cc").val("Preecher somente se for alteração de departamento");
*/		
	
	$("#trocaoleo").change(function(){
		
		var total = 0;
		var pontos = parseFloat($("#totponto").val());
		
		if($(this).val() == "1") {

			if (pontos >= 20) {
				total = pontos - 20;
			}
			
		} else {
			total = $("#totponto_ori").val();
		}
		
		$("#totponto").val(total);
		
		if(total < "15"){
			$("#resultado").val("Scrap");
		} else if(total < "30"){
			$("#resultado").val("Manutenção 4");
		} else if(total < "45"){
			$("#resultado").val("Manutenção 3");
		} else if(total < "80"){
			$("#resultado").val("Manutenção 2");
		} else if(total < "90"){
			$("#resultado").val("Manutenção 1");
		} else if(total > "90"){
			$("#resultado").val("Check and Paint");
		}
		
	});
	
	if (getWKNumState() == INICIO  || getWKNumState() == INICIO_){
		preencheSolicitante(getWKUser());
		$("#ponto_01").val("5");
		$("#ponto_02").val("14");
		$("#ponto_03").val("5");
		$("#ponto_04").val("20");
		$("#ponto_05").val("21");
		$("#ponto_06").val("5");
		$("#ponto_07").val("3");
		$("#ponto_08").val("1");
		$("#ponto_09").val("2");
		$("#ponto_10").val("15");
		$("#ponto_11").val("2");
		$("#ponto_12").val("2");
		$("#ponto_13").val("5");
		$("#ponto_14").val("28");
		$("#ponto_15").val("20");
		$("#ponto_16").val("32");
		$("#ponto_17").val("10");
		$("#ponto_18").val("10");
		$("#ponto_19").val("8");
		$("#ponto_20").val("10");
		$("#ponto_21").val("15");
		$("#ponto_22").val("20");
		$("#ponto_23").val("5");
		$("#ponto_24").val("10");
		$("#ponto_25").val("3");
		$("#ponto_26").val("3");
		$("#ponto_27").val("3");
		$("#ponto_28").val("1");
		$("#ponto_29").val("2");
		$("#ponto_30").val("20");
		$("#ponto_31").val("10");
		$("#ponto_32").val("35");
		$("#ponto_33").val("50");
		$("#ponto_34").val("5");
		
		$("#ponto_01_un").val("0");
		$("#ponto_02_un").val("0");
		$("#ponto_03_un").val("0");
		$("#ponto_04_un").val("0");
		$("#ponto_05_un").val("0");
		$("#ponto_06_un").val("0");
		$("#ponto_07_un").val("0");
		$("#ponto_08_un").val("0");
		$("#ponto_09_un").val("0");
		$("#ponto_10_un").val("0");
		$("#ponto_11_un").val("0");
		$("#ponto_12_un").val("0");
		$("#ponto_13_un").val("0");
		$("#ponto_14_un").val("0");
		$("#ponto_15_un").val("0");
		$("#ponto_16_un").val("0");
		$("#ponto_17_un").val("0");
		$("#ponto_18_un").val("0");
		$("#ponto_19_un").val("0");
		$("#ponto_20_un").val("0");
		$("#ponto_21_un").val("0");
		$("#ponto_22_un").val("0");
		$("#ponto_23_un").val("0");
		$("#ponto_24_un").val("0");
		$("#ponto_25_un").val("0");
		$("#ponto_26_un").val("0");
		$("#ponto_27_un").val("0");
		$("#ponto_28_un").val("0");
		$("#ponto_29_un").val("0");
		$("#ponto_30_un").val("0");
		$("#ponto_31_un").val("0");
		$("#ponto_32_un").val("0");
		$("#ponto_33_un").val("0");
		$("#ponto_34_un").val("0");

	}
/*		
		$("#zoom_novo_departamento").css("pointer-events", "none");
		
	} else {
		$(".motivo-zoom").css("pointer-events", "none");
	}
*/	
	//if (getWKNumState() == 21) {
	//	$("#zoom_novo_departamento").css("pointer-events", "auto");
	//}

//Manter cor
	$('.button-status').each(function(i, obj) {
		        
	        if (obj.value == VALOR_OK) {
	        	$(obj).switchClass("btn-default", "btn-success");
	        } else if (obj.value == VALOR_NOK) {
	        	$(obj).switchClass("btn-default", "btn-danger");
	        } else if (obj.value == VALOR_MAU) {
	        	$(obj).switchClass("btn-default", "btn-warning");	        	
	        } else if (obj.value == VALOR_NA) {
	        	$(obj).switchClass("btn-default", "btn-primary");
	        }
		
	});					

	$('.button-status2').each(function(i, obj) {
        
        if (obj.value == VALOR_PR) {
        	$(obj).switchClass("btn-default", "btn-success");
        } else if (obj.value == VALOR_GR) {
        	$(obj).switchClass("btn-default", "btn-warning");
        } else if (obj.value == VALOR_RT) {
        	$(obj).switchClass("btn-default", "btn-danger");
        }
	});	
    $('.button-status3').each(function(i, obj) {
        
        if (obj.value == VALOR_SIM) {
        	$(obj).switchClass("btn-default", "btn-success");
        } else if (obj.value == VALOR_PAR) {
        	$(obj).switchClass("btn-default", "btn-warning");
        } else if (obj.value == VALOR_NOK) {
        	$(obj).switchClass("btn-default", "btn-danger");
        } else if (obj.value == VALOR_TDB) {
        	$(obj).switchClass("btn-default", "btn-primary");
        }
    });	
	
//CamposOficina
	//if (getWKNumState() != CONF_B_OFICINA){
	/*if (getWKNumState() == INICIO || getWKNumState() == INICIO_ || getWKNumState() == CONF_B_OFFICE) {
	
		$(".has-error-table").removeClass("has-error-table");
		
		$('.button-status').each(function(i, obj) {
			
			$("#"+ obj.id + "_oficina").hide();
			$("#"+ obj.id + "_oficina_info_div").hide();
		});
		
	} else {
			$(".has-error-table").removeClass("has-error-table");
			
			$('.button-status').each(function(i, obj) {
				
				if (obj.value != VALOR_NOK) {
					
					$("#"+ obj.id + "_oficina").hide();
					$("#"+ obj.id + "_oficina_info_div").hide();
					
					
				}
		});
			 
	}*/

});

function calcTotal(cPosicao) {	
	
	var pos_atual = event.srcElement.id;
	var totalPonto = $("#totponto").val()
	
	$('.pontos').each(function(i, obj) {
		
		var teste = (obj.id).substring(6,8);
		var teste1 = (obj.id).substring(6,7);
		var teste2 = cPosicao

		//if($("#"+obj.id).substring(1,1) = cPosicao){,
		if((obj.id).substring(6,8) == cPosicao) {
			var pontos = parseInt($(obj).val());
			var valor = "4";
			var total = pontos / valor;
			
			$('.button-status').each(function(i, obj3){
					            
	            var pos_laco = (obj3.id);
	            
				if(pos_atual == pos_laco){
					if(obj3.value == VALOR_OK || obj3.value == VALOR_NA){
						$('.pontos_uni').each(function(i, obj2) {
							if((obj2.id).substring(6,8) == cPosicao) {
								$("#"+ obj2.id).val(formataMoeda(total));
									
									var valor = $("#"+ obj2.id).val()
													
										totalPonto = Number(totalPonto) + moedaToNumber(valor);														
									
									$("#totponto").val(totalPonto); 
									$("#totponto_ori").val(totalPonto); 
									
									if(totalPonto < "15"){
										$("#resultado").val("Scrap")
									} else if(totalPonto < "30"){
										$("#resultado").val("Manutenção 4")
									} else if(totalPonto < "45"){
										$("#resultado").val("Manutenção 3")
									} else if(totalPonto < "80"){
										$("#resultado").val("Manutenção 2")
									} else if(totalPonto < "90"){
										$("#resultado").val("Manutenção 1")
									} else if(totalPonto > "90"){
										$("#resultado").val("Check and Paint")
									}
								
								
								//atualizaTotal();
								//$('#"totponto"').val($("#"+ obj2.id).val()+totalPonto);
							};
							
						});
					}else $('.pontos_uni').each(function(i, obj2) {
						if((obj2.id).substring(6,8) == cPosicao) {
							
							var valor = $("#"+ obj2.id).val()
								
								totalPonto = Number(totalPonto) - moedaToNumber(valor);														
									
							$("#totponto").val(totalPonto);
							$("#totponto_ori").val(totalPonto);
							
							$("#"+ obj2.id).val(0);
							
							if(totalPonto < "15"){
								$("#resultado").val("Scrap")
							} else if(totalPonto < "30"){
								$("#resultado").val("Manutenção 4")
							} else if(totalPonto < "45"){
								$("#resultado").val("Manutenção 3")
							} else if(totalPonto < "80"){
								$("#resultado").val("Manutenção 2")
							} else if(totalPonto < "90"){
								$("#resultado").val("Manutenção 1")
							} else if(totalPonto > "90"){
								$("#resultado").val("Check and Paint")
							}
							//atualizaTotal();
							//$('#"totponto"').val($("#"+ obj2.id).val()+totalPonto);
						};
						
					}); 
				};
			});
			
		};
	});
}
/*
function atualizaTotal(){
	
	var totalPonto = $("#totponto").val()
	
	$('.pontos_uni').each(function(i, obj) {
		
		var valor = 0
		
			valor = $("#"+ obj.id).val();
		
		totalPonto += valor
		
		$("#totponto").val(formataMoeda(totalPonto));
		
	});

}*/
	
function formataMoeda(valor){
	return valor.toLocaleString("pt-br", {minimumFractionDigits:2, maximumFractionDigits:2});
}

function moedaToNumber(moeda){
	
	var valor = 0;
	
	valor = FLUIGIP.USEFUL.replaceAll(moeda, ".", "");
	valor = parseFloat(FLUIGIP.USEFUL.replaceAll(valor, ",", "."));
	
	return valor;
}


function preencheSolicitante(usuarioLogado){
	
	var c1 			= DatasetFactory.createConstraint("usuarioLogado", usuarioLogado, usuarioLogado, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset 	= DatasetFactory.getDataset("funcionarios", null, constraints, null);
	
	if (dataset != null && Object.keys(dataset).length > 0){
		
		if (dataset.values.length > 0){
		
			var row = dataset.values[0];
			
			$('#matricula').val(row['matricula'].trim());
			$('#resp_com').val(row['nome'].trim());
			$('#sol_data').val(FLUIGIP.USEFUL.getDate());
			$('#sol_hora').val(FLUIGIP.USEFUL.getTime());
			
		} else {
			
			$('#matricula').val('');
			$('#inspetor').val('');
			//$(".motivo-zoom").css("pointer-events", "none");
			
			FLUIGIP.USEFUL.showWarning("Colaborador não localizado");
			
		}
	} else {
		
		$('#matricula').val('');
		$('#inspetor').val('');
		//$(".motivo-zoom").css("pointer-events", "none");
		
		FLUIGIP.USEFUL.showWarning("Colaborador não localizado");
	}
}

function MudarStatus(obj) {

	if(getWKNumState() == INICIO || getWKNumState() == INICIO_) {
		
		var valor 		= $(obj).val();
		var classDe 	= "btn-default";
		var classPara 	= "btn-default";
		//alert(valor);
	
		$(obj).removeClass("has-error-table");
		
		if (valor == VALOR_INICIAL) {
			
			valor 		= VALOR_OK;
			classeDe	= "btn-default";
			classePara 	= "btn-success";
				
		} else if (valor == VALOR_OK){
			
			valor 		= VALOR_NOK;
			classeDe	= "btn-success";
			classePara 	= "btn-danger";
			
		} else if (valor == VALOR_NOK){
			
			valor 		= VALOR_MAU;
			classeDe	= "btn-danger";
			classePara 	= "btn-warning";
				
		}else if (valor == VALOR_MAU){
			
			valor 		= VALOR_NA;
			classeDe	= "btn-warning";
			classePara 	= "btn-primary";
				
		}else if (valor == VALOR_NA){
			
			valor 		= VALOR_OK;
			classeDe	= "btn-primary";
			classePara 	= "btn-success";
				
		}
		
		$(obj).val(valor);
		$(obj).switchClass(classeDe, classePara);
	} 

}

function MudarStatusOfi(obj) {

	if(getWKNumState() == INICIO || getWKNumState() == INICIO_) {
		
		var valor 		= $(obj).val();
		var classDe 	= "btn-default";
		var classPara 	= "btn-default";
		
		$(obj).removeClass("has-error-table");
		
		if (valor == VALOR_INICIAL) {
			
			valor 		= VALOR_PR;
			classeDe	= "btn-default";
			classePara 	= "btn-success";
				
		} else if (valor == VALOR_PR){
			
			valor 		= VALOR_GR;
			classeDe	= "btn-success";
			classePara 	= "btn-warning";
			
		} else if (valor == VALOR_GR){
			
			valor 		= VALOR_RT;
			classeDe	= "btn-warning";
			classePara 	= "btn-danger";
				
		} else if (valor == VALOR_RT){
			
			valor 		= VALOR_INICIAL;
			classeDe	= "btn-danger";
			classePara 	= "btn-default";
				
		}
		
		$(obj).val(valor);
		$(obj).switchClass(classeDe, classePara);
	} 

}


function MudarStatusFunc(obj) {

	VALOR_PR = "PR ";
	VALOR_GR = "GR ";
	VALOR_RT = "RT ";	
	
	if(getWKNumState() == INICIO || getWKNumState() == INICIO_) {
		
		var valor 		= $(obj).val();
		var classDe 	= "btn-default";
		var classPara 	= "btn-default";
		
		$(obj).removeClass("has-error-table");
		
		if (valor == VALOR_INICIAL) {
			
			valor 		= VALOR_SIM;
			classeDe	= "btn-default";
			classePara 	= "btn-success";
				
		} else if (valor == VALOR_SIM){
			
			valor 		= VALOR_PAR;
			classeDe	= "btn-success";
			classePara 	= "btn-warning";
			
		} else if (valor == VALOR_PAR){
			
			valor 		= VALOR_NOK;
			classeDe	= "btn-warning";
			classePara 	= "btn-danger";
				
		} else if (valor == VALOR_NOK){
			
			valor 		= VALOR_SIM;
			classeDe	= "btn-danger";
			classePara 	= "btn-success";
				
		}		
		
		$(obj).val(valor);
		$(obj).switchClass(classeDe, classePara);
	} 

}

function MudarStatusGeral(obj) {
	
	var itens = FLUIGIP.TABLE.getTableSize(obj.id.substring(0, obj.id.length - 13), 1);
	
	MudarStatus(obj);
	
	for (var item = 1; item <= itens; item++) {
		MudarStatus($("#"+ obj.id.substring(0, obj.id.length - 6) +"___"+ item))
	}
	
}

function zoomClientes(obj){
	
	var dataset			= "dsClienteProt";
	var fields			= "codigo,Codigo,loja,Loja,nome,Nome";
	var resultfields	= "codigo,loja,nome";
	var title			= "Clientes";
	var filters			= "";
	var type			= $(obj).prev("input").attr("name");
	var likefield		= "";
	var likevalue		= "";
	var searchby		= "filtro";
	
	if($("#"+ type).val() != "" && $("#"+ type).val() != undefined){
		filters = "filtro,"+ $("#"+ type).val();
	}
    
	tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby); 

}

function zoomProdLoc(obj){

	
	var dataset			= "dsContratosLoc";
	var fields			= "COD_PRODUTO,Empilhadeira,DESC_PRODUTO,Descrição,TIPO_PRODUTO,tipo,CONTRATO,contrato,COD_CLIENTE,cliente,COD_LOJA,loja,NOME,nome,GRUPO,grupo,NUM_NOTA_SAIDA,NF Saída,DT_REMESSA_NF,Data Saída,NUM_NOTA_ENTRADA,NF Entrada,DT_DEVOLUCAO,Data Entrada,TIPO_CONTRATO,Tipo de Contrato,SIT_MOVIMENTO,Sit. Contrato,STATUS_MOVIMENTO,Status Movimento,BAT_INCLUSA,Bat. Inclusa,ATIVO,Ativo,HORIMETRO,Horimetro";
			//,tipo,AA3_CODPRO,Codigo,AA3_NUMSER,Serie,AA3_MODELO,Modelo,AA4_NSERAC,Acessorio,ATIVO,Ativo";
	var resultfields	= "COD_PRODUTO,DESC_PRODUTO,TIPO_PRODUTO,CONTRATO,COD_CLIENTE,COD_LOJA,NOME,GRUPO,NUM_NOTA_SAIDA,DT_REMESSA_NF,DT_REMESSA_NF,NUM_NOTA_ENTRADA,DT_DEVOLUCAO,TIPO_CONTRATO,SIT_MOVIMENTO,STATUS_MOVIMENTO,BAT_INCLUSA,ATIVO,HORIMETRO";
	var title			= "Selecione a empilhadeira";
	var filters			= "";
	var type			= $(obj).prev("input").attr("name");
	var likefield		= "";
	var likevalue		= "";
	var searchby		= "concatena";
	
	if($("#"+ type).val() != "" && $("#"+ type).val() != undefined){
		filters = "concatena,"+ $("#"+ type).val();
	}
    
	tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby); 
	

}

function zoomEmpilhadeira(obj){

	
	var dataset			= "dsempilhadeiraProt";
	var fields			= "B1_COD,Empilhadeira,B1_DESC,Descrição,B1_TIPO,tipo,AA3_CODPRO,Codigo,AA3_NUMSER,Serie,AA3_MODELO,Modelo,AA4_NSERAC,Acessorio,ATIVO,Ativo";
	var resultfields	= "B1_COD,B1_DESC,B1_TIPO,AA3_CODPRO,AA3_NUMSER,AA3_MODELO,AA4_NSERAC,ATIVO";
	var title			= "Selecione a empilhadeira";
	var filters			= "";
	var type			= $(obj).prev("input").attr("name");
	var likefield		= "";
	var likevalue		= "";
	var searchby		= "concatena";
	
	if($("#"+ type).val() != "" && $("#"+ type).val() != undefined){
		filters = "concatena,"+ $("#"+ type).val();
	}
    
	tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby); 
	

}


function zoomFuncionario(obj){
	
	var empresa			= "01";//$('#empresa').val();
	var filial			= "0101"; //$('#filial').val();
	var usuario_resp	= $('#sol_matricula_funcionario').val();
	var dataset			= "funcionarios";
	var fields			= "matricula,Matricula,nome,Nome";
	var resultfields	= "chave,descricao";
	var title			= "Colaborador";
	var filters			= "";//"empresa,"+ empresa +",filial,"+ filial; //+",usuarioResponsavel,"+ usuario_resp;
	var type			= $(obj).prev("input").attr("name");
	var likefield		= "";
	var likevalue		= "";
	var searchby		= "concatena";
	
	if($("#"+ type).val() != "" && $("#"+ type).val() != undefined){
		filters = "concatena,"+ $("#"+ type).val();
	}
	
    tdizoom.open(dataset, fields, resultfields, title, filters, type, likefield, likevalue, searchby);
}

function setSelectedZoomItem(selectedItem) {
	
	
	if (selectedItem.type == "serie") {
		
		$('#serie').val(selectedItem["COD_PRODUTO"]);
		$('#modelo').val(selectedItem["DESC_PRODUTO"]);
		
		$('#tipo').val(selectedItem["TIPO_PRODUTO"]);
		$('#contrato').val(selectedItem["CONTRATO"]);
		
		$('#tipo_cont').val(selectedItem["TIPO_CONTRATO"]);
		
		$('#sit_mov').val(selectedItem["SIT_MOVIMENTO"]);
		$('#sta_mov').val(selectedItem["STATUS_MOVIMENTO"]);
		
		$('#cod_cli').val(selectedItem["COD_CLIENTE"]);
		$('#loja').val(selectedItem["COD_LOJA"]);
		$('#nome_cli').val(selectedItem["NOME"]);
		
		$('#grupo').val(selectedItem["GRUPO"]);
		$('#nf_saida').val(selectedItem["NUM_NOTA_SAIDA"]);
		$('#dt_nf_s').val(selectedItem["DT_REMESSA_NF"]);
		$('#nf_entrada').val(selectedItem["NUM_NOTA_ENTRADA"]);
		$('#dt_nf_e').val(selectedItem["DT_DEVOLUCAO"]);
		
		
		
		$('#serie_bat_inc').val(selectedItem["BAT_INCLUSA"]);
		$('#ativo_bat').val(selectedItem["ATIVO"]);
		
		$('#horimetro').val(parseInt(selectedItem["HORIMETRO"].replace(',', '.')));
		
	}

	if (selectedItem.type == "serie_bat_inc") {
		
		$('#serie_bat_inc').val(selectedItem["B1_COD"]);
		$('#ativo_bat').val(selectedItem["ATIVO"]);
		
		
		}
	
	if (selectedItem.type == "serie_carr_c") {
		
		$('#serie_carr_c').val(selectedItem["B1_COD"]);
		
		
		}

}

function buscaSerie(item){
	
	if (item == '1') {
		serie = $("#serie").val();
	}else if (item == '2') {
		serie = $("#serie_bat_inc").val();
	}else if (item == '3') {
		serie = $("#serie_carr_c").val();
	}else {
		serie = '';
	}
	
	//codpeca = $("#serie_bat_inc").val();
	try{
		var c1 = DatasetFactory.createConstraint("filtro",serie,serie,ConstraintType.MUST);
		var constraints = new Array(c1);
		var dataset = DatasetFactory.getDataset("dsContratosLoc",null,constraints,null);
		
		if (dataset.values.length > 0) {
		var i='';
		var codigo = dataset.values[0].COD_PRODUTO;
			
			if(item == '1'){
				
				$('#serie').val(dataset.values[0].COD_PRODUTO);
				$('#modelo').val(dataset.values[0].DESC_PRODUTO);
				$('#tipo').val(dataset.values[0].TIPO_PRODUTO);
				$('#contrato').val(dataset.values[0].CONTRATO);
				$('#tipo_cont').val(dataset.values[0].TIPO_CONTRATO);
				$('#sit_mov').val(dataset.values[0].SIT_MOVIMENTO);
				$('#sta_mov').val(dataset.values[0].STATUS_MOVIMENTO);
				$('#cod_cli').val(dataset.values[0].COD_CLIENTE);
				$('#loja').val(dataset.values[0].COD_LOJA);
				$('#nome_cli').val(dataset.values[0].NOME);
				$('#grupo').val(dataset.values[0].GRUPO);
				$('#nf_saida').val(dataset.values[0].NUM_NOTA_SAIDA);
				$('#dt_nf_s').val(dataset.values[0].DT_REMESSA_NF);
				$('#nf_entrada').val(dataset.values[0].NUM_NOTA_ENTRADA);
				$('#dt_nf_e').val(dataset.values[0].DT_DEVOLUCAO);
				$('#serie_bat_inc').val(dataset.values[0].BAT_INCLUSA);
				$('#ativo_bat').val(dataset.values[0].ATIVO);
				$('#horimetro').val(parseInt(dataset.values[0].HORIMETRO.replace(',', '.')));

			}else if (item == '2'){
				

				$('#serie_bat_inc').val(dataset.values[0].COD_PRODUTO);
				$('#ativo_bat').val(dataset.values[0].ATIVO);	
				
			}else if (item == '3'){
				

				$('#serie_carr_c').val(dataset.values[0].COD_PRODUTO);
				
			}else if (codigo != serie){

				alert("Serie não encontrada!");
				if (item == '2'){
					//$('#serie_bat_inc').val('');
					$('#ativo_bat').val('');					
					
				}
				if (item == '1'){	
					$('#serie').val('');
					$('#modelo').val('');
					$('#tipo').val('');
					$('#contrato').val('');
					$('#tipo_cont').val('');
					$('#sit_mov').val('');
					$('#sta_mov').val('');
					$('#cod_cli').val('');
					$('#loja').val('');
					$('#nome_cli').val('');
					$('#grupo').val('');
					$('#nf_saida').val('');
					$('#dt_nf_s').val('');
					$('#nf_entrada').val('');
					$('#dt_nf_e').val('');
					$('#serie_bat_inc').val('');
					$('#ativo_bat').val('');
				}
			
			}
			/*else if (codigo != codpeca){
				
				alert("Codigo não encontrado!");
				$('#serie_bat_inc').val('');
				$('#ativo_bat').val('');					
			}
			*/
		}else{
			
				alert("Serie não encontrada!");
				if (item == '2'){
					//$('#serie_bat_inc').val('');
					$('#ativo_bat').val('');					
					
				}
				if (item == '1'){	
					$('#serie').val('');
					$('#modelo').val('');
					$('#tipo').val('');
					$('#contrato').val('');
					$('#tipo_cont').val('');
					$('#sit_mov').val('');
					$('#sta_mov').val('');
					$('#cod_cli').val('');
					$('#loja').val('');
					$('#nome_cli').val('');
					$('#grupo').val('');
					$('#nf_saida').val('');
					$('#dt_nf_s').val('');
					$('#nf_entrada').val('');
					$('#dt_nf_e').val('');
					$('#serie_bat_inc').val('');
					$('#ativo_bat').val('');
				}
		}
	}
	catch(error){
		
	}
}

function beforeValidateForm_PE(numState, nextState){
	
	var message 	= "";
	var validOption = false;
	var validText	= false;
	var validTable	= false;
	var validSignature	= false;
	var engate = $('#engate').val()
	
	if (numState == INICIO || numState == INICIO_) {
		
		if (nextState == INTEGR_BASE) {
		
			$(".has-error-table").removeClass("has-error-table");
			
			$('.button-status').each(function(i, obj) {
				
				if (obj.value == VALOR_INICIAL) {
					
					$(obj).addClass("has-error-table");
					
					validOption = true;
				
				}else if (obj.value == VALOR_MAU) {
					
					if (obj.id != "etapa_1_status" && obj.id != "etapa_2_status") {
						
						if ($("#"+ obj.id + "_oficina").val() == VALOR_INICIAL) {
							
							$("#"+ obj.id + "_oficina").addClass("has-error-table");
							
							validTable = true;
							
						} 
					
					}

				}

			});	
			
			$('.button-status3').each(function(i, obj) {
				
				if (obj.value == VALOR_INICIAL) {
					
					$(obj).addClass("has-error-table");
					
					validOption = true;
				
				}

			});	

		}
		
	}
	
	if(engate == '') {
		message = "Informe o Engate"
		throw message;
	}

	
	if (validOption) {
		message += "Existem opções não informadas";
	}
	
	if (validText) {
		message += "\ A Observação da não conformidade é obrigatória";
	}
		
	if (validTable) {
		message += "\n Informe o nivel do Mau Uso para a opções definidas com essa categoria";
	}
	
	if (validSignature) {
		message += "\n Nome/Assinatura não preenchida";
	}
	
	if (validOption || validText || validTable || validSignature) {
		throw message;
	}			

}

function showCamera(element){
	
	//var id 		= element.name.substring(20);
	var id 		= element.name.substring(3);
	//var id 		= element.name;
	var anexo 	= true;

	//if ($("#nome_anexo"+ id).val() == "" || getMobile() == "true") {
	if ($("#tx_"+ id).val() == "" || getMobile() == "true") {

		JSInterface.showCamera(id);
		//JSInterface.showCamera();
		
		if (getMobile() == "true") 
		{
			$("#tx_"+ id).val(id);
			$("#id_"+ id).val(id);
		} 
		else 
		{	
			parent.ECM.attachmentTable.on('change', () => {
					
				var load = FLUIGC.loading(window);
					
				load.show();
					
				var timer = setInterval(() => {
							
						$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
						    	
						        console.log("Id >>>"+ attachment.id);
								console.log("Name >>> "+ attachment.name);
								console.log("Description >>> "+ attachment.description);
								
						        if(attachment.description == id){
						        	
						        	//$("#tx_"+ id).val(attachment.name);
						        	$("#tx_"+ id).val(attachment.description);
						        	$("#id_"+ id).val(id);
						        	$(window.top.document).find('#attachmentsStatusTab').trigger('click');	
						        	
						        	load.hide();
						        	
						        	clearInterval(timer);
						        }
						        		        
						    });	
						
					}, 1000);
					
				});		
		}
		
	} else {
		FLUIGIP.USEFUL.showWarning("Anexo já informado");
	}

}

function deleteAttachment(element) {
	
	var id = element.name.substring(3);
	
	if (getMobile() == "true") {
		$("ex_"+ id).val("");
	} else {
		
		$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) {
			
	        var attachmentDescription = attachment.description;
	                
	        if (attachmentDescription == id) {
	        	
	        	parent.WKFViewAttachment.removeAttach([i]);
	        	
	        	$("#tx_"+ id).val("");
	        }
	        
			//console.log("Id >>>"+ attachment.id);
			//console.log("Name >>> "+ attachment.name);
			//console.log("Name >>> "+ attachment.description);
	        
	     });
	}
}

function viewAttachment(element){
	
	var id		= element.name.substring(3);
	var doc 	= $("#dc_"+ id).val();
	var versao 	= $("#vr_"+ id).val(); 
	
	if(doc != "" && versao != ""){
		
		if (getMobile() == "true") {
			FLUIGIP.USEFUL.showWarning("Utilize a aba anexo");
		} else {
			openDocument(doc, versao);
		}
		
	}else{
		FLUIGIP.USEFUL.showWarning("Anexo nao encontrado ("+ $("#tx_"+ id).val() +")");
	}   
}

function openDocument(docId, docVersion) {
	
    var parentOBJ;

    if (window.opener) {
        parentOBJ = window.opener.parent;
    } else {
        parentOBJ = parent;
    }

    var cfg = {
        url : "/ecm_documentview/documentView.ftl",
        maximized : true,
        title : "Visualizador de Documentos",
        callBack : function() {
            parentOBJ.ECM.documentView.getDocument(docId, docVersion);
        },
        customButtons : []
    };
    
    parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
}






