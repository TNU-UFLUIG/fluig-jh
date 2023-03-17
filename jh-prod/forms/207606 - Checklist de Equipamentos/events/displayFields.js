/*eslint-disable*/
/*jshint -W116 */
function displayFields(form, customHTML) {
  var Params = getParams(form);
  form.setValue('Params', JSON.stringify(Params));

  form.setShowDisabledFields(true);

  //LIB FLUIG

  var formMode = form.getFormMode();
  var state = getValue("WKNumState");
  var nextState = getValue("WKNextState");
  var complete = getValue("WKCompletTask");
  var user = getValue("WKUser");
  var locale = getValue("WKUserLocale");
  var mobile = form.getMobile();
  var nProcesso = getValue("WKNumProces");
  var processo = getValue("WKDef");

  customHTML.append("<script>");
  customHTML.append("		function getFormMode(){ return '" + formMode + "'};");
  customHTML.append("		function getMobile(){ return '" + mobile + "'};");
  customHTML.append("		function getWKNumState(){ return '" + state + "'};");
  customHTML.append("		function getWKUser(){ return '" + user + "'};");
  customHTML.append("		function getWKNumProces(){ return '" + nProcesso + "'};");
  customHTML.append("		function getProcess(){ return '" + processo + "'};");
  customHTML.append("		function getWKUserLocale(){ return '" + locale + "'};");
  customHTML.append("</script>");
}