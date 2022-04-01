const campos = ['filial', 'codigo', 'armazem', 'endereco', 'qtde'];
const display = campos;

function defineStructure() {
  for (let i = 0; i < campos.length; i++) {
    addColumn(campos[i]);
  }

  setKey(campos);
  addIndex(campos);
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
    `SELECT BF_FILIAL, BF_PRODUTO, BF_LOCAL,  BF_LOCALIZ, BF_QUANT
    FROM SBF${params.empresa}0 
    WHERE BF_QUANT > 0 AND 
    BF_FILIAL = '${params.filial}'
    `;

  if (params.codigo != '' && params.codigo != undefined) {
    sql = `${sql} AND BF_PRODUTO = '${params.codigo}'`
  }

  log.info(sql);

  const retorno = request.execquery(sql, empresa, filial, chave);
  const array = retorno.getCOLSFLD().getTABLEFIELDS();

  log.info("<<< ARRAY SIZE:" + array.size());

  if (array.size() > 0) {
    log.info("<<< POPULANDO DATASET");
    for (var i = 0; i < array.size(); i++) {
      dataset.addRow(new Array(
        array.get(i).getVALOR().getSTRING().get(0),
        array.get(i).getVALOR().getSTRING().get(1),
        array.get(i).getVALOR().getSTRING().get(2),
        array.get(i).getVALOR().getSTRING().get(3),
        array.get(i).getVALOR().getSTRING().get(4),
      ));
    }
  }

  return dataset;
}

/*$$ partials/getConstraintsParams.js $$*/
