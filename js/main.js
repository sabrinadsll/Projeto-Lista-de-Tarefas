import ui from "./ui.js";
import api from "./api.js";

const formulario = document.querySelector("#formulario-tarefa")
const procurarTarefa = document.querySelector("#campo-busca")

ui.renderizarTarefas();


formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const id = document.querySelector("#idTarefa").value
    const titulo = document.querySelector("#input-titulo").value 
    const prioridade = document.querySelector("#input-prioridade").value


    if (id) {
        await api.alterarTarefa({id, titulo, prioridade})
    } else {
        await api.cadastrarTarefa({titulo, prioridade})
    }

    await ui.renderizarTarefas()

})

procurarTarefa.addEventListener("input", async () => {
    const termo = procurarTarefa.value 
    const tarefaFiltrada = await api.filtrarPorTermo(termo)
    await ui.renderizarTarefas(tarefaFiltrada)
})