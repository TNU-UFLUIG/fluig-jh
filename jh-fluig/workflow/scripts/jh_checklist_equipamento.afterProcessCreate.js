function afterProcessCreate(processId) {
  hAPI.setCardValue("processInstanceId", processId);
  hAPI.setCardValue("requestDate", new Date().getTime());
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '$' + s4() + '$' + s4() + '$' + s4() + '$' + s4() + s4() + s4();
}