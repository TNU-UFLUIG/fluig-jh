function getImages() {
  var processo = getValue("WKNumProces");
  var campos = hAPI.getCardData(processo);
  var contador = campos.keySet().iterator();
  var images = [];

  while (contador.hasNext()) {
    var id = contador.next();

    if (id.match(/image_documentid___/)) { // qualquer campo do Filho
      // var campo = campos.get(id);
      var seq = id.split("___");
      var docDesc = campos.get("image_docDesc___" + seq[1]);
      var docId = campos.get("image_docId___" + seq[1]);
      var docVersion = campos.get("image_docVersion___" + seq[1]);

      images.push({
        seq: seq[1],
        docDesc: docDesc,
        docId: docId,
        docVersion: docVersion
      })
    }
  }

  return images;
}