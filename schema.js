
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/*
 * UserSchema
 */

var UserSchema = new Schema({
    name : {
        nick  : {
            type  : String,
            index : {unique: true}
        },
        first : String,
        last  : String
    },
    mail : {
        type     : String,
        required : true,
        index    : {
            unique : true,
            sparse : true
        }
    }
});

/*
 * LineSchema
 */

var LineSchema = new Schema({
    text   : {
        type  : String,
        index : true
    },
    date   : Date,
    author : ObjectId
});

/*
 * TaleSchema
 */

var TaleSchema = new Schema({
    title  : { type: String, index: true },
    date   : Date,
    author : ObjectId,
    lines  : [LineSchema]
});

/*
 * Define models
 */

var User = mongoose.model('User', UserSchema),
    Line = mongoose.model('Line', LineSchema),
    Tale = mongoose.model('Tale', TaleSchema);

/*
 * Export definitions
 */

module.exports = {
    User: User,
    Line: Line,
    Tale: Tale
};