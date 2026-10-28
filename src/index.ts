import express, { type Request, type Response } from 'express';
import { listarCidades, adicionarCidade } from './domains/cidades/cidade.controller';
import { processarUsuarios, manipularItemEspecifico } from './domains/usuario/usuario.controller';

const app = express();
app.use(express.json());

app.route('/cidades')
	.get(listarCidades)	
	.post(adicionarCidade);
	

app.route('/usuarios')
	.post(processarUsuarios)
	.get(processarUsuarios);

app.route('/usuarios/:id')
	.get(manipularItemEspecifico)
	.put(manipularItemEspecifico)
	.delete(manipularItemEspecifico);

// ===================================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ===================================================================================
const PORTA = 3000;
app.listen(PORTA, () => {
	console.log(`Servidor de exemplo rodando na porta http://localhost:${PORTA}`);
});