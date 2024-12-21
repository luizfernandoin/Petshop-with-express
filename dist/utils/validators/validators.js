"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCNPJ = isValidCNPJ;
function isValidCNPJ(cnpj) {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjRegex.test(cnpj);
}
