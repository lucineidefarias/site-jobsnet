function consultaCEP(){
    var cep = document.getElementById('cep').value.replace(/\D/g,'');
    console.log(cep);
    var url = "https://viacep.com.br/ws/"+cep+"/json/";
    console.log(url);
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = (e)=>{
        document.getElementById('return').innerHTML = 'API OFFLINE OU CEP INVÁLIDO'
    }

    request.onload = ()=>{
        var response = JSON.parse(request.responseText);

        if(response.erro === true){
            document.getElementById('return').innerHTML = 'CEP NÃO ENCONTRADO';
        }else{
            console.log(response);
            document.getElementById('return').innerHTML = 
            
            'CEP: '+ response.cep+'<br>'+
            'Logradouro: '+ response.logradouro+'<br>'+
            'CEP: '+ response.bairro+'<br>'+
            'Cidade/UF: '+ response.localidade+' / '+ response.uf;
        }
    }
    
    request.send();

}