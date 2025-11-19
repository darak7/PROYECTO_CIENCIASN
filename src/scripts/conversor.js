const unidades = {
  temperatura: ["C", "F", "K"],
  longitud: ["mm", "cm", "m", "km"],
  masa: ["mg", "g", "kg"],
  volumen: ["mL", "L"]
};

function convertir(valor, tipo, u1, u2) {
  valor = Number(valor);

  if (tipo === "temperatura") {
    if (u1 === "C" && u2 === "F") return valor * 9/5 + 32;
    if (u1 === "F" && u2 === "C") return (valor - 32) * 5/9;
    if (u1 === "C" && u2 === "K") return valor + 273.15;
    if (u1 === "K" && u2 === "C") return valor - 273.15;
    if (u1 === "F" && u2 === "K") return (valor - 32) * 5/9 + 273.15;
    if (u1 === "K" && u2 === "F") return (valor - 273.15) * 9/5 + 32;
  }

  if (tipo === "longitud") {
    const f = { mm: 0.001, cm: 0.01, m: 1, km: 1000 };
    return (valor * f[u1]) / f[u2];
  }

  if (tipo === "masa") {
    const f = { mg: 0.001, g: 1, kg: 1000 };
    return (valor * f[u1]) / f[u2];
  }

  if (tipo === "volumen") {
    const f = { mL: 0.001, L: 1 };
    return (valor * f[u1]) / f[u2];
  }

  return null;
}

function cargarUnidades() {
  const tipo = document.getElementById("tipo").value;
  const origen = document.getElementById("unidad-origen");
  const destino = document.getElementById("unidad-destino");

  origen.innerHTML = "";
  destino.innerHTML = "";

  unidades[tipo].forEach(u => {
    origen.innerHTML += `<option value="${u}">${u}</option>`;
    destino.innerHTML += `<option value="${u}">${u}</option>`;
  });
}

document.addEventListener("DOMContentLoaded", cargarUnidades);
document.getElementById("tipo").addEventListener("change", cargarUnidades);

document.getElementById("btn-convertir").addEventListener("click", () => {
  const valor = document.getElementById("valor").value;
  const tipo = document.getElementById("tipo").value;
  const u1 = document.getElementById("unidad-origen").value;
  const u2 = document.getElementById("unidad-destino").value;

  if (!valor) {
    document.getElementById("resultado").innerText = "Ingresa un valor válido.";
    return;
  }

  const resultado = convertir(valor, tipo, u1, u2);
  document.getElementById("resultado").innerText = `Resultado: ${resultado}`;
});
