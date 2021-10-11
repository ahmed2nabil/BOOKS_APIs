var queries = require("../db/queries");
var dbConnection = require("../db/connections");
var util = require("../util/utility");
exports.getStoreList = async (req, res) => {
    try {
        var storeListQuery = queries.queryList.GET_STORE_LIST_QUERY;
       var result = await dbConnection.dbQuery(storeListQuery);
        return res.status(200).send(JSON.stringify(result));
    }
    catch(e) {
        console.log("Error: ", e);
        return res.status(500).send({error : 'Failed to list store'})
    }
}

exports.saveStore = async (req,res) => {
    try {
        var createdOn = new Date();
        var createdBy = 'admin';
        //body 
        var storeName= req.body.storeName;
        var storeAddress = req.body.storeAddress;
        if(!storeName || !storeAddress) {
            return res.status(500).send({error : "store name and address are required"});
        }
        let storeCode = util.generateStoreCode();
        var saveStoreQuery = queries.queryList.SAVE_STORE_QUERY;
        values = [storeCode, storeName, storeAddress, createdBy, createdOn];
        var result = await dbConnection.dbQuery(saveStoreQuery,values);
        return res.status(201).send("Store Created Successfully") ;       
    } catch (err) {
        console.log("Error: ", e);
        return res.status(500).send({error : 'Failed to create store'})
    }

}