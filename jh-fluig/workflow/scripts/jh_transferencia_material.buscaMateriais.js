function buscaMateriais() {

  var i = 0;
  var Materiais = [];
  var PRODUCTID;

  do {
    i++;
    PRODUCTID = hAPI.getCardValue("material_produtoCod___" + i);
    if (PRODUCTID && PRODUCTID !== '') {
      Materiais.push({
        "PRODUCTID": String(PRODUCTID),
        "DESTINATIONID": String(hAPI.getCardValue("material_armazemDestCod___" + i)),
        "DESTINATIONADDRESSID": String(hAPI.getCardValue("material_enderecoDestCod___" + i)),
        "SOURCEID": String(hAPI.getCardValue("material_armazemOrig___" + i)),
        "SOURCEADDRESSID": String(hAPI.getCardValue("material_enderecoOrig___" + i)),
        "QTY": 1
      });
    }
  } while (PRODUCTID);

  return Materiais;
}
