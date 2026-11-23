/* ===== CONFIGURACIÓN: edita estos datos antes de publicar ===== */
const CONFIG = {
  schoolName: "Nombre del colegio",
  reportEmail: "convivencia@tucolegio.edu.co",   // correo que recibirá los reportes
  contactText: "Oficina de orientación, correo convivencia@tucolegio.edu.co"
};
/* =============================================================== */

document.querySelectorAll("[data-school-name]").forEach(e => e.textContent = CONFIG.schoolName);
document.querySelectorAll("[data-school-contact]").forEach(e => e.textContent = CONFIG.contactText);

// Menú móvil
const btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
btn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });

// Pestañas "Qué hacer ahora"
const tabs = [...document.querySelectorAll("[role=tab]")];
function selectTab(t) {
  tabs.forEach(x => {
    const on = x === t;
    x.setAttribute("aria-selected", on);
    x.tabIndex = on ? 0 : -1;
    document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
  });
  t.focus();
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectTab(t));
  t.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") selectTab(tabs[(i + 1) % tabs.length]);
    if (e.key === "ArrowLeft") selectTab(tabs[(i - 1 + tabs.length) % tabs.length]);
  });
});

// Formulario: prepara un correo para el colegio
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, que = f.que.value.trim(), err = f.querySelector(".err");
  err.hidden = !!que;
  if (!que) { f.que.focus(); return; }
  const lines = [
    f.urgente.checked ? "*** URGENTE: la persona siente que está en riesgo ***\n" : "",
    "Nombre y grado: " + (f.nombre.value.trim() || "No indicado"),
    "Dónde ocurrió: " + f.donde.value,
    "Contacto preferido: " + (f.contacto.value.trim() || "No indicado"),
    "\nRelato:\n" + que
  ].join("\n");
  const subject = (f.urgente.checked ? "[URGENTE] " : "") + "Reporte de ciberacoso";
  location.href = "mailto:" + CONFIG.reportEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines);
});
