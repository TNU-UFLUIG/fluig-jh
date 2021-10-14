const campos = ['filial', 'codigo', 'descricao'];
const display = campos;

function defineStructure() {
  for (let i = 0; i < campos.length; i++) {
    addColumn(campos[i]);
  }

  setKey(['filial', 'codigo']);
  addIndex(['filial', 'codigo']);
}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
  return buscaDataset(fields, constraints, sortFields);
}

function onMobileSync(user) {

}

function buscaDataset(fields, constraints, sortFields) {
  /*$$ partials/varsProtheusSoap.js $$*/

  const dataset = DatasetBuilder.newDataset();
  for (var i = 0; i < campos.length; i++) {
    dataset.addColumn(campos[i]);
  }

  const params = getConstraints(constraints);
  let sql =
    `SELECT TOP 100 B1_FILIAL AS FILIAL, B1_COD AS CODIGO, B1_DESC  AS DESCRICAO FROM SB1010 WHERE D_E_L_E_T_ = ''  AND B1_MSBLQL != '1'`;

  if (params.codigo != '' && params.codigo != undefined) {
    sql = sql + " AND LOWER(B1_COD) LIKE LOWER('%" + params.codigo + "%')"
  }

  if (params.descricao != '' && params.descricao != undefined) {
    sql = sql + " AND LOWER(B1_DESC) LIKE LOWER('%" + params.descricao + "%')"
  }

  log.info(sql);

  const retorno = request.execquery(sql, empresa, filial, chave);
  var array = retorno.getCOLSFLD().getTABLEFIELDS();

  log.info("<<< ARRAY SIZE:" + array.size());

  if (array.size() > 0) {
    log.info("<<< POPULANDO DATASET");
    for (var i = 0; i < array.size(); i++) {
      dataset.addRow(new Array(
        array.get(i).getVALOR().getSTRING().get(0),
        array.get(i).getVALOR().getSTRING().get(1),
        array.get(i).getVALOR().getSTRING().get(2)
      ));
    }
  }

  return dataset;
}

/*$$ partials/getConstraintsParams.js $$*/
