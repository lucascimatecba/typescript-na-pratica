const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;
elementoFormulario.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação!");
        return;
    }

    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
    const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
    const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement;

    let tipoTransacao: TipoTransação = inputTipoTransacao.value as TipoTransação;
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value);

    if (tipoTransacao == TipoTransação.DEPOSITO) {
        saldo += valor;
    } else if (tipoTransacao == TipoTransação.TRANSFERENCIA || tipoTransacao == TipoTransação.PAGAMENTO_BOLETO) {
        saldo -= valor;
    } else {
        alert("Tipo de Transação é inválido!");
        return;
    }

    elementoSaldo.textContent = formatarMoeda(saldo);

    const novaTransacao: Transação = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };

    console.log(novaTransacao);
    elementoFormulario.reset();
});