//alert('esto funciona correctamente')
document.getElementById("agregar").addEventListener("click", function() {
    var tarea = document.getElementById("tarea").value;
    if (tarea.trim() !== "") {
        var fechaHora = new Date();
        var fechaHoraFormateada = fechaHora.toLocaleString();
        var nuevoElemento = document.createElement("div");
        nuevoElemento.classList.add("task");
        nuevoElemento.innerHTML = `
            <p>${tarea}</p>
            <span class="task-date">${fechaHoraFormateada}</span>
            <span class="task-delete" onclick="eliminarTarea(this)">❌</span>
        `;
        nuevoElemento.draggable = true;
        //nuevoElemento.id = "tarea-" + Date.now();
        nuevoElemento.id = "tarea-" ;
        nuevoElemento.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", event.target.id);
        });
        document.getElementById("sinHacerColumn").appendChild(nuevoElemento);
        document.getElementById("tarea").value = "";
        // Cambiar stylos
        nuevoElemento.style.border = "3px solid darkturquoise";
        nuevoElemento.style.marginBottom = "10px";
        nuevoElemento.style.alignContent = "center"
    } else {
        alert("Por favor, ingrese una tarea.");
    }
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, targetId) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var element = document.getElementById(data);
    var prevParent = element.parentNode.id;
    event.target.appendChild(element);
    var currentParent = event.target.id;
    var color;
    switch (currentParent) {
        case "sinHacerColumn":
            color = "darkturquoise"; // Azul
            break;
        case "enProgresoColumn":
            color = "red"; // Rojo
            break;
        case "finalizadasColumn":
            color = "limegreen"; // Verde
            break;
        default:
            color = "#ccc";
    }
    element.style.border = "3px solid " + color;
}

function eliminarTarea(elemento) {
    elemento.parentNode.remove();
}