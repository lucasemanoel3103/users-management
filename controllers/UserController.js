const { default: knex } = require("knex");
const User = require("../models/User");

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  }

  async create(req, res) {
    const { email, name, password } = req.body;

    if (email == undefined) {
      res.status(403).json({ err: "O e-mail é inválido!" });
      return;
    }

    const emailExists = await User.findEmail(email);

    if (emailExists) {
      res.status(406).json({ err: "O e-mail já está cadastrado!" });
      return;
    }

    await User.new(email, password, name);
    res.status(201).json("Usuário Criado!");
  }

  async findUser(req, res){
    const id = req.params.id;
    const user = await User.findById(id);
    if(user == undefined){
      res.status(404).json({});
    }else{
      res.status(200).json(user);
    }
  }

  async edit(req, res){
    const {id, name, role, email} = req.body;
    const result = await User.update(id, email, name, role);
    if(result != undefined){
      if(result.status){
        res.status(200).json({message: "Tudo Ok!"})
      }else{
        res.status(406).json(result.err)
      }
    }else{
      res.status(406).json({error: "Ocorreu um erro no servidor!"});
    }
  }

  async remove(req, res){
    const id = req.params.id;
    const result = await User.delete(id);

    if(result.status){
      res.status(200).json("Tudo Ok!");
    }else{
      res.status(406).json(result.err);
    }
  }
}

module.exports = new UserController();
