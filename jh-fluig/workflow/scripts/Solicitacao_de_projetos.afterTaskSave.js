function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	
	var empresa				= "01";
	var filial				= "0101";
	var matricula			= hAPI.getCardValue("matricula");
	var userId 				= getValue("WKUser");
	var userName			= getName(userId);
	var numState 			= getValue("WKNumState");
	var nextState			= getValue("WKNextState");
	
	
	//Corrige campos data
	acertaData("sol_data");
	acertaData("data_gestor");
	acertaData("data_aprov_fin");
	acertaData("data_incl_proj");
	
}


//Função para ajustar a data (fluig mobile altera de dd/mm/yyyy para yyyy-dd-mm) 
function acertaData(campo){ 
	
	var data = hAPI.getCardValue(campo); 
	
	log.info("<<< WSREST SOL. PROJETOS - ACERTADATA : "+ campo);
	
	if(data.indexOf("/") == -1 && data != "") { 
		hAPI.setCardValue(campo, data.split("-").reverse().join("/")); 
	}
	
}