function convertToFloatingPointSystem(B, T, M, L, number) {
    let numeroNormalizado = '';
    let expoente = 0;
    let lengthNumeroNormalizado = '';

    if (number == 0) {
        alert('Zero não é um número válido');
        return;
    }

    console.log(`Sistema: F(${B}, ${T}, ${M}, ${L})`);

    let sinal = number < 0 ? 1 : 0;
    let caracterSinal = '';

    if(sinal == 1) {
        caracterSinal = '-';
        number = number * -1;
    }

    console.log(sinal == 1 ? 'Sinal: negativo' : 'Sinal: positivo');
    numeroTexto = number.toString();

    let numerosPreVirgula = Math.floor(Math.abs(number)).toString();
    let numerosPosVirgula = numeroTexto.substring(numerosPreVirgula.toString().length + 1, numeroTexto.length);
    console.log(`Número antes da vírgula: ${numerosPreVirgula}`);
    console.log(`Número depois da vírgula: ${numerosPosVirgula}`);

    if(parseFloat(numerosPreVirgula) == 0) {
        for(i = 0; i < numerosPosVirgula.length; i++) {
            if(numerosPosVirgula.substring(i, i+1) == '0') {
                expoente++;
            }
            else {
                break;
            }
        }
        console.log(`Expoente: ${-expoente}`);
        numeroNormalizado = (number * Math.pow(B, expoente).toString());
        expoente = -expoente;
        console.log(`Número normalizado: ${numeroNormalizado}`);
        numeroNormalizado = numeroNormalizado.toString();
        lengthNumeroNormalizado = numeroNormalizado.substring(2, numeroNormalizado.length);
        console.log(`Tamanho do número normalizado: ${lengthNumeroNormalizado.length}`)

    } else {
        expoente = numerosPreVirgula.toString().length;
        console.log(`Expoente: ${expoente}`);
        numeroNormalizado = (number * Math.pow(B, -expoente).toString());
        console.log(`Número normalizado: ${numeroNormalizado}`);
        numeroNormalizado = numeroNormalizado.toString();
        lengthNumeroNormalizado = numeroNormalizado.substring(2, numeroNormalizado.length);
        console.log(`Tamanho do número normalizado: ${lengthNumeroNormalizado.length}`);
    }


    if(lengthNumeroNormalizado.length > T) {
        let tDigitos = lengthNumeroNormalizado.substring(0, T);
        console.log(`T dígitos: ${tDigitos}`);
        let tMaisUm = lengthNumeroNormalizado.substring(T, T + 1);
        console.log(`T+1 dígitos: ${tMaisUm}`);
        let tRestante = lengthNumeroNormalizado.substring(T, lengthNumeroNormalizado.length);
        console.log(`T restante: ${tRestante}`);
        if (tMaisUm >= 5) {
            let numSoma = '0.';
            for(i = 0; i < T; i++) {
                if (i == T-1) {
                    numSoma += '1';
                } else {
                    numSoma += '0';
                }
            }
            console.log(`Número a ser somado: ${parseFloat(numSoma)}`);
            numeroNormalizado = parseFloat(numeroNormalizado);
            numeroNormalizado = (parseFloat(numeroNormalizado) + parseFloat(numSoma));
            numeroNormalizado = numeroNormalizado.toString();
        }
        numeroNormalizado = numeroNormalizado.substring(0, numeroNormalizado.length - tRestante.length);
        console.log(`Número normalizado após remoção dos dígitos: ${numeroNormalizado}`);
    }
    else if (lengthNumeroNormalizado.length < T) {
        let tDigitos = lengthNumeroNormalizado;
        console.log(`T dígitos: ${tDigitos}`);
        let tRestante = T - lengthNumeroNormalizado.length;
        console.log(`T restante: ${tRestante}`);
        for(i = 0; i < tRestante; i++) {
            numeroNormalizado += '0';
        }
        console.log(`Número normalizado após adição de zeros: ${numeroNormalizado}`);
    }

    document.getElementById('sistema').innerHTML = `Sistema: F(${B}, ${T}, ${M}, ${L})`;

    if(expoente > L) {
        document.getElementById('caseError').innerHTML = '<i class="ri-alert-line" id="iconError"></i>Overflow!';
    } else if(expoente < M) {
        document.getElementById('caseError').innerHTML = '<i class="ri-alert-line" id="iconError"></i>Underflow!';
    }  else {
        document.getElementById('caseError').innerHTML = '<i class="ri-alert-line hidden" id="iconError"></i>';
    }
    
    if(sinal == 1) {
        document.getElementById('resultado').innerHTML = `Número convertido é: ${caracterSinal}${numeroNormalizado}*${B}^${expoente}`;
    } 
    else {
        document.getElementById('resultado').innerHTML = `Número convertido é: ${numeroNormalizado}*${B}^${expoente}`;
    }

}

function sistemaPontoFlutuante() {
    

    if(document.getElementById('numero').value == '' || document.getElementById('base').value == '' || document.getElementById('mantissa').value == '' || document.getElementById('expoenteMin').value == '' || document.getElementById('expoenteMax').value == '') {
        alert('Preencha todos os campos!');
        return;
    } else {
        let B = parseFloat(document.getElementById('base').value);
        let T = parseFloat(document.getElementById('mantissa').value);
        let M = parseFloat(document.getElementById('expoenteMin').value);
        let L = parseFloat(document.getElementById('expoenteMax').value);

        let inputValue = document.getElementById('numero').value;
        let number = parseFloat(inputValue.replace(",", "."));
        convertToFloatingPointSystem(B, T, M, L, number);
    }
}

function redefinirCampos() {
    document.getElementById('numero').value = '';
    document.getElementById('base').value = '';
    document.getElementById('mantissa').value = '';
    document.getElementById('expoenteMin').value = '';
    document.getElementById('expoenteMax').value = '';
    document.getElementById('sistema').innerHTML = '';
    document.getElementById('caseError').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
}