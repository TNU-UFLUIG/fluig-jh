function buscaCampos() {

  var i = 0;
  var Campos = [];
  var documentid;
  var field;

  do {
    i++;
    documentid = hAPI.getCardValue("field_documentid___" + i);
    field = JSON.parse(String(hAPI.getCardValue("field_field___" + i)));

    if (documentid && documentid !== '') {
      Campos.push({
        "documentid": String(documentid),
        "title": String(field.title),
        "fieldName": String(field.fieldName),
        "fieldType": String(field.fieldType),
        "value": String(hAPI.getCardValue("field_value___" + i))
      });
    }
  } while (documentid);

  return Campos;
}
