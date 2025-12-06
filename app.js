const TELEGRAM_WEBAPP = window.Telegram ? window.Telegram.WebApp : null;

async function loadProducts(){
  const res = await fetch('products.json');
  const products = await res.json();
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  products.forEach(p=>{
    const el = document.createElement('div');
    el.className='card';
    el.innerHTML = `
      <div class="thumb" style="background-image:url('${p.thumb}')"></div>
      <div class="meta">
        <strong>${p.title}</strong> <span class="price">${p.price}$</span>
        <p class="small">${p.short}</p>
        <button class="btn btn-primary" onclick="openProduct('${p.id}')">Подробнее</button>
      </div>`;
    cards.appendChild(el);
  });
}

function openProduct(id){
  location.href = 'product.html?id='+id;
}

async function init(){
  if(location.pathname.endsWith('index.html') || location.pathname.endsWith('/')){
    loadProducts();
  }
  if(location.pathname.endsWith('product.html')){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const res = await fetch('products.json');
    const products = await res.json();
    const p = products.find(x=>x.id===id);
    if(p){
      document.getElementById('prod-title').innerText=p.title;
      document.getElementById('prod-price').innerText=p.price+'$';
      document.getElementById('prod-short').innerText=p.short;
      document.getElementById('prod-preview').innerText=p.preview;
      document.getElementById('prod-cover').style.backgroundImage=`url('${p.thumb}')`;
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
