/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const Params = value(form, 'Params');

  const equipment = value(form, 'equipment');
  const horimetro = value(form, 'horimetro');
  const serie = value(form, 'serie');
  const cliente = value(form, 'cliente');
  const serieBateria = value(form, 'serieBateria');
  const serieCarregador = value(form, 'serieCarregador');

  const fields = getChildren(form, 'fields', ['field_field', 'field_value']);
  const images = getChildren(form, 'images', ['image_image', 'image_value', 'image_docDesc']);
  const checklist = getChildren(form, 'checklist', ['item_item', 'item_value']);

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

  if (fields.filter(f => !f.field_value || f.field_value == '').length > 0) {
    Errors.push('Preencha todos os campos');
  }
  if (images.filter(i => !i.image_value || i.image_value == '' || !i.image_docDesc || i.image_docDesc == '').length > 0) {
    Errors.push('Preencha todas as imagens');
  }
  if (checklist.filter(c => !c.item_value || c.item_value == '').length > 0) {
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
  const array = [];
  const indexes = form.getChildrenIndexes(tablename);
  for (let i = 0; i < indexes.length; i++) {
    const obj = {};
    for (let t = 0; t < inputs.length; t++) {
      obj[inputs[t]] = value(form, `${inputs[t]}___${indexes[i]}`);
    }
    array.push(obj);
  }
  return array;
}

const isJson = function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
