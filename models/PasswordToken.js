const knex = require("../database/connection");
const User = require("./User");

class PasswordToken{
    async create(email){
       const user = User.findByEmail(email);
       if(user != undefined){
        try {
            const token = Date.now()
           await knex.insert({
                user_id: user.id,
                used: 0,
                token: token
            }).table("passwordtokens"); 
            return{status: true, token: token}
        } catch (error) {
            console.log(err);
            return {status: false, err: err}
        }
       }else{
        return {status: false, err: "O e-mail passado não existe no banco de dados!"}
       }
    }
}

module.exports = new PasswordToken();
