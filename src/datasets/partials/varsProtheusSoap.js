var filCodigo = '';
var filtro = '';
var empresa = "01";
var filial = "0101";
var codigo = "FN386452";
var chave = "2fb7d3d778fba4129c71bd050097cc32";

// var servico = ServiceManager.getService("wsipfluig");
// var serviceHelper = servico.getBean();
// var service = serviceHelper.instantiate('fluig.WSIPFLUIG');
// var request = service.getWSIPFLUIGSOAP();

var provider = ServiceManager.getServiceInstance("wsipfluig");
var locator = provider.instantiate("fluig.WSIPFLUIG");
var service = locator.getWSIPFLUIGSOAP();
var properties = {};
properties["receive.timeout"] = "0";
var request = provider.getCustomClient(service, "fluig.WSIPFLUIGSOAP", properties);
