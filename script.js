function validaCpf(campoCpf) {
    strCPF = campoCpf.value.replace(/\D/g, '');
    var Soma;
    var Resto;
    Soma = 0;

    if (strCPF == "00000000000")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "11111111111")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "22222222222")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "33333333333")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "44444444444")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "55555555555")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "66666666666")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "77777777777")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "88888888888")
        return swal('cpf invalido', 'error', 'error');
    if (strCPF == "99999999999")
        return swal('cpf invalido', 'error', 'error');
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)))
        return swal('cpf invalido', 'error', 'error');
    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11)))
        return swal('cpf invalido', 'error', 'error');
    return true//getElementById('span-cpf').;
}

function consultaCEP() {
    mostraEndereco()
    var cep = document.getElementById('cep').value.replace(/\D/g, '');
    console.log(cep);
    var url = "https://viacep.com.br/ws/" + cep + "/json/";
    console.log(url);
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = (e) => {
        //document.getElementById('caixa-erro').classList.toggle('fadeIn');
        swal('CEP INVÁLIDO', '', 'error')
    }

    request.onload = () => {
        var response = JSON.parse(request.responseText);

        if (response.erro === true) {
            //document.getElementById('caixa-erro').classList.toggle('fadeIn');
            swal('CEP NÃO ENCONTRADO', '', 'error')
        } else {
            console.log(response);
            document.getElementById('logradouro').value = response.logradouro;
            document.getElementById('bairro').value = response.bairro;
            document.getElementById('cidade').value = response.localidade;
            document.getElementById('uf').value = response.uf;
            document.getElementById('logradouro').disabled = true;
            document.getElementById('bairro').disabled = true;
            document.getElementById('cidade').disabled = true;
            document.getElementById('uf').disabled = true;
        }
    }

    request.send();

}

function cadastrar() {
    
    var candidato = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        nascimento: document.getElementById('nascimento').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        complemento: document.getElementById('complemento').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('uf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        ProfissaoId: parseInt(location.search.substring(1).split("=")[1])
    }
    console.log(candidato);
    let enviarCandidato = async (candidato) => {
        const rawResponse = await fetch('https://localhost:5001/api/Candidatos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidato)
        });
        const response = await rawResponse;
        if(response.status == '200' || response.status == '201' || response.status=="204"){
            document.getElementById('nome').value = "";
            document.getElementById('cpf').value = "";
            document.getElementById('nascimento').value = "";
            document.getElementById('cep').value = "";
            document.getElementById('logradouro').value = "";
            document.getElementById('complemento').value = "";
            document.getElementById('numero').value = "";
            document.getElementById('bairro').value = "";
            document.getElementById('cidade').value = "";
            document.getElementById('uf').value = "";
            document.getElementById('telefone').value = "";
            document.getElementById('email').value = ""; 
            swal("Cadastro Realizado ComSucesso","",'success');
        }
        const content = await rawResponse.json();
        if(content=='CBE'){
            swal('CPF JÁ CADASTRADO','','error');
        }
    }
    
        enviarCandidato(candidato);
        
    

    
}

function mostraEndereco() {
    document.getElementById('caixa_endereco').classList.toggle('is-hidden');
}

function cadastrarVaga() {
    var vaga = {
        nome: document.getElementById('nome_vaga').value,
        descricao: document.getElementById('descricao').value,
    }
    console.log(vaga);
    let enviarCandidato = async (vaga) => {
        const rawResponse = await fetch('https://localhost:5001/api/Profissoes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vaga)
        });
        const content = await rawResponse.json();
        console.log(content);
    }
    enviarCandidato(vaga);
}



// var originalText = "éàçèñ"
// var result = originalText.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase
// console.log(result)



