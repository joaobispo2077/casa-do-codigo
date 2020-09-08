const { check, validationResult } = require('express-validator/check');

class Livro {
    static validations() {
        return [
            check('titulo').isLength({ min: 4 }).withMessage('O título deve possuir no mínimo 4 caracteres'),
            check('preco').isCurrency().withMessage('O preço precisa ter um valor monetário válido')
        ];
    }
}

module.exports = Livro;