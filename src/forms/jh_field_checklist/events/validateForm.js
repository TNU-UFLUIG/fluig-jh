/*eslint-disable*/
/*jshint -W116 */
function validateForm(form) {
  const Errors = value(form, 'Errors');
  const Params = value(form, 'Params');

  const materiais = getChildren(form, 'materiais', ['material_produtoCod', 'material_destinoCod', 'material_enderecoCod']);

  materiais.forEach((material, index) => {
    if (Params.etapa == 'inicio') {
      if (!material.material_produtoCod || material.material_produtoCod == '') {
        Errors.push(`Informe o produto na linha ${index + 1}`);
      }
    }
    if (Params.etapa == 'destinarMaterial') {
      if (!material.material_destinoCod || material.material_destinoCod == '') {
        Errors.push(`Informe o destino na linha ${index + 1}`);
      }
      if (!material.material_enderecoCod || material.material_enderecoCod == '') {
        Errors.push(`Informe o endereço na linha ${index + 1}`);
      }
    }
  });

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
