axios.defaults.headers.common["x-api-key"]="live_fJpEcmsalSnOTXMFW2gIUjht2meB9RjPKKjqwTJM4nwuPumBrJ4W2DyXwf7j0NpU";const e=document.getElementById("breed-select"),t=document.querySelector(".cat-info"),n=document.getElementById("cat-image"),a=document.getElementById("breed-name"),o=document.getElementById("description"),c=document.getElementById("temperament"),d=document.querySelector(".loader"),s=document.querySelector(".error");function l(){d.style.display="none",s.style.display="block"}axios.get("https://api.thecatapi.com/v1/breeds").then((e=>e.data)).catch((e=>{throw e})).then((t=>{t.forEach((t=>{const n=document.createElement("option");n.value=t.id,n.textContent=t.name,e.appendChild(n)}))})).catch((e=>{l()})),e.addEventListener("change",(()=>{const r=e.value;var m;r&&(t.style.display="none",d.style.display="block",s.style.display="none",(m=r,axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${m}`).then((e=>e.data)).catch((e=>{throw e}))).then((e=>{!function(e){n.src=e[0].url,a.textContent=`Порода: ${e[0].breeds[0].name}`,o.textContent=`Опис: ${e[0].breeds[0].description}`,c.textContent=`Темперамент: ${e[0].breeds[0].temperament}`,t.style.display="block"}(e),d.style.display="none"})).catch((e=>{l()})))}));
//# sourceMappingURL=index.21052929.js.map
