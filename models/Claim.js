const mongoose = require('mongoose');



const claimSchema = new mongoose.Schema({
  marticule:{
    type:String,
    required: true
  }
  ,
  matiere: {
    type: Object,
    required: true
  },
  commentaire: {
    type: String,
    required: true
  }
  ,
  dateInserted: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Claim', claimSchema);
