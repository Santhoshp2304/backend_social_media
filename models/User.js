const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{type : String, require : true, unique : true},
    password :{ type : String, reuire : true},
    email : {type : String, require : true, unique : true},
    visiblity : {type : String, enum:['public', 'private'], default : 'public'},
    followers : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
    following : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
    friends : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
    friendRequests : [{type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
},{
    timestamps : true
});


module.exports = mongoose.model('User',userSchema);