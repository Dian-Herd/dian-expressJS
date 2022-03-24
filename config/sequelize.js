const {Sequelize} = require('sequelize');
const sequelize = new Sequelize({
    database : 'dn-cruds',
    host : 'localhost',
    username : 'root',
    password : 'rahasia',
    dialect : 'mysql'
});

sequelize.sync();

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established succesfully');
    } catch(error){
        console.error('Unable to connect to the database :', error);
    }
})();

module.exports = sequelize;
