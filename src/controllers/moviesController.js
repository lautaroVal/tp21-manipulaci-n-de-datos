const db = require('../database/models');
const sequelize = db.sequelize;
const moment = require('moment')
const {validationResult} = require('express-validator');

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {       
            db.Genre.findAll({
                order: ['name']
            })
            .then(genres=> res.render('moviesAdd', {genres}))
            .catch(error=>console.log(error))

    },
    create: function (req, res) {
        // TODO
        const errors = validationResult(req);
        if(errors.isEmpty()){
        const {title,release_date,awards,length,rating,genre} = req.body;
        db.Movie.create({
            title: title.trim(),
            release_date,
            awards,
            length,
            rating,
            genre_id : genre
        }).then(movie => {
            console.log(movie)
            return res.redirect('/movies')
        }).catch(error => console.log(error))
    }else{
        db.Genre.findAll({
            order: ['name']
        })
        .then(genres=> res.render('moviesAdd', {
            genres,
            errors: errors.mapped()
        }))
        .catch(error=>console.log(error))
    }
    },
    edit: function(req, res) {
        // TODO
        Movies.findByPk(req.params.id)
        .then(Movie => {
            return res.render('moviesEdit', {
                Movie,
                moment: moment
        })
        })

    },
    update: function (req,res) {
        // TODO
        const errors = validationResult(req);
        if(errors.isEmpty()){
        const {title,release_date,awards,length,rating,genre} = req.body;
        Movies.update({
            title: title.trim(),
            rating,
            length,
            awards,
            release_date,
            genre_id : genre
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(()=> res.redirect('/movies'))
        .catch((error)=> console.log(error))
    }else {
        Movies.findByPk(req.params.id)
        .then(Movie => {
            return res.render('moviesEdit', {
                Movie,
                moment: moment,
                errors: errors.mapped()
        })
        })
    }
    },
    delete: function (req, res) {
        // TODO
        Movies.findByPk(req.params.id)
        .then(Movie => res.render('moviesDelete', {Movie}))
        .catch((error)=> console.log(error))
    },
    destroy: function (req, res) {
        // TODO
        Movies.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => res.redirect('/movies'))
        .catch((error)=> console.log(error))
    }

}

module.exports = moviesController;