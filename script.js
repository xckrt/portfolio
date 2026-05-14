/* ── THREE.JS 3D BACKGROUND (НОВАЯ ФИЧА) ── */
function init3D() {
    const canvas = document.getElementById('hero-3d');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Внешняя сфера
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00e5ff, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.15 
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Внутренняя фигура
    const geometry2 = new THREE.IcosahedronGeometry(1.5, 0);
    const material2 = new THREE.MeshBasicMaterial({ 
        color: 0xff3c5c, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.25 
    });
    const sphere2 = new THREE.Mesh(geometry2, material2);
    scene.add(sphere2);

    camera.position.z = 6;

    // Реакция на мышь
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);

        // Базовое вращение
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;
        sphere2.rotation.x -= 0.002;
        sphere2.rotation.y -= 0.001;

        // Интерактивное вращение от курсора
        sphere.rotation.x += mouseY * 0.005;
        sphere.rotation.y += mouseX * 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
init3D();

/* ── COMPETENCIES DATA ── */
const COMP = [
    {c:"ОК 01",t:"Выбирать способы решения задач профессиональной деятельности применительно к различным контекстам"},
    {c:"ОК 02",t:"Использовать современные средства поиска, анализа и интерпретации информации"},
    {c:"ОК 03",t:"Планировать и реализовывать собственное профессиональное и личностное развитие"},
    {c:"ОК 04",t:"Эффективно взаимодействовать и работать в коллективе и команде"},
    {c:"ОК 05",t:"Осуществлять устную и письменную коммуникацию на государственном языке РФ"},
    {c:"ОК 06",t:"Проявлять гражданско-патриотическую позицию, демонстрировать осознанное поведение"},
    {c:"ОК 07",t:"Содействовать сохранению окружающей среды, ресурсосбережению"},
    {c:"ОК 08",t:"Использовать средства физической культуры для сохранения и укрепления здоровья"},
    {c:"ОК 09",t:"Пользоваться профессиональной документацией на государственном и иностранном языках"},
    {c:"ПК 1.1",t:"Формировать алгоритмы разработки программных модулей в соответствии с ТЗ"},
    {c:"ПК 1.2",t:"Разрабатывать программные модули в соответствии с техническим заданием"},
    {c:"ПК 1.3",t:"Выполнять отладку программных модулей"},
    {c:"ПК 1.4",t:"Выполнять тестирование программных модулей"},
    {c:"ПК 1.5",t:"Осуществлять рефакторинг и оптимизацию программного кода"},
    {c:"ПК 1.6",t:"Разрабатывать модули программного обеспечения для мобильных платформ"},
    {c:"ПК 2.1",t:"Разрабатывать требования к программным модулям на основе анализа документации"},
    {c:"ПК 2.2",t:"Выполнять интеграцию модулей в программное обеспечение"},
    {c:"ПК 2.3",t:"Выполнять отладку программного модуля"},
    {c:"ПК 2.4",t:"Осуществлять разработку тестовых наборов и сценариев"},
    {c:"ПК 2.5",t:"Производить инспектирование компонент ПО"},
    {c:"ПК 4.1",t:"Осуществлять инсталляцию, настройку и обслуживание ПО компьютерных систем"},
    {c:"ПК 4.2",t:"Осуществлять измерения эксплуатационных характеристик ПО"},
    {c:"ПК 4.3",t:"Выполнять работы по модификации компонент ПО"},
    {c:"ПК 4.4",t:"Обеспечивать защиту программного обеспечения от несанкционированного доступа"},
    {c:"ПК 11.1",t:"Осуществлять сбор, обработку и анализ информации для проектирования БД"},
    {c:"ПК 11.2",t:"Проектировать базу данных на основе анализа предметной области"},
    {c:"ПК 11.3",t:"Разрабатывать объекты базы данных"},
    {c:"ПК 11.4",t:"Реализовывать базу данных в конкретной СУБД"},
    {c:"ПК 11.5",t:"Администрировать базы данных"},
    {c:"ПК 11.6",t:"Защищать информацию в базе данных"},
    {c:"ДПК 2.1",t:"Использование системного анализа и методологий проектирования (UML, MVC)"},
    {c:"ДПК 2.2",t:"Работа с системой контроля версий (Git)"}
];

