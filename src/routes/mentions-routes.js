const express = require('express');
const router = express.Router();
const mentionsController = require('../controllers/mentions-controller');

//<T2
/*Agora vamos importar o check do express-validator, no nosso mentions-router.js e 
adicionar suas validações na hora do POST check(nome do campo do boyd).validação.*/
const { check } = require('express-validator');

router.get('/', mentionsController.listMentions);



router.post('/' , [
    check('friend').isLength({ min: 4 }).withMessage("O nome precisa ter no mínimo 4 caracteres."),
    check('mention').isLength({ min: 10, max: 280 }).withMessage("A menção precisa ter no mínimo 10 caracteres e no máximo 280.")
], mentionsController.createMention); 

//<T2

/*E no nosso mentions-controller.js vamos importar o validationResult e 
no createMention vamos utilizar essa função para retornar um erro, caso o 
usuário tenha cometido um engano */
const { validationResult } = require('express-validator');
const repository = require('../repositories/mentions-repository');

console.log("P3");
// create
exports.createMention = async (req, res) => {
  const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }

  try {
    await repository.createMention({
      friend: req.body.friend,
      mention: req.body.mention
    });
    return res.status(201).send({message: 'Menção cadastrada com sucesso!'});
  } catch (e) {
    return res.status(500).send({message: 'Falha ao cadastrar a menção.'});
  }
};

//Atualizar mention
//router.put('/:id', mentionsController.updateMention);
//Incluindo validação:
router.put('/:id', [
  check('friend').optional().isLength({ min: 4 }).withMessage("O nome precisa ter no mínimo 4 caracteres."),
  check('mention').optional().isLength({ min: 10, max: 280 }).withMessage("A menção precisa ter no mínimo 10 caracteres e no máximo 280.")
], mentionsController.updateMention);

module.exports = router;