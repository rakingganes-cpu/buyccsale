async function fetchJSON(path){ const res=await fetch(path); if(!res.ok) throw new Error('not found'); return res.json(); }
async function load(){ 
  try{
    const cats = await fetchJSON('/products/categories.json');
    const catList = document.getElementById('categoryList'); catList.innerHTML='';
    cats.forEach(c=>{ const li=document.createElement('li'); li.innerHTML=`<a href="#" data-id="${c.id}" class="catlink">${c.name}</a>`; catList.appendChild(li); });
    const idx = await fetchJSON('/products/index.json'); window.PRODUCTS = idx; renderProducts(idx);
  }catch(e){ console.error(e); document.getElementById('productGrid').innerText='No products available.'; }
}
function renderProducts(list){ const grid=document.getElementById('productGrid'); grid.innerHTML='';
  list.forEach(p=>{ const div=document.createElement('div'); div.className='card';
    div.innerHTML=`<h4>${p.name}</h4><p>${p.desc}</p><div class="meta"><div><strong>${p.price}</strong></div><a class="buy" href="${p.payment}" target="_blank">Buy</a></div>`; grid.appendChild(div); });
}
document.addEventListener('click', e=>{ if(e.target.matches('.catlink')){ e.preventDefault(); const id=e.target.dataset.id; document.getElementById('categoryTitle').innerText=e.target.innerText; const filtered = window.PRODUCTS.filter(x=>x.category===id); renderProducts(filtered); } });
document.addEventListener('DOMContentLoaded', load);
document.addEventListener('DOMContentLoaded', ()=>{ const balBtn=document.getElementById('addBalanceBtn'); const balEl=document.getElementById('balanceAmount'); let bal=0;
  balBtn && balBtn.addEventListener('click', ()=>{ bal += 100; balEl.innerText = '৳'+bal.toFixed(2); alert('Demo: ৳100 added to balance.'); }); });
