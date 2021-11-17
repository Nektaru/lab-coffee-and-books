const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//1. Instrucciones: Adaptar el modelo a GEOJson
const placeSchema = new Schema({
  name: String,
  type: String,

  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }

});

placeSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('Place', placeSchema);