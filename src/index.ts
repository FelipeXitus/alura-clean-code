import express from 'express';
import { listarCidades, adicionarCidade } from './domains/cidades/cidade.controller';
import { listarUsuarios, criarUsuario, buscarUsuarioPorId, atualizarUsuario, excluirUsuario } from './domains/usuario/usuario.controller';

const app = express();
app.use(express.json());

app.route('/cidades')
	.get(listarCidades)	
	.post(adicionarCidade);
	

app.route('/usuarios')
	.get(listarUsuarios)
	.post(criarUsuario);

app.route('/usuarios/:id')
	.get(buscarUsuarioPorId)
	.put(atualizarUsuario)
	.delete(excluirUsuario);

// ===================================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ===================================================================================
const PORTA = 3000;
app.listen(PORTA, () => {
	console.log(`Servidor de exemplo rodando na porta http://localhost:${PORTA}`);
});