(()=>{const $=s=>document.querySelector(s), all=s=>Array.from(document.querySelectorAll(s));let fav=[];try{fav=JSON.parse(localStorage.getItem('fleau-fav')||'[]');$('#memo').value=localStorage.getItem('fleau-notes')||''}catch(e){}const save=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let only=false;function filter(){const q=norm($('#search').value);all('article').forEach(a=>{a.hidden=(only&&!fav.includes(a.dataset.id))||!norm(a.textContent+' '+a.closest('details').querySelector('summary').textContent+' '+(a.closest('.weapon')?.querySelector('h2').textContent||'')).includes(q)});all('details:not(.arsenal-reference)').forEach(d=>{d.hidden=!d.querySelector('article:not([hidden])');if(q||only)d.open=!d.hidden});all('.weapon').forEach(w=>w.hidden=!w.querySelector('details:not(.arsenal-reference):not([hidden])'))}all('article').forEach(a=>{const b=a.querySelector('.fav');function paint(){const on=fav.includes(a.dataset.id);b.textContent=on?'★ Favori':'☆ Favori';b.setAttribute('aria-pressed',on)}paint();b.onclick=()=>{fav=fav.includes(a.dataset.id)?fav.filter(x=>x!==a.dataset.id):[...fav,a.dataset.id];save('fleau-fav',JSON.stringify(fav));paint();filter()};a.querySelector('.copy').onclick=async function(){const text=[a.querySelector('p').textContent,a.querySelector('blockquote')?.textContent].filter(Boolean).join('\n\n');try{await navigator.clipboard.writeText(text);this.textContent='Copié'}catch(e){const t=document.createElement('textarea');t.value=text;a.append(t);t.select();this.textContent='Sélectionner / copier'}}});$('#search').oninput=filter;$('#onlyfav').onclick=function(){only=!only;this.setAttribute('aria-pressed',only);filter()};$('#memo').oninput=()=>{$('#status').textContent=save('fleau-notes',$('#memo').value)?'Notes enregistrées localement.':'Sauvegarde indisponible.'};})();

(() => {
  const panel = document.querySelector('#capacites');
  const search = document.querySelector('#search');
  const results = document.querySelector('#power-results');
  const count = document.querySelector('#power-count');
  const filters = [...panel.querySelectorAll('[data-power-filter]')];
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let selected = '';

  const powers = [...document.querySelectorAll('.weapon .arsenal-ability')].map(ability => {
    const weapon = ability.closest('.weapon').querySelector('h2').textContent;
    const name = ability.querySelector('h4').textContent;
    const triggerField = [...ability.querySelectorAll('dt')].find(term => term.textContent === 'Déclencheur');
    const trigger = triggerField?.nextElementSibling.textContent;
    const result = document.createElement('details');
    result.className = 'arsenal-reference power-result';
    const summary = document.createElement('summary');
    const context = document.createElement('small');
    context.textContent = trigger ? weapon + ' · ' + trigger : weapon;
    summary.append(name, context);
    const body = document.createElement('div');
    body.className = 'arsenal-body';
    for (const child of [...ability.children].slice(1)) {
      body.append(child.cloneNode(true));
    }
    result.append(summary, body);
    results.append(result);

    return {
      result,
      action: ability.dataset.action,
      searchable: normalize(weapon + ' ' + ability.textContent.replace(/\s+/g, ' ')),
    };
  });

  function update() {
    const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const power of powers) {
      power.result.hidden = (selected && power.action !== selected)
        || !terms.every(term => power.searchable.includes(term));
      if (!power.result.hidden) visible++;
    }
    count.textContent = visible === 0 ? 'Aucun pouvoir trouvé.' : visible + (visible === 1 ? ' pouvoir' : ' pouvoirs');
  }

  for (const button of filters) {
    const action = button.dataset.powerFilter;
    if (action && !powers.some(power => power.action === action)) {
      button.hidden = true;
    }
    button.addEventListener('click', () => {
      selected = action;
      for (const filter of filters) {
        filter.setAttribute('aria-pressed', filter === button);
      }
      update();
    });
  }
  search.addEventListener('input', update);
  update();
  panel.hidden = false;
  document.querySelector('#quick-power-link').hidden = false;
})();
