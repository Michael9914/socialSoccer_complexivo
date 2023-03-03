const mongoose = require('mongoose');
const chalk = require('chalk');

const dbConnection = async() => {

    try {
        await mongoose.connect( 'mongodb://localhost/angular-probando', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(chalk.bgGreen.black.bold('Base de datos conectada '));
        
    } catch (error) {
        console.log(chalk.bgRed.black.bold('Error al conectarse a la base de datos  ',error));
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}


module.exports = {
    dbConnection
}