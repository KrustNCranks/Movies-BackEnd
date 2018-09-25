const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

/**let genre_ids = new Schema({
    genres: {type: Number}
}); **/

let Movies = new Schema({
    voteCount: {type: Number},
    video:{type: String},
    vote_average: {type: SchemaTypes.Double},
    title: {type: String},
    popularity: {type: SchemaTypes.Double},
    poster_path: {type: String},
    original_language: {type: String},
    original_title: {type: String},
    genre_ids: {type: Array},
    adult: {type: String},
    overview: {type: String},
    release_date: {type: Date}
});

export default mongoose.model('Movies',Movies);