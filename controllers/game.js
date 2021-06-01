const sql = require('../sql/game.sql');

let getList = async () => {
    console.log('getList');
    try {
        // call db
        let data = await sql.getList();
        console.log('getList-con',data);
        return data
    } catch (error) {
        console.log(error);
        return error
    }
}

let getGame = (res, id) => {
    // call db
    let data = sql.getGame(id);
    console.log(data);
    res.status(200).send(data);
}

let createGame = (res, params) => {
    params.gameDate = new Date(params.gameDate).toLocaleString("zh-TW");
    params.createDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toLocaleString("zh-TW");
    // params.gameDate = '2021-05-03 08:00:00';
    // params.createDate = '2021-05-03 08:00:00';
    params.gameGroupList = JSON.stringify(params.gameGroupList);
    params.isDelete = false,
    params.flag = false,
    console.log(params);
    params = `'${params.name}', '${params.address}', '${params.gameDate}', '${params.createDate}', '${params.gameGroupList}'`
    // call db
    let data = sql.createGame(params);
    console.log('data', data);
    res.status(200).send(data);
}

let deleteGame = (res, id) => {
    // call db
    let data = sql.deleteGame(id);
    console.log(data);
    res.status(200).send(data);
}

let updateGame = (res, params) => {
    params.isDelete = false,
    params.flag = false,
    params.gameGroupList = JSON.stringify(params.gameGroupList);
    params.gameDate = new Date(params.gameDate).toLocaleString("zh-TW");
    params.body = `'${params.id}', '${params.name}', '${params.address}', '${params.gameDate}', '${params.gameGroupList}'`
    let data = sql.updateGame(params);
    console.log(data);
    res.status(200).send(data);
}

module.exports = {
    getList,
    getGame,
    createGame,
    deleteGame,
    updateGame
}