const mongoose =require('mongoose');

const claimTimeSchema  = new mongoose.Schema({

duration: {
    type: String,
    required: true
},

dateInserted: { type: Date, default: Date.now }

});

module.exports = mongoose.model('claimTime', claimTimeSchema);