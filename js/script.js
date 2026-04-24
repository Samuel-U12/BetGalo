function trocarAba(metodo) {
    const cartao = document.getElementById('container-cartao');
    const pix = document.getElementById('container-pix');
    const areaQr = document.getElementById('area-qrcode');
    const btnGerar = document.getElementById('btn-gerar-pix');

    if (metodo === 'pix') {
        cartao.style.display = 'none';
        pix.style.display = 'flex';
    } else {
        cartao.style.display = 'block';
        pix.style.display = 'none';
        
        // Reset do estado do PIX ao sair da aba
        if(areaQr) areaQr.style.display = 'none';
        if(btnGerar) btnGerar.style.display = 'flex';
        document.getElementById('cpf').value = "";
    }
    
    // Lógica das classes active (mantenha como você já tinha)
    document.getElementById('btn-cartao').classList.toggle('active', metodo === 'cartao');
    document.getElementById('btn-pix').classList.toggle('active', metodo === 'pix');
}

// --- MÁSCARA DE CPF ---
const cpfInput = document.getElementById('cpf');
if(cpfInput) {
    cpfInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d)/, "$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = v;
    });
}

// --- CARROSSEL (HOME) ---
let slideIndex = 1;
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return; // Evita erro se não estiver na home
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Inicia o carrossel apenas se os elementos existirem
if (document.getElementsByClassName("mySlides").length > 0) {
    showSlides(slideIndex);
    setInterval(() => { slideIndex++; showSlides(slideIndex); }, 5000);
}


// --- FUNÇÃO DE VALIDAÇÃO MATEMÁTICA DO CPF ---
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontos e traços
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false; // Verifica tamanho e números repetidos

    let soma = 0, resto;
    // Validação do 1º dígito
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    // Validação do 2º dígito
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// --- FUNÇÃO PARA GERAR O PIX APÓS VALIDAÇÃO ---
function gerarPix() {
    const cpfInput = document.getElementById('cpf');
    const areaQr = document.getElementById('area-qrcode');
    const btnGerar = document.getElementById('btn-gerar-pix');

    if (validarCPF(cpfInput.value)) {
        // Se for válido, libera o QR Code
        btnGerar.style.display = 'none';
        areaQr.style.display = 'block';
        cpfInput.disabled = true; // Bloqueia o input para não mudar após gerar
        iniciarTimer();
    } else {
        // Se for inválido, avisa o usuário
        alert("❌ CPF Inválido! Por favor, confira os números.");
        cpfInput.style.borderColor = "red";
        cpfInput.focus();
    }
}

// --- TIMER REGRESSIVO ---
function iniciarTimer() {
    let tempo = 300; 
    const display = document.getElementById('display-timer');
    const intervalo = setInterval(() => {
        let min = Math.floor(tempo / 60);
        let seg = tempo % 60;
        display.innerHTML = `${min < 10 ? '0' + min : min}:${seg < 10 ? '0' + seg : seg}`;
        if (--tempo < 0) {
            clearInterval(intervalo);
            display.innerHTML = "EXPIRADO";
        }
    }, 1000);
}