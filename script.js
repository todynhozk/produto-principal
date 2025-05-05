
// Atualizar carrinho a partir do localStorage
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoElement = document.querySelector('.itens-carrinho');
    const totalElement = document.querySelector('.total');
  
    carrinhoElement.innerHTML = '';  // Limpa o carrinho antes de atualizar
    let total = 0;
  
    carrinho.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.nome}">
        ${item.nome} <span>R$ ${item.preco}</span>
      `;
      carrinhoElement.appendChild(itemElement);
      total += parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    });
  
    totalElement.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  }
  
  // Adiciona item ao carrinho e salva no localStorage
  function adicionarAoCarrinho(item) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
  }
  
  // Abre o carrinho (popup)
  document.querySelector('.btn-carrinho').addEventListener('click', () => {
    const popupCarrinho = document.querySelector('.modal-carrinho');
    popupCarrinho.classList.remove('hidden');
    atualizarCarrinho();
  });
  
  // Fecha o popup do carrinho
  document.querySelector('.fechar-carrinho').addEventListener('click', () => {
    const popupCarrinho = document.querySelector('.modal-carrinho');
    popupCarrinho.classList.add('hidden');
  });
  
  // Adiciona evento de "Adicionar ao Carrinho"
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.item');
      const nome = item.querySelector('p').textContent.trim();
      const preco = item.querySelector('.preco').textContent;
      const imgSrc = item.querySelector('img').src;
  
      const novoItem = { nome, preco, img: imgSrc };
      adicionarAoCarrinho(novoItem);
    });
  });
  
  // Carrega os itens do carrinho ao carregar a página
  document.addEventListener('DOMContentLoaded', atualizarCarrinho);