let curTab = 'all';

function codeClass(c) {
    if (c.startsWith('ОК'))  return 'ok';
    if (c.startsWith('ДПК')) return 'dpk';
    return 'pk';
}

function renderComp(q='') {
    const g = document.getElementById('cgrid');
    if (!g) return;
    const items = COMP.filter(x => {
        const tMatch = curTab === 'all' || x.c.startsWith(curTab);
        const qMatch = !q || x.c.toLowerCase().includes(q.toLowerCase()) || x.t.toLowerCase().includes(q.toLowerCase());
        return tMatch && qMatch;
    });
    g.innerHTML = items.map(x =>
        `<div class="citem"><span class="ccode ${codeClass(x.c)}">${x.c}</span><span class="ctxt">${x.t}</span></div>`
    ).join('');
}

// Выводим в глобальную область видимости, чтобы работал onclick в HTML
window.filterC = function(v) { renderComp(v); };

window.setTab = function(el, tab) {
    curTab = tab;
    document.querySelectorAll('.ctab').forEach(t => t.classList.remove('on'));
    el.classList.add('on');
    renderComp(document.getElementById('cinput').value);
};

renderComp();

/* ── PROJECT TOGGLE ── */
window.toggleP = function(id) {
    const d = document.getElementById(id);
    if(d) d.classList.toggle('open');
};

/* ── CUSTOM CURSOR ── */
const cur = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;

if (!('ontouchstart' in window) && cur && curR) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cur.style.left = mx - 4 + 'px';
        cur.style.top  = my - 4 + 'px';
    });

    (function animR() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        curR.style.left = rx - 18 + 'px';
        curR.style.top  = ry - 18 + 'px';
        requestAnimationFrame(animR);
    })();

    document.querySelectorAll('a,button,.prow,.sk-card,.ctab,.socbtn').forEach(el => {
        el.addEventListener('mouseenter', () => { cur.classList.add('expand'); curR.classList.add('expand'); });
        el.addEventListener('mouseleave', () => { cur.classList.remove('expand'); curR.classList.remove('expand'); });
    });
}

/* ── TYPING EFFECT ── */
const roles = ['Fullstack Developer', 'Mobile Developer', 'ASP.NET Engineer', 'Kotlin / Android Dev'];
let ri = 0, ci = 0, del = false;

function tick() {
    const el = document.getElementById('typed');
    if(!el) return;
    const w  = roles[ri];
    if (!del) {
        el.textContent = w.slice(0, ++ci);
        if (ci === w.length) { del = true; setTimeout(tick, 2200); return; }
        setTimeout(tick, 75);
    } else {
        el.textContent = w.slice(0, --ci);
        if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
        setTimeout(tick, 38);
    }
}
setTimeout(tick, 1600);

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('on');
        const fill = e.target.querySelector('.sk-fill');
        if (fill) setTimeout(() => { fill.style.width = e.target.dataset.lv + '%'; }, 180);
    });
}, { threshold: 0.12 });

document.querySelectorAll('.rv, .rv-l').forEach(el => obs.observe(el));

/* ── SECTION DOTS ── */
const secIds = ['hero','about','skills','projects','competencies','citizen'];
const dots   = document.querySelectorAll('.sdot');

const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const i = secIds.indexOf(e.target.id);
            if (i >= 0) dots.forEach((d, j) => d.classList.toggle('on', i === j));
        }
    });
}, { threshold: 0.45 });

secIds.forEach(id => { const el = document.getElementById(id); if (el) secObs.observe(el); });
dots.forEach((d, i) => d.addEventListener('click', () =>
    document.getElementById(secIds[i])?.scrollIntoView({ behavior: 'smooth' })
));