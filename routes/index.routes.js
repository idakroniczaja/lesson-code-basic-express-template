const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();


//home page

router.get('/', (req, res, next)=>{
  res.render('index')
})


// router.get('/profile', (req, res, next) => {
//     res.render("users/profile")
//   })

router.get('/profile', (req, res, next)=>{
    res.render('users/profile', {userInSession: req.session.currentUser})
  })
  
  

router.get('/plant-search', (req, res, next) => {
  axios
  .get (`https://trefle.io/api/v1/plants/search?token=${process.env.KEY_API}&q=${req.query.plantName}`)
  .then(response=>{
    const searchedPlant = response.data;
    console.log(`this is planst query ${searchedPlant}`)
    res.render("plantResult", { searchedPlant })
  })
  .catch(error=> {
    console.log(`error while searching by carbs ${error}`)
  });
});


router.get('/edible-search', (req, res, next) => {
  axios
  .get (`https://trefle.io/api/v1/species?token=${process.env.KEY_API}&filter[edible_part]=${req.query.ediblePlantPart}`)
  .then(response=>{
    const ediblePlantPart = response.data;
    console.log(`this is planst query ${ediblePlantPart}`)
    res.render("edibleResult", { ediblePlantPart })
  })
  .catch(error=> {
    console.log(`error while searching by carbs ${error}`)
  });
});


router.get('/details/:id', (req, res, next) => {
  axios
  .get (`https://trefle.io/api/v1/plants/${req.params.id}?token=${process.env.KEY_API}`)
  .then(response=>{
    const singlePlant = response.data;
    console.log(`this is single plant query ${singlePlant}`)

    res.render("details", { singlePlant })
  })
  .catch(error=> {
    console.log(`error while searching for plant ${error}`)
  });
});




module.exports = router;
