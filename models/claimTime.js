const mongoose =require('mongoose');

const claimTimeSchema  = new mongoose.Schema({

duration: {
    type: String,
    required: true
}

});

module.exports = mongoose.model('claimTime', claimTimeSchema);