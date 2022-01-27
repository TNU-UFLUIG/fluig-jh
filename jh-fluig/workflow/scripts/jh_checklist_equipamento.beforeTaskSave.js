function beforeTaskSave(colleagueId, nextSequenceId, userList) {

  var attachments = hAPI.listAttachments();

  log.info("anexo" + attachments.size());

  for (var id = 0; id < attachments.size(); id++) {

    var attachment = attachments.get(id);
    var docId = attachment.getDocumentId();
    var docVersion = attachment.getVersion();
    var docDesc = attachment.getDocumentDescription();
    //var id			= docDesc.substring(10);

    log.info("anexo " + id + " documentId >> " + attachment.getDocumentId());
    log.info("anexo " + id + " version >> " + attachment.getVersion());
    log.info("anexo " + id + " documentDescription >> " + attachment.getDocumentDescription());
    //log.info("ID >> "+ id);

    var images = getImages();
    var image = images.filter(function (img) {
      return img.docDesc == docDesc && !img.docId;
    })[0]

    if (image) {
      hAPI.setCardValue("image_docId___" + image.seq, docId);
      hAPI.setCardValue("image_docVersion___" + image.seq, docVersion);
    }
  }
}
