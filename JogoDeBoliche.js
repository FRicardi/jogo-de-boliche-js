class JogoDeBoliche {

  /**
   * Constrói os quadros com um objeto com valores vazios
   * e seta o primeiro quadro como o atual
   */
  constructor() {
    this.quadros = Array.from({length: 10}, () => {
      return {
        jogada1: null,
        jogada2: null,
        jogada3: null,
        strike: false,
        spare: false
      }
    });
    this.quadroAtual = 0;
  } 

  /**
  * Realiza uma jogada de um jogo de boliche
  * 
  * @param Int pinos
  * 
  */
  Jogar(pinos) {
    // Verifica se a jogada é válida
    if (!this.JogadaValida(pinos)) return;

    // Verifica se já foi realizada a primeira jogada do quadro
    if (this.quadros[this.quadroAtual].jogada1 === null) {
      this.quadros[this.quadroAtual].jogada1 = pinos;

      // Assinala strike, quando ocorrer
      if (pinos === 10) {
        this.quadros[this.quadroAtual].strike = true;
        
        // Em caso de strike, vai para o próximo quadro (a não ser que seja o décimo quadro)
        if (this.quadroAtual !== 9) this.quadroAtual++;
        
      }
    
    // Caso a primeira jogada já tenha sido realizada, verifica se pode assinalar os pontos na segunda
    } else if (this.quadros[this.quadroAtual].jogada2 === null) {
      this.quadros[this.quadroAtual].jogada2 = pinos;
      
      // Assinala spare, quando ocorrer
      if (this.quadros[this.quadroAtual].jogada1 + this.quadros[this.quadroAtual].jogada2 === 10){
        this.quadros[this.quadroAtual].spare = true;
      }

      // Sempre que passar pela segunda jogada, vai para o próximo quadro (a não ser que seja o décimo quadro)
      if (this.quadroAtual !== 9) {
        this.quadroAtual++;

      // Verifica se houve um spare no décimo quadro, caso haja, incrementa o quadro (encerra as entradas)
      } else if (!this.quadros[this.quadroAtual].spare){
        this.quadroAtual++;
      }

    // Verificará se a terceira jogada é nula somente caso seja o décimo quadro, já que será
    // a única condição para não avançar de quadro caso preencha as duas jogadas ou faça um strike
    } else if (this.quadros[this.quadroAtual].jogada3 === null) {
      this.quadros[this.quadroAtual].jogada3 = pinos;
      
      // Incrementa o quadro atual para que seja mostrado que não existem mais jogadas a serem realizadas
      this.quadroAtual++;
    }

  }

  /**
  * Valida a jogada atual
  * 
  * @param Int pinos
  * @return se a jogada é válida (true) ou inválida (false)
  * 
  */
  JogadaValida(pinos) {
    // Só podem ser jogados 10 quadros
    if (this.quadroAtual > 9) {
      console.log('Todas jogadas já foram realizadas!');
      return false;
    }

    // A quantidade de pinos não pode ser inferior a zero nem maior que 10
    if (pinos > 10 || pinos < 0) {
      console.log('Quantidade inválida de pinos.');
      return false;
    } 

    // Se houver uma primeira jogada, a soma da quantidade de pinos com a primeira jogada
    // não pode ser superior à 10
    if (this.quadros[this.quadroAtual].jogada1 && ((this.quadros[this.quadroAtual].jogada1 + pinos) > 10)){
      console.log({
        indiceQuadroAtual: this.quadroAtual,
        quadroAtual: this.quadros[this.quadroAtual],
        pinos
      })
      console.log('Quantidade de pinos maior do que o permitido');
      return false;
    }

    return true;

  }

  /**
   * Calcula a pontuação total do jogo e mostra a 
   * pontuação de cada quadro
   * 
   * @return pontuação total do jogo
   */
  ObterPontuacao() {
    let pontuacaoTotal = 0;

    console.log('---------Pontuação dos quadros---------');
    console.log('');
    for (let i = 0; i < 10; i++) {
      // Para cada quadro, adiciona à pontuação total o seu valor
      pontuacaoTotal += this.ObterPontuacaoDoQuadro(i);

      console.log(`Quadro ${i+1}: ${pontuacaoTotal}`);
      console.log('------------------');
    }

    console.log(`Pontuação total: ${pontuacaoTotal}`);

    return pontuacaoTotal;
  }

  /**
   * Calcula a pontuação de um quadro
   * 
   * @param Int indice
   * @return pontuação do quadro
   */
  ObterPontuacaoDoQuadro(indice) {
    const quadro = this.quadros[indice];
    
    // Cria a pontuação base (jogada1 + jogada2)
    const pontuacaoBase = (quadro.jogada1 ? quadro.jogada1 : 0) + (quadro.jogada2 ? quadro.jogada2 : 0);

    console.log(`Pontuação base do quadro: ${pontuacaoBase}`);
    console.log(`Jogada 1: ${quadro.jogada1}`)
    console.log(`Jogada 2: ${quadro.jogada2}`)

    // Mostra a pontuação da terceira jogada no último quadro
    if (indice === 9) {
      console.log(`Jogada 3: ${quadro.jogada3}`)
    }
    
    // Se não houve strike nem spare, retorna a pontuação base
    if (!quadro.spare && !quadro.strike) {
      return pontuacaoBase;
    } else {
      // Se está no último quadro, entrega a pontuação base mais a pontuação da terceira jogada, caso haja spare/strike
      if (indice === 9) {
        return pontuacaoBase + ((quadro.strike || quadro.spare) ? (quadro.jogada3 ? quadro.jogada3 : 0) : 0);
      }

      // Para chegar aqui, haverá um spare ou strike, então cria um objeto da próxima posição
      const proximoQuadro = this.quadros[indice + 1];
      if (quadro.spare) {
        console.log(`+ spare: ${(proximoQuadro.jogada1 ? proximoQuadro.jogada1 : 0)}`);

        // Caso haja um spare, retorna a pontuação base mais a primeira jogada do próximo quadro
        return pontuacaoBase + (proximoQuadro.jogada1 ? proximoQuadro.jogada1 : 0);
      } else {
        console.log(`+ strike: ${(proximoQuadro.jogada1 ? proximoQuadro.jogada1 : 0) + (proximoQuadro.jogada2 ? proximoQuadro.jogada2 : 0)}`)

        // Caso haja um strike, retorna a pontuação base mais a pontuação total do próximo quadro
        return pontuacaoBase + (proximoQuadro.jogada1 ? proximoQuadro.jogada1 : 0) + (proximoQuadro.jogada2 ? proximoQuadro.jogada2 : 0)
      }
    }

  }
}

module.exports = JogoDeBoliche