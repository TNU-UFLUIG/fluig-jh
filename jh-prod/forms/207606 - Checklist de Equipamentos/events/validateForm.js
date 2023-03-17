/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  var Errors = value(form, 'Errors');
  var Params = value(form, 'Params');

  var equipment = value(form, 'equipment');
  var horimetro = value(form, 'horimetro');
  var serie = value(form, 'serie');
  var cliente = value(form, 'cliente');
  var serieBateria = value(form, 'serieBateria');
  var serieCarregador = value(form, 'serieCarregador');

  var fields = getChildren(form, 'fields', ['field_field', 'field_value']);
  var images = getChildren(form, 'images', ['image_image', 'image_value', 'image_docDesc']);
  var checklist = getChildren(form, 'checklist', ['item_item', 'item_value']);

  if (!equipment || equipment == '') {
    Errors.push('Informe o equipamento');
  }
  if (!horimetro || horimetro == '') {
    Errors.push('Informe o horímetro');
  }
  if (!serie || serie == '') {
    Errors.push('Informe a série');
  }
  if (!cliente || cliente == '') {
    Errors.push('Informe o cliente');
  }
  // if (!serieBateria || serieBateria == '') {
  //   Errors.push('Informe a série da bateria');
  // }
  // if (!serieCarregador || serieCarregador == '') {
  //   Errors.push('Informe a série do carregador');
  // }

  if (fields.filter(function (f) {
    return !f.field_value || f.field_value == '';
  }).length > 0) {
    Errors.push('Preencha todos os campos');
  }
  if (images.filter(function (i) {
    return !i.image_value || i.image_value == '' || !i.image_docDesc || i.image_docDesc == '';
  }).length > 0) {
    Errors.push('Preencha todas as imagens');
  }
  if (checklist.filter(function (c) {
    return !c.item_value || c.item_value == '';
  }).length > 0) {
    Errors.push('Preencha todos os itens de checklist');
  }

  if (Errors && Errors.length > 0) {
    throw Errors.join('\n');
  }
}

function value(form, field, def) {
  return isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}

function getChildren(form, tablename, inputs) {
  var array = [];
  var indexes = form.getChildrenIndexes(tablename);
  for (var i = 0; i < indexes.length; i++) {
    var obj = {};
    for (var t = 0; t < inputs.length; t++) {
      obj[inputs[t]] = value(form, inputs[t] + '___' + indexes[i]);
    }
    array.push(obj);
  }
  return array;
}

var isJson = function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};