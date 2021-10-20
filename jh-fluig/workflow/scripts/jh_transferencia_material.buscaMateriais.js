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
        "DESTINATIONID": String(hAPI.getCardValue("material_destinoCod___" + i)),
        "DESTINATIONADDRESSID": String(hAPI.getCardValue("material_enderecoCod___" + i)),
        "QTY": Number(hAPI.getCardValue("material_qty___" + i) || 1)
      });
    }
  } while (PRODUCTID);

  return Materiais;
}
