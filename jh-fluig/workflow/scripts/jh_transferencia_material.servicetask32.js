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
				EMPRESA: String(hAPI.getCardValue("empresaCodigo")),
				FILIAL: String(hAPI.getCardValue("filialCodigo")),
				PROCESSINSTANCEID: 'FLUIG' + String(hAPI.getCardValue('processInstanceId')),
				PRODUCTS: materiais
			}
		}

		log.info(JSON.stringify(data));

		var vo = clientService.invoke(JSON.stringify(data));

		if (vo.getResult() == null || vo.getResult().isEmpty()) {
			log.info("[WSTRANSFEREMATERIAL] ===========> Retorno está vazio");
		} else {

			log.info(vo.getResult());

			var json = JSON.parse(vo.getResult());

			if (json.errorMessage) {

				log.info(json.errorMessage);

				if (json.errorMessage.message) {
					throw json.errorMessage.message;
				}

				throw json.errorMessage;
			}

			if (json.sucessMessage) {
				log.info(json.sucessMessage);
			} else {
				if (json.message) {
					throw json.message;
				} else {
					throw "Ocorreu um erro na integração."
				}

				// throw json.errorMessage;
			}
		}


	} catch (error) {
		log.error(error);
		throw error;
	}
}