
import Datastore from 'nedb';

class Storage {
    constructor(){
        this.db = new Datastore();
        this.db.loadDatabase(function(err){
            if(err){
                console.log('Storage::constructor() -- Error loading the database.');
                return;
            }
        })
    }

    insert(data, callback){
        this.db.insert(data, function(err, newData){
            if(err){
                console.log('Storage::insert() -- Error inserting into database.');
                return;
            }
            callback(newData);
        });
    }

    find(query, callback){
        this.db.find(query, function(err, docs){
            if(err){
                console.log('Storage::find() -- Error performing find operation.');
                return;
            }
            callback(docs);
        });
    }
}