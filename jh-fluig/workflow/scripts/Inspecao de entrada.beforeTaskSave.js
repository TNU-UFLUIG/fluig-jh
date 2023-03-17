function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var isComplete 				= getValue("WKCompletTask");
	var numState 				= getValue("WKNumState");
	var nextState				= getValue("WKNextState");
	var userId 					= getValue("WKUser");
	var observacao 				= getValue("WKUserComment");

	var inicio					= 0;
	var inicio_					= 4;
	var intergracao				= 16;
	var fim						= 10;
	
	log.info("<<< BEFORETASKSAVE - Chk Transpaleteira");
	log.info("<<< CONSTRAINT isComplete "+ isComplete);
	log.info("<<< CONSTRAINT numState "+ numState);
	log.info("<<< CONSTRAINT nextState "+ nextState);
	log.info("<<< CONSTRAINT userId "+ userId);

	log.info("<<< CONSTRAINT observacao "+ observacao);

	
	//if (numState == inicio || numState == inicio_){
		
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
		
		if (numState == inicio ||numState == inicio_) {

			if (nextState == intergracao) {
				hAPI.setCardValue("sol_data_f", getDate());
				hAPI.setCardValue("sol_hora_f", getTime());				
			}
		}
	//}
}

function getDate(){
	var currentTime 	= new Date();
	var month 			= currentTime.getMonth() + 1;
	var day 			= currentTime.getDate();
	var year 			= currentTime.getFullYear();

	str_dia = new String(day);
	str_mes = new String(month);

	if (str_dia.length < 2)
	str_dia = 0 + str_dia;
	if (str_mes.length < 2)
	str_mes = 0 + str_mes;

	return str_dia+"/"+str_mes+"/"+year;
}

function getTime(){
	var data = new Date();

	//obtem as horas, minutos e segundos
	var hour = data.getHours();
	var minutes = data.getMinutes();
	var seconds = data.getSeconds();

	//converte as horas, minutos e segundos para string
	str_hours = new String(hour);
	str_minutes = new String(minutes);
	str_seconds = new String(seconds);

	//se tiver menos que 2 digitos, acrescenta o 0
	if (str_hours.length < 2)
		str_hours = 0 + str_hours;
	if (str_minutes.length < 2)
		str_minutes = 0 + str_minutes;
	if (str_seconds.length < 2)
		str_seconds = 0 + str_seconds;

	return str_hours + ':' + str_minutes + ':' + str_seconds;
}