import api from "./api.js";

const listaTarefa = document.querySelector("#lista-tarefas")


const ui = {
    criarTarefa(tarefa) {
        const li = document.createElement("li")
        li.classList.add("item-tarefa", "d-flex", "justify-content-between", "align-items-center", "shadow-sm")

        const div1 = document.createElement("div")
        div1.classList.add("d-flex", "align-items-center", "flex-grow-1")

        const div1_1 = document.createElement("div")
        div1_1.classList.add("custom-checkbox")

        const input = document.createElement("input")
        input.type = ("checkbox")
        input.id = ("check-1")

        input.addEventListener("click", () => {
            if (input.checked) {
                input.style.color = "#545454"
                strong.style.textDecoration = "line-through"
                strong.style.color = "#C9DFF8"
                span.textContent = "Concluída"
                div2.innerHTML = ""
                div2.appendChild(btn_excluir)

                li.style.backgroundColor = "#fcfcfc"
                li.style.opacity = "0.7"
            }
            else {
                strong.style.textDecoration = "none"
                span.textContent = tarefa.prioridade
                strong.style.color = "#444"
                div2.innerHTML = ""
                div2.appendChild(btn_editar)
                div2.appendChild(btn_excluir)
            }
        })

        const div1_2 = document.createElement("div")
        div1_2.classList.add("ms-3")

        const strong = document.createElement("strong")
        strong.classList.add("titulo-tarefa")
        strong.textContent = tarefa.titulo



        const span = document.createElement("span")
        span.classList.add("badge-prioridade")
        span.textContent = tarefa.prioridade

        const div2 = document.createElement("div")
        div2.classList.add("acoes", "d-flex", "gap-2")

        const btn_editar = document.createElement("button")
        btn_editar.classList.add("btn-editar")
        btn_editar.textContent = "Editar"

        btn_editar.addEventListener("click", async () => {
            this.preencherForm(tarefa.id)
        })

        const btn_excluir = document.createElement("button")
        btn_excluir.classList.add("btn-excluir")
        btn_excluir.textContent = "Excluir"

        btn_excluir.addEventListener("click", async () => {

            const confirmacao = confirm("Você realmente quer excluir?")

            if (confirmacao) {

                try {
                    await api.deletarTarefa(tarefa.id)
                    
                } catch (error) {
                    alert("Erro ao excluir tarefa")
                }
            }


        })


        listaTarefa.appendChild(li)
        li.appendChild(div1)
        li.appendChild(div2)
        div1.appendChild(div1_1)
        div1_1.appendChild(input)
        div1.appendChild(div1_2)
        div1_2.appendChild(strong)
        div1_2.appendChild(span)
        div2.appendChild(btn_editar)
        div2.appendChild(btn_excluir)
    },

    async renderizarTarefas(tarefaFiltrada = null) {
        listaTarefa.innerHTML = ""

        try {

            let tarefa

            if (tarefaFiltrada) {
                tarefa = tarefaFiltrada
            } else {
                tarefa = await api.buscarTarefa()
            }

            tarefa.forEach(tarefa => {
                this.criarTarefa(tarefa)
            });

        } catch (error) {
            alert(error)
        }
    },

    async preencherForm(id) {
        const idTarefa = document.querySelector("#idTarefa")
        const titulo = document.querySelector("#input-titulo")
        const prioridade = document.querySelector("#input-prioridade")
        const tarefa = await api.buscarTarefaPorId(id)

        idTarefa.value = tarefa.id
        titulo.value = tarefa.titulo
        prioridade.value = tarefa.prioridade
    }

}

export default ui