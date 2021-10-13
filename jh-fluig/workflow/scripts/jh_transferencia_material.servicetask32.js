function servicetask32(attempt, message) {
	try {

		var clientService = fluigAPI.getAuthorizeClientService();

		var materiais = buscaMateriais();

		var data = {
			companyId: getValue("WKCompany") + '',
			serviceCode: 'WSREST',
			endpoint: '/WSTRANSFEREMATERIAL',
			method: 'post',
			params: {
				PROCESSINSTANCEID: 'FLUIG' + String(hAPI.getCardValue('processInstanceId')),
				PRODUCTS: materiais
			}
		}

		var vo = clientService.invoke(JSON.stringify(data));

		if (vo.getResult() == null || vo.getResult().isEmpty()) {
			log.info("[WSTRANSFEREMATERIAL] ===========> Retorno está vazio");
		} else {

			log.info(vo.getResult());

			// var json = JSON.parse(vo.getResult());

			// if (json.CMESSAGE == null) {
			// 	dataset.addRow([json.errormessage]);
			// } else {
			// 	dataset.addRow([json.CMESSAGE]);
			// }
		}


	} catch (error) {
		log.error(error);
		throw error;
	}
}