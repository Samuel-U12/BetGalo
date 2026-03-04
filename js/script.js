let slideIndex = 1; // Começa no primeiro slide
let timer; // Variável que guarda o "relógio" do carrossel

showSlides(slideIndex); // Ativa o carrossel assim que a página carrega

// Função que os botões "prev" e "next" chamam
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Função que os "dots" (pontinhos) chamam
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides"); // Pega todos os slides
  let dots = document.getElementsByClassName("dot"); // Pega todos os pontinhos
  
  // Se chegar no fim e clicar em "próximo", volta para o primeiro
  if (n > slides.length) {slideIndex = 1}    
  
  // Se estiver no primeiro e clicar em "anterior", vai para o último
  if (n < 1) {slideIndex = slides.length}
  
  // Esconde todos os slides antes de mostrar o correto
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  // Tira o destaque de todos os pontinhos
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Mostra o slide atual e destaca o ponto dele
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  
  // --- LÓGICA DO TEMPO ---
  clearTimeout(timer); // Cancela o timer antigo (evita que o slide pule sozinho logo após você clicar)
  timer = setTimeout(() => plusSlides(1), 5000); // Define 5 segundos para a próxima troca automática
}