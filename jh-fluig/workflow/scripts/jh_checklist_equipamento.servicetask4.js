function servicetask4(attempt, message) {

  try {
    var fields = buscaCampos();
    var params = {
      empresa: "01",
      filial: "0101",
      maquina: String(getCardValueCustom("serie_i")),
      horimetro: String(getCardValueCustom("horimetro")),
      bateriainc: String(getCardValueCustom("serieBateria_i")),
      carregador: String(getCardValueCustom("serieCarregador_i"))
    }

    fields.forEach(function(field) {
      // params[field.fieldName] = field.fieldType == 'number' ? Number(field.value) : String(field.value);
      params[field.fieldName] = String(field.value);
    })

    log.info("<<< WSREST B.ATENDIMENTO - Array montado e Iniciando conexão");

    var clientService = fluigAPI.getAuthorizeClientService();

    log.info("<<< Recebeu clientService");

    var compID = getValue("WKCompany");

    log.info("<<< Recebeu compID");

    var data = {
      companyId: String(compID) + '',
      serviceCode: 'WSREST',
      endpoint: '/BASECHECK',
      method: 'post',
      timeoutService: '200',
      params: params
    }

    log.info(JSON.stringify(data));


    var vo = clientService.invoke(JSONUtil.toJSON(data));

    if (vo.getResult() == null || vo.getResult().isEmpty()) {

      var messagemErro = "Resultado da integração não encontrado. Informe o administrador do sistema";

      log.info("<<< WSREST B.ATENDIMENTO - Erro: " + messagemErro);

      throw messagemErro;

    } else {

      log.info("<<< WSREST B.ATENDIMENTO - Retorno: " + vo.getResult());

      var oRetorno = JSON.parse(vo.getResult());

      log.info("<<< WSREST B.ATENDIMENTO - oRetorno: " + oRetorno);

      if (oRetorno.errorMessage != null) {
        throw oRetorno.errorMessage;
      }

      log.info("<<< WSREST B.ATENDIMENTO - Passei ");

      if (oRetorno.LSUCCESS != null) {

        log.info("<<< WSREST B.ATENDIMENTO - oRetorno.lSuccess: " + oRetorno.LSUCCESS);

        if (oRetorno.LSUCCESS) {

          log.info("<<< WSREST B.ATENDIMENTO - Resultado: " + oRetorno.CMESSAGE);

          message = oRetorno.CMESSAGE;

          var aux = oRetorno.CCODEIDENT;

          log.info("<<< WSREST B.ATENDIMENTO - CCODIDENT: " + aux);

        } else {

          var erroRotAuto = oRetorno.CMESSAGE;

          log.info("<<< WSREST B.ATENDIMENTO - Erro de integração CMESSAGE: <br>" + erroRotAuto);

          throw erroRotAuto;
        }
      } else {

        if (oRetorno.message != null) {
          throw "Erro de comunicação com o Protheus: " + oRetorno.message + ". Informe o administrador do sistema";
        } else {
          throw "Erro de comunicação com o Protheus: Informe o administrador do sistema";
        }
      }
    }

  }
  catch (erro) {

    log.info("<<< WSREST B.ATENDIMENTO -  WS: " + erro);

    throw erro;
  }

  log.info("<<< WSREST B.ATENDIMENTO - Encerrado");
}

/*
  Retorna o valor do campo e gera o log.
*/

function getCardValueCustom(campo) {

  var valor = hAPI.getCardValue(campo);

  log.info("<<< WSREST B.ATENDIMENTO - getCardValueCustom: " + campo + " - " + valor);

  return valor;
}

