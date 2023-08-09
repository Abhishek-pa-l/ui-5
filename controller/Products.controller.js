sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.manageproducts.controller.Products", {
            onInit: function () {
                
                let data = [
                    
                    {
                        "ProductId": "100",
                        "Product": "Sugar",
                        "Quantity": "200 KG",
                        "Supplier": "AB Sugar Mills",
                        "OrderDate": "01-06-2023",
                        "NeedUrgent": "Yes",
                        "StoreWarehouse": "Warehouse"
                    },
                    {
                        "ProductId": "200",
                        "Product": "TATA TEA",   
                        "Quantity": "20 Box",
                        "Supplier": "DC Tea Plant",
                        "OrderDate": "01-06-2023",
                        "NeedUrgent": "Yes",
                        "StoreWarehouse": "Store"
                    },
                    {
                        "ProductId": "300",
                        "Product": "Tomato Sauce",
                        "Quantity": "30 Box",
                        "Supplier": "TC Sauces",
                        "OrderDate": "01-06-2023",
                        "NeedUrgent": "No",
                        "StoreWarehouse": "Store"
                    }
                ];

                let mylocaljsonModel = new sap.ui.model.json.JSONModel(data);
                this.getView().setModel(mylocaljsonModel,"mylocaljsonModel");
            },
            onBeforeRendering: function () {
            },
            onAfterRendering: function () {
                let myModel = this.getView().getModel("mylocaljsonModel");
                let OldData = myModel.getData();
                sap.ui.getCore().byId(this.createId("l8")).setText("Items ("+OldData.length+")");
            },
            onExit: function () {

            },

            onAddButton: function () {
                
                let productIdEntry = this.getView().byId("ProductId").getValue();
                let productNameEntry = this.getView().byId("ProductNameId").getValue();
                let supplierNameEntry = this.getView().byId("SupplierNameId").getValue();
                let quantityEntry = this.getView().byId("QuantityId").getValue();
                let dateEntry = this.getView().byId("DateId").getValue();
                let urgentEntry = this.getView().byId("UrgentId").getSelectedKey();
                let whereEntry = this.getView().byId("GroupA").getSelectedIndex();

                if (productIdEntry == "") {
                    alert("Please enter the product ID");
                    return;
                }
                if (quantityEntry == "") {
                    alert("Please enter the quantity");
                    return;
                }
                if (whereEntry == 0){
                    whereEntry = "Warehouse"
                }
                if (whereEntry == 1){
                    whereEntry = "Store"
                }
                let myNewData = {
                    
                    "ProductId": productIdEntry,
                    "Product":productNameEntry,
                    "Supplier": supplierNameEntry,
                    "Quantity": quantityEntry,
                    "OrderDate": dateEntry,
                    "NeedUrgent": urgentEntry,
                    "StoreWarehouse": whereEntry
                    
                }

                let myModel = this.getView().getModel("mylocaljsonModel");
                let OldData = myModel.getData();
                OldData.push(myNewData);
                myModel.setData(OldData);
                myModel.refresh();

                //alert(data.getSize());
                sap.ui.getCore().byId(this.createId("l8")).setText("Items ("+OldData.length+")");
            },
            onCancel:function(){
                
                this.getView().byId("ProductId").setValue("");
                this.getView().byId("ProductNameId").setValue("");
                this.getView().byId("SupplierNameId").setValue("");
                this.getView().byId("QuantityId").setValue("");
                this.getView().byId("DateId").setValue("");
                this.getView().byId("UrgentId").setSelectedItem(null);
                this.getView().byId("WarehouseId").setSelected(false);
                this.getView().byId("StoreId").setSelected(false);
            },
            onDelete:function(){
                let myModel = this.getView().getModel("mylocaljsonModel");
                let OldData = myModel.getData();

                var oTable = this.getView().byId("t1");
                var oRow = oTable.getSelectedItem();
                var oEntry = oRow.getBindingContext("mylocaljsonModel").getObject();              
                var index = OldData.indexOf(oEntry);

                OldData.splice(index, 1);
                myModel.setData(OldData);
                myModel.refresh();

                sap.ui.getCore().byId(this.createId("l8")).setText("Items ("+OldData.length+")");
            }
        });
    });
