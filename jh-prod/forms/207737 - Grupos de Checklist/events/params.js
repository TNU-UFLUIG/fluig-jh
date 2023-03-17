function getParams(form) {
  var Params = {};
  Params.formMode = String(form.getFormMode());
  Params.edit = Params.formMode == 'ADD' || Params.formMode == 'MOD';
  Params.user = String(getValue('WKUser'));
  Params.mobile = form.getMobile();
  Params.companyId = form.getCompanyId();

  return Params;
}