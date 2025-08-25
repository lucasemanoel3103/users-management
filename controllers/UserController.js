const User = require("../models/User")

class UserController{

    async index(req, res){

    }

    async create(req, res){
      const {email, name, password} = req.body;

      if(email ==undefined){
        res.status(403).json({err: "O e-mail é inválido!"});
        return;
      }


      const emailExists = await User.findEmail(email);      

      if(emailExists){
        res.status(406).json({err: "O e-mail já está cadastrado!"})
        return;
      }

      await User.new(email,password,name);

      res.status(201).json("Usuário Criado!");
    }
};

module.exports = new UserController();