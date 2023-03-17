function servicetask16(attempt, message) {
	
	/*log.info("<<< VERIFICANDO FORNECEDOR -  RELATORIO DE DESPESAS");
	
	VerificaFornecedor();
	
	log.info("<<< REALIZANDO INTEGRACAO WSREST RELATORIO DE DESPESAS (TITULO FINANCEIRO)");*/
		
	try {
		
		var empresa 		= "01";//getCardValueCustom("empresa");
		var filial 			= "0101";getCardValueCustom("filial"); 
		var processo 		= "inspecao_de_entrada";
		var id_fluig 		= getCardValueCustom("processo"); 
		var maquina			= getCardValueCustom("serie");
		var funcionando		= getCardValueCustom("etapa_1_status");
		var info_etapa_1	= getCardValueCustom("info_etapa_1");
		var horimetro		= getCardValueCustom("horimetro");
		var cabine			= getCardValueCustom("cabine");
		var recdrive		= getCardValueCustom("RecDrive");
		var meddrive		= getCardValueCustom("info_etapa_41");
		var via				= getCardValueCustom("via");
		var rodaguia		= getCardValueCustom("rodaguia");
		var engate			= getCardValueCustom("engate");
		var telemetria		= getCardValueCustom("telemetria");
		var bateriainc		= getCardValueCustom("serie_bat_inc");
		var carregador		= getCardValueCustom("serie_carr_c");
		
		var tensaoent		= "";
		var tpcarregador	= getCardValueCustom("tpcarregador");
		var kitneutro		= "";
		var tomada			= "";
		var tomcarregador	= "";
		var tombateria		= "";
			
		var visual			= "";
		var original		= "";
		var numfrotastr		= "";
		var fabricacao		= "";
		var peso			= "";
		
		var tencao			= "";
		var capacidadebat	= "";
		var elementos		= "";
		var cabos			= "";
		var conectores		= "";
		var caboconexao		= "";
		var aquaok			= "";
		var pinturabat		= "";
		var batcarregou		= "";
		var possuiaqua		= "";
		
		log.info("<<< WSREST B.ATENDIMENTO - Array montado e Iniciando conexão");
    		
		var clientService = fluigAPI.getAuthorizeClientService();
		
		log.info("<<< Recebeu clientService");
		
		var compID = getValue("WKCompany");
		
		log.info("<<< Recebeu compID");
		
		var data = {
				companyId :  compID + '',
				serviceCode : 'WSREST',
				endpoint : '/ATUBASEAT',
				method : 'post', 						
				timeoutService: '200', 
				params : {
					empresa: empresa,
					filial: filial,
					maquina: maquina,
					funcionando: funcionando,
					info_etapa_1: info_etapa_1,
					horimetro: horimetro,
					cabine: cabine,
					recdrive: recdrive,
					meddrive: meddrive,
					via: via,
					rodaguia: rodaguia,
					engate: engate,
					telemetria: telemetria,
					bateriainc: bateriainc,
					carregador:carregador,
					
					tensaoent: tensaoent,
					tpcarregador: tpcarregador,
					kitneutro: kitneutro,
					tomada: tomada,
					tomcarregador: tomcarregador,
					tombateria: tombateria,
					
					visual: visual,
					original: original,
					numfrotastr: numfrotastr,
					fabricacao: fabricacao,
					peso: peso,
					
					tencao:tencao,
					capacidadebat:capacidadebat,
					elementos:elementos,
					cabos:cabos,
					conectores:conectores,
					caboconexao:caboconexao,
					aquaok:aquaok,
					pinturabat:pinturabat,
					batcarregou:batcarregou,
					possuiaqua:possuiaqua,					
					
					

				}
		}
		
		var vo = clientService.invoke(JSONUtil.toJSON(data));
		
		
		if(vo.getResult()== null || vo.getResult().isEmpty()){
			
			var messagemErro = "Resultado da integração não encontrado. Informe o administrador do sistema";

			log.info("<<< WSREST B.ATENDIMENTO - Erro: " + messagemErro);
			
			throw messagemErro;
			
		} else {
			
			log.info("<<< WSREST B.ATENDIMENTO - Retorno: "+vo.getResult());
			
			var oRetorno = JSON.parse(vo.getResult());

			log.info("<<< WSREST B.ATENDIMENTO - oRetorno: "+oRetorno);

			if( oRetorno.errorMessage != null ){
				throw oRetorno.errorMessage;
			}

			log.info("<<< WSREST B.ATENDIMENTO - Passei ");

			if( oRetorno.LSUCCESS != null ){
				
				log.info("<<< WSREST B.ATENDIMENTO - oRetorno.lSuccess: "+oRetorno.LSUCCESS);
				
				if( oRetorno.LSUCCESS ){
				
					log.info("<<< WSREST B.ATENDIMENTO - Resultado: " + oRetorno.CMESSAGE);
					
					message = oRetorno.CMESSAGE;
					
					var aux = oRetorno.CCODEIDENT;
					
					log.info("<<< WSREST B.ATENDIMENTO - CCODIDENT: " + aux);

				}else{

					var erroRotAuto = oRetorno.CMESSAGE;
					
					log.info("<<< WSREST B.ATENDIMENTO - Erro de integração CMESSAGE: <br>"+ erroRotAuto);
					
					throw erroRotAuto; 
				}
			} else {
				
				if(oRetorno.message != null) {
					throw "Erro de comunicação com o Protheus: "+ oRetorno.message +". Informe o administrador do sistema"; 
				} else {
					throw "Erro de comunicação com o Protheus: Informe o administrador do sistema"; 
				}
			}
		}
    		
    } 
    catch(erro){
    	
    	log.info("<<< WSREST B.ATENDIMENTO -  WS: "+ erro);
    	
    	throw erro;
    }
    
    log.info("<<< WSREST B.ATENDIMENTO - Encerrado");
}

/*
	Retorna o valor do campo e gera o log.
*/

function getCardValueCustom(campo){
	
	var valor = hAPI.getCardValue(campo);
	
	log.info("<<< WSREST B.ATENDIMENTO - getCardValueCustom: "+ campo + " - "+ valor);

	return valor;
}

/*
replaceAll necessário para uso em eventos de processo
*/
function replaceAll(string, token, newtoken) {

while (string.indexOf(token) != -1) {
	string = string.replace(token, newtoken);
}
return string;
}

/*
Função responsável para tratamento de prevenção de mensagem de NaN (Not a number)
*/
function valueToNumber(valor){

	valor = replaceAll(valor, ".", "");
	valor = parseFloat(replaceAll(valor, ",", "."));
	
	return valor;
}

