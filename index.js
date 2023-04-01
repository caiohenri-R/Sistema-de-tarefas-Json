const prompt = require('prompt-sync')();
const axios = require('./api.js');

// Cadastrar Tarefa

async function cadastrarTarefa() {

    var id = Number(prompt('Digite o ID da tarefa: '));
    var descricao = prompt('Digite a descrição da tarefa: ');

    try {
        await axios.api.post('/tarefas', {
            id: id,
            descricao: descricao,
            status: 'Pendente'
        });

        console.log('Tarefa cadastrada com sucesso!')
    } catch (erro) {
        console.log('Erro ao cadastrar a tarefa: ', erro.message);
    }

}

// Alterar Tarefa 

async function alterarTarefa() {
    var id = Number(prompt('Digite o ID da tarefa que será alterada: '));
    var descricao = prompt('Dgite a nova descrição para a tarefa: ');

    try {
        await axios.api.put(`/tarefas/${id}`, {
            id: id,
            descricao: descricao,
            status: 'Pendente'
        });

        console.log('Tarefa alterada com sucesso!');
    } catch (erro) {
        console.log('Erro ao alterar tarefa: ', erro.message);
    }

}

// Alterar Tarefa p/ concluída

async function marcarTarefaConcluida() {
    var id = Number(prompt('Digite o ID da tarefa que será Concluida: '));

    var tarefa = await obterTarefa(id);

    try {
        await axios.api.put(`/tarefas/${id}`, {
            id: id,
            descricao: tarefa.descricao,
            status: 'Concluída'
        });

        console.log('Tarefa concluída com sucesso!');
    } catch (erro) {
        console.log('Erro ao concluir tarefa: ', erro.message);
    }

}

async function obterTarefa(id) {

    var response = await axios.api.get(`/tarefas/${id}`);
    var tarefa = response.data;
    return tarefa;

}

// Excluir tarefa

async function excluirTarefa() {
    var id = Number(prompt('Digite o ID da tarefa que será excluída: '));

    try {
        await axios.api.delete(`/tarefas/${id}`);

        console.log('Tarefa excluída com sucesso!');
    } catch (erro) {
        console.log('Erro ao excluir tarefa: ', erro.message);
    }

}


// Lista tarefas pendentes 

async function listarTarefasPendentes() {
    try {
        const response = await axios.api.get("/tarefas/");
        const pendentes = response.data.filter(tarefas => tarefas.status === "Pendente");
        console.table(pendentes);
    } catch (erro) {
        console.log("Ocorreu um erro ao tentar listar a tarefa.", erro.message);
    }
}


// Lista tarefas concluídas

async function listarTarefasConcluidas() {
    try {
        const response = await axios.api.get("/tarefas/");
        const concluidas = response.data.filter(tarefas => tarefas.status === "Concluída");
        console.table(concluidas);
    } catch (erro) {
        console.log("Ocorreu um erro ao tentar listar a tarefa.", erro.message);
    }
}


async function main() {

    console.log('Bem-vindo ao sistema de gerenciamento de tarefas');

    do {
        var opcao;
        console.log(`O que você quer fazer?`);


        console.log('1 - Cadastrar nova tarefa');
        console.log('2 - Alterar uma tarefa');
        console.log('3 - Marca tarefa como concluida');
        console.log('4 - Excluir uma tarefa');
        console.log('5 - Listar tarefas pendentes');
        console.log('6 - Listar tarefas concluidas');
        console.log(`0 - Sair do sistema`);

        opcao = prompt('Digite sua opção: ');

        switch (opcao) {
            case '1':
                await cadastrarTarefa();
                prompt('Enter para continuar...');
                console.clear();
                break;

            case '2':
                await alterarTarefa();
                prompt('Enter para continuar...');
                console.clear();
                break;

            case '3':
                await marcarTarefaConcluida();
                prompt('Enter para continuar...');
                console.clear();
                break;

            case '4':
                await excluirTarefa();
                prompt('Enter para continuar...');
                console.clear();
                break;

            case '5':
                await listarTarefasPendentes();
                prompt('Enter para continuar...');
                console.clear();
                break;

            case '6':
                await listarTarefasConcluidas();
                prompt('Enter para continuar...');
                console.clear();
                break;

            case '0':
                console.log('Obrigado por usar o sistema. Até mais!');
                break;
            default:
                console.log('Entrada inválida');
                prompt('Enter para continuar...')
        }
    } while (opcao !== '0');
}

main();