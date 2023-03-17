function afterTaskSave(colleagueId,nextSequenceId,userList){
	
	acertaData("sol_data");
	acertaData("dt_nf_s");
	acertaData("dt_nf_e");

	
}

//Função para ajustar a data (fluig mobile altera de dd/mm/yyyy para yyyy-dd-mm) 
function acertaData(campo){ 
	
	var data = hAPI.getCardValue(campo); 
	
	log.info("<<< WSREST ADIANTAMENTO - ACERTADATA : "+ campo);
	
	if(data.indexOf("/") == -1 && data != "") { 
		hAPI.setCardValue(campo, data.split("-").reverse().join("/")); 
	}
	
}