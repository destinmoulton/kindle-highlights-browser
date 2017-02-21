import path from "path";
import Datastore from 'nedb';
import { remote } from 'electron';
const { app } = remote;

const DB_PATH = path.join(app.getAppPath(), '.khb-nedb-storage');

/**
 * Uses nedb for storage: https://github.com/louischatriot/nedb
 */
export default class Storage {
    constructor(){
        console.log(DB_PATH);
        this.db = new Datastore({
            filename:DB_PATH
        });

        this.db.loadDatabase(function(err){
            if(err){
                console.log('Storage::constructor() -- Error loading the database.', err);
                return;
            }
        })
    }

    compactDataFile(){
        this.db.persistence.compactDatafile();
    }

    insert(data, callback){
        this.db.insert(data, (err, newData)=>{
            if(err){
                console.log('Storage::insert() -- Error inserting into database.', err);
                return;
            }
            this.compactDataFile();
            if (typeof callback === "function") {
                callback(newData);
            }
            return true;

        });
    }

    update(query, data, callback, updateOptions = {}){
        this.db.update(query, {$set:data}, updateOptions, (err)=>{
            if(err){
                console.log('Storage::update() -- Error updating database.', err);
                return;
            }
            this.compactDataFile();
            if (typeof callback === "function") {
                callback();
            }
            return true;

        });
    }

    find(query, callback){
        this.db.find(query, (err, docs)=>{
            if(err){
                console.log('Storage::find() -- Error performing find operation.', err);
                return;
            }
            if(typeof callback !=="function"){
                console.log('Storage::find() -- No callback provided.');
                return;
            }

            callback(docs);
        });
    }
}