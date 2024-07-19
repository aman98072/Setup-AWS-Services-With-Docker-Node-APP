const { Sequelize } = require('sequelize');
const { mysqlConnection } = require('../../../env');

const dbConn = {};

const DBInit = async () => {
    try {
        const sequelize = new Sequelize(
            mysqlConnection.database,
            mysqlConnection.user,
            mysqlConnection.password, {
                host: mysqlConnection.host,
                dialect: mysqlConnection.dialect,
                logging(query) {
                    console.log('debug', query);
                },
            },
        );

        dbConn.Sequelize = Sequelize;
        dbConn.sequelize = sequelize;

        dbConn.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully : ');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const getConnection = async () => {
    if (Object.keys(dbConn).length === 0) {
        await DBInit();
    }

    return dbConn;
};

module.exports = {
    DBInit,
    getConnection,
    dbConn,
};
