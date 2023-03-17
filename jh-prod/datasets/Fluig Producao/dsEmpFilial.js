function defineStructure() {
	                        
	addColumn("empresa");   
	addColumn("filial");   
	addColumn("filialDesc");   
	addColumn("descFilial");
	addColumn("endereco");  

	setKey([ "empresa", "filial","filialDesc","descFilial","endereco"]);
	
	addIndex([ "empresa" ]);
    addIndex([ "filial" ]);
    addIndex([ "filialDesc" ]);
    addIndex([ "descFilial" ]);
}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
	
	log.info("<<< DATASET EMPRESA / FILIAL - dsEmpFilial");
	
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("empresa");
	newDataset.addColumn("filial");
	newDataset.addColumn("filialDesc");
	newDataset.addColumn("descFilial");
	newDataset.addColumn("endereco");
	var descFilial = "";
	var servico = ServiceManager.getService("WSIPFLUIG");
	var serviceHelper = servico.getBean();
	var service = serviceHelper.instantiate('fluig.WSIPFLUIG'); 
	var request = service.getWSIPFLUIGSOAP();	
	
	if (constraints != null) {
		
		log.info("<<< CONSTRAINT " + constraints.length.toString());
		
		for (var i = 0; i < constraints.length; i++) {
			
			log.info("<<< CONSTRAINT fieldName " + constraints[i].fieldName);
			log.info("<<< CONSTRAINT initialValue " + constraints[i].initialValue);
			
            if (constraints[i].fieldName == "sqlLimit") { 
                 
            }

            if (constraints[i].fieldName == "descFilial") {
            	descFilial = constraints[i].initialValue;
            }

        }
	}
	retorno = request.getempfil(descFilial);	
	
	var array = retorno.getWSGETFILIAIS();
	var endereco = "";
	
	if (array.size() > 0){
		for(var i = 0 ;i < array.size(); i++){
			endereco = array.get(i).getCENDERECOCOBRANCA() + " - " + array.get(i).getCCIDADECOBRANCA() + " - " + array.get(i).getCESTADOCOBRANCA();
			filialDesc = array.get(i).getCCODIGOFILIAL() + " - " + array.get(i).getCNOMEFILIAL();
			if (array.get(i).getCCODIGOEMPRESA() != "51") {
			 
			newDataset.addRow(new Array(
					array.get(i).getCCODIGOEMPRESA(),
					array.get(i).getCCODIGOFILIAL(),
					filialDesc,
					array.get(i).getCNOMEFILIAL(),
					endereco
					));
			}
		}
	}
	return newDataset;
}
function onMobileSync(user) {

}