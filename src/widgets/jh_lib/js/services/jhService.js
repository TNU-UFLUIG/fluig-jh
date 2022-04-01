angular.module('jh.services')
  .factory('jhService', ['$q', '$http', '$log', 'fluigService',
    ($q, $http, $log, fluigService) => ({

      getGroupChecklist: (documentid, fields) => {
        return fluigService.getDataset('jh_group_checklist', {
          documentid,
        }, fields);
      },
      getGroupItem: (documentid, fields) => {
        return fluigService.getDataset('jh_group_checklist', {
          documentid, tablename: 'checklist'
        }, fields);
      },
      getGroupFields: (documentid, fields) => {
        return fluigService.getDataset('jh_group_checklist', {
          documentid, tablename: 'fields'
        }, fields);
      },
      getFieldOptions: (documentid, fields) => {
        return fluigService.getDataset('jh_field_checklist', {
          documentid, tablename: 'options'
        }, fields);
      },
      getGroupImages: (documentid, fields) => {
        return fluigService.getDataset('jh_group_checklist', {
          documentid, tablename: 'images'
        }, fields);
      },
      getEquipment: (documentid, fields) => {
        return fluigService.getDataset('jh_equipment', {
          documentid,
        }, fields);
      },
      getGroupEquipment: (documentid, fields) => {
        return fluigService.getDataset('jh_equipment', {
          documentid, tablename: 'groups'
        }, fields);
      },
      getFieldChecklist: (documentid, fields) => {
        return fluigService.getDataset('jh_field_checklist', {
          documentid,
        }, fields);
      },
      getImageChecklist: (documentid, fields) => {
        return fluigService.getDataset('jh_image_checklist', {
          documentid,
        }, fields);
      },
      getItemChecklist: (documentid, fields) => {
        return fluigService.getDataset('jh_item_checklist', {
          documentid,
        }, fields);
      },
      getChecklistFields: (documentid, fields) => {
        return fluigService.getDataset('jh_item_checklist', {
          documentid, tablename: 'fields'
        }, fields);
      },
    })
  ]);
