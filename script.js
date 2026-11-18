const topo = document.querySelector('header');
const menuBotao = document.querySelector('.menu-botao');

const barra = document.createElement('div');
barra.className = 'barra-progresso';
document.body.appendChild(barra);

const voltar = document.createElement('button');
voltar.className = 'voltar-topo';
voltar.setAttribute('aria-label', 'Voltar ao topo');
voltar.textContent = '↑';
voltar.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.body.appendChild(voltar);

function aoRolar() {
  const rolado = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  topo.classList.toggle('rolou', rolado > 60);
  voltar.classList.toggle('visivel', rolado > 600);
  barra.style.width = (total > 0 ? (rolado / total) * 100 : 0) + '%';
}

window.addEventListener('scroll', aoRolar);
aoRolar();

menuBotao.onclick = () => topo.classList.toggle('aberto');
document.querySelectorAll('nav a').forEach((link) => {
  link.onclick = () => topo.classList.remove('aberto');
});

document.querySelectorAll('.carrossel').forEach((faixa) => {
  const caixa = document.createElement('div');
  caixa.className = 'carrossel-box';
  faixa.parentNode.insertBefore(caixa, faixa);
  caixa.appendChild(faixa);

  ['anterior', 'proximo'].forEach((lado) => {
    const botao = document.createElement('button');
    const direcao = lado === 'proximo' ? 1 : -1;
    botao.className = 'seta-carrossel ' + lado;
    botao.setAttribute('aria-label', direcao === 1 ? 'Próxima foto' : 'Foto anterior');
    botao.textContent = direcao === 1 ? '›' : '‹';
    botao.onclick = () => {
      faixa.scrollBy({ left: direcao * faixa.clientWidth * 0.8, behavior: 'smooth' });
    };
    caixa.appendChild(botao);
  });
});

const alvos = document.querySelectorAll([
  'section:not(.banner) > .titulo',
  'section:not(.banner) > .lateral',
  'section:not(.banner) > .texto-centro',
  'section:not(.banner) > .largura',
  'section:not(.banner) > .redes',
  'section > video',
  '.duas > *',
  '#equipamentos > *',
  '#projetos > *',
  '#contato > *',
  '.rodape > div',
  '.cards .card',
  '.linha-tempo .caixa',
  '.grade > *',
  '.sites a',
  '.passos li',
  '.equipamento > *'
].join(','));

const observador = new IntersectionObserver((itens) => {
  itens.forEach((item) => {
    if (item.isIntersecting) {
      item.target.classList.add('aparece');
      observador.unobserve(item.target);
    }
  });
}, { threshold: 0.12 });

alvos.forEach((elemento) => {
  elemento.classList.add('revelar');
  observador.observe(elemento);
});
