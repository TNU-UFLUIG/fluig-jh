function getParams(form) {
  const Params = {};
  Params.formMode = String(form.getFormMode());
  Params.edit = Params.formMode == 'ADD' || Params.formMode == 'MOD';
  Params.numState = String(parseInt(getValue('WKNumState')));
  Params.etapa = 'inicio';
  Params.user = String(getValue('WKUser'));
  Params.mobile = form.getMobile();
  Params.companyId = form.getCompanyId();
  Params.managerMode = getValue("WKManagerMode") == 'true';

  log.info(`getValue("WKManagerMode") = ${getValue("WKManagerMode")}`)

  Params.atividades = {
    inicio: [6],
    destinarMaterial: [7],
    analisarErros: [34],
    integrarSolicitacao: [32]
  };

  for (var atividade in Params.atividades) {
    if (Params.atividades[atividade].indexOf(parseInt(getValue('WKNumState'))) > -1) {
      Params.etapa = atividade;
    }
  }

  if (!Params.edit) {
    Params.etapa = 'consulta';
  }

  return Params;
}