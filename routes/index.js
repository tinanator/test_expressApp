const express = require('express');
const router = express.Router();
const Joi = require('joi')


/* GET home page. */

router.get('/', (req, res, next)=>{
   res.render("index")
});


// router.route('/login')
//     .get((req, res) => {
//       res.render('login', { title: 'Hey' });
//     })
//     .post(async (req, res, next) => {
//         try {
//             const result = Joi.validate(req.body, userSchema)
//
//         }
//         catch (e) {
//             //TODO
//         }
//     })


router.post('/', function(req, res, next) {
  res.render('index', { title: 'Hey' })
});

module.exports = router;
