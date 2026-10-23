(function () {
  const params = new URLSearchParams(location.search);
  const flow = FLOWS.find(f => f.id === Number(params.get("f")));
  if (!flow) { location.replace("index.html"); return; }
  const testMode = params.get("modo") === "prueba";

  const $ = id => document.getElementById(id);
  const screenEl = $("screen"), zonesEl = $("zones"), phoneEl = $("phone");
  let idx = 0, trail = [], timer = null;

  document.title = "Flujo " + flow.id + " · Portal OKA-Fi";
  $("ttl").textContent = "Flujo " + flow.id + " · " + flow.title;

  // Hoja resumen (solo fuera del modo prueba)
  const sheetEl = $("sheet");
  sheetEl.innerHTML =
    '<div class="kicker">HOJA RESUMEN · FLUJO ' + flow.id + "</div><h2>" + flow.title + "</h2>" +
    flow.sheet.map(b => "<h3>" + b.h + "</h3><ul>" + b.lines.map(l => "<li>" + l + "</li>").join("") + "</ul>").join("");
  const desktop = () => window.matchMedia("(min-width: 900px)").matches;
  if (testMode) {
    $("btnSheet").classList.add("hide");
    $("stepLabel").classList.add("hide");
    $("caption").classList.add("hide");
  } else if (desktop()) {
    sheetEl.classList.remove("hide");
    $("btnSheet").textContent = "Ocultar hoja";
  }
  $("btnSheet").addEventListener("click", () => {
    const hidden = sheetEl.classList.toggle("hide");
    $("btnSheet").textContent = hidden ? "Hoja resumen" : "Ocultar hoja";
  });

  // Precarga de imágenes del flujo
  flow.steps.forEach(s => { const i = new Image(); i.src = SCREENS[s.k].img; });

  function clearTimer() { if (timer) { clearTimeout(timer); timer = null; } }

  function go(next, pushTrail) {
    clearTimer();
    if (pushTrail) trail.push(idx);
    idx = next;
    render(true);
  }

  function addZone(rect, onTap, label) {
    const h = SCREENS[flow.steps[idx].k].h;
    const b = document.createElement("button");
    b.type = "button"; b.className = "zone"; b.setAttribute("aria-label", label);
    b.style.left = (rect[0] / 360 * 100) + "%";
    b.style.top = (rect[1] / h * 100) + "%";
    b.style.width = (rect[2] / 360 * 100) + "%";
    b.style.height = (rect[3] / h * 100) + "%";
    b.addEventListener("click", e => { e.stopPropagation(); onTap(); });
    zonesEl.appendChild(b);
  }

  function render(fade) {
    const step = flow.steps[idx], def = SCREENS[step.k], hot = HOTSPOTS[step.k] || {};
    const last = idx === flow.steps.length - 1;
    const apply = () => {
      screenEl.src = def.img;
      screenEl.style.aspectRatio = "360 / " + def.h;
      zonesEl.innerHTML = "";
      phoneEl.classList.remove("hint");
      if (!last) {
        if (step.tapAnywhere) addZone([0, 0, 360, def.h], () => go(idx + 1, true), "Avanzar");
        else if (hot.zone) addZone(hot.zone, () => go(idx + 1, true), "Avanzar");
      }
      $("stepLabel").textContent = "Pantalla " + (idx + 1) + " de " + flow.steps.length;
      $("caption").textContent = step.cap;
      $("end").classList.toggle("hide", !last);
      $("btnBack").disabled = trail.length === 0;
      if (!last && hot.auto) timer = setTimeout(() => go(idx + 1, true), hot.auto);
      screenEl.classList.remove("swap");
    };
    if (fade) { screenEl.classList.add("swap"); setTimeout(apply, 120); } else apply();
  }

  // Tocar fuera de la zona activa marca dónde se puede tocar
  phoneEl.addEventListener("click", () => {
    phoneEl.classList.add("hint");
    setTimeout(() => phoneEl.classList.remove("hint"), 2200);
  });

  function restart() { clearTimer(); trail = []; idx = 0; render(true); }
  $("btnRestart").addEventListener("click", restart);
  $("btnEnd").addEventListener("click", restart);
  $("btnBack").addEventListener("click", () => {
    if (!trail.length) return;
    clearTimer(); idx = trail.pop(); render(true);
  });

  render(false);
})();
