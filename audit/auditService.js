var events = require("events");
var audit = require("../models/audit");
var queries = require("../db/queries");
var dbConnection = require("../db/connections");
var emitter = new events.EventEmitter();

const auditEvent = "audit";
emitter.on(auditEvent,  (audit) => {
    //steps of action - save into DB;
    console.log("AUDIT EVENT EMIITER - Audit :" + JSON.stringify(audit));
    try {
        values = [audit.auditAction, JSON.stringify(audit.data), audit.status, JSON.stringify(audit.error), audit.auditBy, audit.auditOn];
        var auditQuery = queries.queryList.AUDIT_QUERY;
         dbConnection.dbQuery(auditQuery,values);
    } catch (error) {
        console.log("AUDIT EVENT EMIITER - ERROR: " + error);
    }

});

exports.prepareAudit = (auditAction, data, error, auditBy, auditOn) => {
    let status = 200;
    if(error) status = 500;

    var auditObj = new audit.Audit(auditAction, data, status, error, auditBy, auditOn)
    emitter.emit(auditEvent, auditObj)
}