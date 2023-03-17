function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var numState 	= getValue("WKNumState");
	var nextState	= getValue("WKNextState");
	var observacao 	= getValue("WKUserComment");
	var inicio		= 0;
	var inicio_		= 4;
	var triagem		= 5;
	var gerencia	= 16;
	var ger_projeto	= 29;
	
	
	var reprovatriagem	= 13;
	var reprovagerencia	= 20;
	
	
	if (numState == triagem) {

		if (nextState == reprovatriagem) {
			validaComentario(observacao);			
		}
	}
	
	if (numState == gerencia) {

		if (nextState == reprovagerencia) {
			validaComentario(observacao);			
		}
	}
	
	if (numState == ger_projeto) {

		if (nextState == inicio || nextState == inicio_ || nextState == gerencia) {
			validaComentario(observacao);			
		}
	}
	
	var attachments = hAPI.listAttachments();
	log.info("anexo" + attachments.size());
	
	for(var id=0;id<attachments.size();id++){
		
		var attachment  = attachments.get(id);
        var docId		= attachment.getDocumentId();
        var docVersion	= attachment.getVersion();
        var docDesc		= attachment.getDocumentDescription();
        //var id			= docDesc.substring(10);

        log.info("anexo "+ id +" documentId >> "+ attachment.getDocumentId());
        log.info("anexo "+ id +" version >> "+ attachment.getVersion());
        log.info("anexo "+ id +" documentDescription >> "+ attachment.getDocumentDescription());        
        //log.info("ID >> "+ id);
        
		
    	hAPI.setCardValue("dc_"+ docDesc, docId);
        hAPI.setCardValue("vr_"+ docDesc, docVersion);
	}
	
}


/*
 * Função responsável por validar o preenchimento do campo observação.
 */
function validaComentario(observacao){
	
	log.info("<<< beforeTaskSave - Formulario Abertura de vaga - validaComentario() "+ observacao);
	
	if (observacao == "") {
		
		throw "É obrigatório adicionar o complemento na aba complementos devido a reprovação" ;
	}
}