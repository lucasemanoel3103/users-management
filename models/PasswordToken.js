const knex = require("../database/connection");
const User = require("./User");

class PasswordToken{
    async create(email){
       const user = await User.findByEmail(email);
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
            console.log(error);
            return {status: false, error: error}
        }
       }else{
        return {status: false, err: "O e-mail passado não existe no banco de dados!"}
       }
    }

    async validate(token){
        try {
            const result = await knex.select().where({token: token}).table("passwordtokens");

            if(result.length > 0){
                var tk = result[0];

                if(tk.used){
                    return {status: false};
                }else{
                    return {status: true, token: tk};
                }
            }else{
                return false
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("passwordtokens");
    }
}

module.exports = new PasswordToken();
