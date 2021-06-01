const router = require('express').Router();

const {
    getList,
    getGame,
    createGame,
    deleteGame,
    updateGame
} = require('../controllers/game')

router.get('/getList', async (req, res) => {
    console.log('====================================');
    console.log('testroute');
    console.log('====================================');
    try {
        let result =  await getList();
        console.log('rot', result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
);

router.get('/getGame/:id', function (req, res) {
    const id = req.params.id;
    getGame(res, id);
});

router.post('/createGame', function (req, res) {
    const name = req.body.name;
    const address = req.body.address;
    const gameDate = req.body.gameDate;
    const gameGroupList = req.body.gameGroupList;
    let params = {
        name,
        address,
        gameDate,
        gameGroupList
    }
    createGame(res, params);
});

router.post('/deleteGame/:id', function (req, res) {
    const id = req.params.id;
    deleteGame(res, id);
});

router.post('/updateGame/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const address = req.body.address;
    const gameDate = req.body.gameDate;
    const gameGroupList = req.body.gameGroupList;
    let params = {
        id,
        name,
        address,
        gameDate,
        gameGroupList
    }
    updateGame(res, params);
})

module.exports = router;