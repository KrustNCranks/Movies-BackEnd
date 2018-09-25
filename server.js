import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

import Movie from './models/movies';

const app = express();
const router = express.Router();


/**
 * Usage of CORS ( Cross Origin Resource Sharing)
 */
app.use(cors());

/**
 * Usage of the body parser
 */
app.use(bodyParser.json());



/**
 * mongoose connection
 */
mongoose.connect('mongodb://localhost/Movies_Test');
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB connected to the Movies Database');
});

/**
 * This is used to GET all the movies
 */
router.route('/movies').get((req,res)=>{
    Movie.find((err, movies)=>{
        if(err)
            console.log(err);
        else
            res.json(movies)
    });
});

/**
 * This is used to GET specific issues
 */
router.route('/movies/:id').get((req, res)=>{
    Movie.findById(req.params.id, (err, movies)=>{
        if(err)
            console.log(err);
        else
            res.json(movies);
    });
});

/**
 * This is used to POST Movies
 */
router.route('/movies/add').post((req,res)=>{
    let movie = new Movie(req.body);
    movie.save()
        .then(movie =>{
            res.status(200).json({
                'Movie': 'Added Successfully',
                'result': movie
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(400).send('Failed to create a new record')
        })
})

/**
 * This is used to UPDATE a specific ID
 */
router.route('/movies/update/:id').post((req, res)=>{
    Movie.findById(req.params.id, (err, movie)=>{
        if(!movie){
            return next(new Error('Could not load document'));
        }
        else{
            movie.voteCount = req.body.voteCount;
            movie.video = req.body.video;
            movie.vote_average = req.body.vote_average;
            movie.title = req.body.title;
            movie.popularity = req.body.popularity;
            movie.poster_path = req.body.poster_path;
            movie.original_language = req.body.original_language;
            movie.original_title = req.body.original_title;
            movie.genre_ids = req.body.genre_ids;
            movie.adult = req.body.adult;
            movie.overview = req.body.overview;
            movie.release_date = req.body.release_date;

            movie.save().then(movie =>{
                res.json('Update Done!');
            }).catch(err => {
                res.status(400).send('Update Failed');
            });
        }
    });
});

/**
 * This is used to DELETE the specific ID
 */
router.route('/movies/delete/:id').get((req, res)=>{
    Movie.findByIdAndRemove({_id: req.params.id}, (err,movie) =>{
        if(err)
            res.json(err);
        else
            res.json('Removed successfully');
    })
})

app.use('/',router);

/**
 * This activates the server
 */
app.listen(4000, () => console.log('Server is Activated'))