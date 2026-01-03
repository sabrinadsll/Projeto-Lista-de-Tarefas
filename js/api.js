const URL_BASE = "http://localhost:3000"

const api = {
    async buscarTarefa() {
        try {
            const tarefa = await axios.get(`${URL_BASE}/tarefas`)
            return tarefa.data
        } catch (error) {
            alert("Erro ao carregar lista de tarefas")
        }
    },

    async buscarTarefaPorId(id) {
        try {
            const tarefa = await axios.get(`${URL_BASE}/tarefas/${id}`)
            return tarefa.data
        } catch (error) {
            alert("Erro ao carregar tarefa")
        }
    },

    async cadastrarTarefa(tarefa) {
        try {
            await axios.post(`${URL_BASE}/tarefas`, tarefa)
        } catch (error) {
            alert("Erro ao cadastrar tarefa")
        }
    },

    async alterarTarefa(tarefa) {
        try {
            await axios.put(`${URL_BASE}/tarefas/${tarefa.id}`, tarefa)
        } catch (error) {
            alert("Erro ao alterar tarefa")
        }
    },

    async deletarTarefa(id) {
        try {
            await axios.delete(`${URL_BASE}/tarefas/${id}`)
        } catch (error) {
            alert("Erro ao deletar tarefa")
        }
    },

    async filtrarPorTermo(termo) {
        try {
            const listaTarefa = await api.buscarTarefa()
            const termoMaiusculo = termo.toUpperCase()

            const listaTarefaFiltrada = listaTarefa.filter((elemento) => {
                const titulo = elemento.titulo.toUpperCase().includes(termoMaiusculo)
                const prioridade = elemento.prioridade.toUpperCase().includes(termoMaiusculo)
                
                return titulo || prioridade
            })

            return listaTarefaFiltrada
             
        } catch (error) {
            alert("Erro ao filtrar por termo")
        }
    }
}

export default api