const JogoDeBoliche = require('./JogoDeBoliche.js');

// Criação do objeto do jogo
const jogo = new JogoDeBoliche();

// Jogadas
jogo.Jogar(1);
jogo.Jogar(4);
// 5
jogo.Jogar(4);
jogo.Jogar(5);
// 14
jogo.Jogar(6);
jogo.Jogar(4);
// 29
jogo.Jogar(5);
jogo.Jogar(5);
// 49
jogo.Jogar(10);
// 60
jogo.Jogar(0);
jogo.Jogar(1);
// 61
jogo.Jogar(7);
jogo.Jogar(3);
// 77
jogo.Jogar(6);
jogo.Jogar(4);
// 97
jogo.Jogar(10);
// 117
jogo.Jogar(2)
jogo.Jogar(8)
jogo.Jogar(6)
// 133

const pontuacaoFinal = jogo.ObterPontuacao();

console.log(`Pontuação(retorno do método): ${pontuacaoFinal}`)