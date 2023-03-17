/*eslint-disable*/
/*jshint -W116 */

function value(form, field, def) {
  return form.getValue(field) == "" ? null : isJson(form.getValue(field)) ? JSON.parse(form.getValue(field)) : def || form.getValue(field);
}

function getChildren(form, tablename, inputs) {
  var array = [];
  var indexes = form.getChildrenIndexes(tablename);
  for (var i = 0; i < indexes.length; i++) {
    var obj = {};
    for (var t = 0; t < inputs.length; t++) {
      obj[inputs[t]] = value(form, inputs[t] + "___" + indexes[i]);
    }
    array.push(obj);
  }
  return array;
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
function getDataset(name, campos, filtros, internal) {

  var constraints = new Array();

  if (!internal) {
    constraints.push(DatasetFactory.createConstraint('metadata#active', true, true, ConstraintType.MUST));
  }

  if (filtros) {
    filtros.forEach(function (filtro) {
      constraints.push(DatasetFactory.createConstraint(filtro.field, filtro.value, filtro.value, filtro.type || ConstraintType.MUST));
    });
  }

  var dataset = DatasetFactory.getDataset(name, null, constraints, null);
  var result = [];

  if (dataset.rowsCount > 0) {
    var _loop = function _loop() {
      var o = {};

      if (!campos) {
        campos = dataset.getColumnsName();
      }

      campos.forEach(function (campo) {
        o[campo] = dataset.getValue(i, campo);
      });

      result.push(o);
    };

    for (var i = 0; i < dataset.rowsCount; i++) {
      _loop();
    }
  }

  return result;
}