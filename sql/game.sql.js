const connection = require("./connection").connection;

const getListSql = `SELECT * FROM game`
const getGameSql = `SELECT * FROM game WHERE id = ?`
const deleteGameSql = `DELETE FROM game WHERE id = ?`
// const updateGameSql = `INSERT INTO game (id, name, address, game_date, game_group_list) VALUES ?`

// const createGameSql = 'INSERT INTO game (name, address, game_date, game_group_list, create_date) VALUES?'

function getList () {
    return new Promise((resolve, reject) => {
        connection.query(getListSql, (err, result) => {
            if (err) {
                console.log('err: ', err);
                reject({code:1, msg: 'error', data: err});
            } if (result.length < 1) {
                reject({code:1, msg: 'no_data', data: result});
            } else {
                resolve({code:0, msg: 'success', data: result})
            }
        })
    })
}

function getGame (id) {
    connection.query(getGameSql, id, function (err, result) {
        if (err) {
            console.log('err: ', err);
            return({code:1, msg: err});
        }
        console.log(result, '12312312313');
        return({code:0, msg: 'success', data: result})
    })
}

function createGame (params) {
    connection.query(`INSERT INTO game (name, address, game_date, create_date, game_group_list) VALUES (${params})`, (err, result) => {
        if (err) {
            console.log('err', err);
        }
        console.log(result);
        return(result);
    })
}

function deleteGame (id) {
    connection.query(deleteGameSql, id, (err, result) => {
        if (err) {
            console.log('err', err);
        }
        // SQL DELETE 成功 results.affectedRows 會返回 1，反之 0
        console.log(result.affectedRows);
        return({code:0, msg: 'success', data: result})
    })
}

function updateGame (params) {
    console.log('params', params.id);
    // 使用 SQL 交易功能實現資料回滾，因為是先刪除資料在新增，且 Key 值須相同，如刪除後發現要新增的資料有誤，則使用 rollback() 回滾
    connection.beginTransaction(function (err) {
        if (err) throw err;
        connection.query(deleteGameSql, params.id, (err, result) => {
            console.log('----', result);
            if (result.affectedRows) {
                console.log('---',params.body);
                connection.query(`INSERT INTO game (id, name, address, game_date, game_group_list) VALUES (${params.body})`, function (err, result) {
                    // 請求不正確
                    if (err) {
                        console.log('rollback', err);
                        connection.rollback(function () {
                        });
                    } else {
                        connection.commit(function (err) {
                            if (err) {
                                console.log('err', err);
                            }
                            console.log(result);
                        });
                    }                        
                });
            } else {
                // 指定的資源已不存在
                console.log(err, '410');
            }
        });
    });
}

module.exports = {
    getList,
    getGame,
    createGame,
    deleteGame,
    updateGame
};