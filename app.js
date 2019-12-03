const { execQuery} = require('./db.js');

/*
execQuery('select * from usuario').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/
/*
execQuery('insert into usuario value (1011, "95199999914", "nome pu cara", "email pa ele", "123", "1231233", "asdads", "asdads") ').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

// CADATRA USUARIO DEFAULT
function queryInsertUser(data) {
  return `insert into usuario value
    (
     ${data.id_usuario },
     ${data.CPF },
     "${data.nome_completo }",
     "${data.email }",
     "${data.senha }",
     "${data.telefone }",
     "${data.linkedin }",
     "${data.site }")
  `;
}
// CADASTRA A CONTA NO BANCO
function queryInsertUserDataBanking(data){
  return `insert into dados_banco (id_usuario, banco, agencia, conta) value
  (
  (select usuario.id_usuario from usuario where usuario.nome_completo = "${data.nome_completo}"),
  "${data.banco}",
  "${data.agencia}",
  "${data.conta}")
  `;
}

// CADASTRA INVESTIDOR
function queryInsertUserInvestor(data){
  return `insert into investidor value
  (
  (select usuario.id_usuario from usuario where usuario.nome_completo = "${data.nome_completo}"),
  1)
  `;
}

// CADASTRA EMPREENDEDOR
function queryInsertUserEntrepreneur(data){
  return `insert into empreendedor value
  (
  (select usuario.id_usuario from usuario where usuario.nome_completo = "${data.nome_completo}"),
  "${data.sobre}")
  `;
}

// CADASTRA COLADBORADOR
function queryInsertUserCollaborator(data){
  return `insert into colaborador value
  (
  (select usuario.id_usuario from usuario where usuario.nome_completo = "${data.nome_completo}"),
  1,
  "${data.sobre}",
  "${data.expertise}")
  `;
}

//--------- NAO TA FUNCIONANDO VERIFICAR ------------------
// CADASTRA PROJETO
function queryInsertProject(data){
  return `insert into projeto (id_usuario, data_inicio, data_fim, descricao, valor_atual, valor_desejado) value
  (
  (select usuario.id_usuario from usuario where usuario.nome_completo = "${data.nome_completo}"),
  "${data.data_inicio}",
  "${data.data_fim}",
  "${data.descricao}",
  ${data.valor_atual},
  ${data.valor_desejado})
  `;
}

//ESPECIFICA O PROJETO CADASTRADO
//AGRICULTURA
function queryInsertProjectAgriculture(data){
  return `insert into agricultura value
  (
  (select projeto.id_projeto from projeto, usuario where projeto.id_usuario = usuario.id_usuario and  usuario.nome_completo = "${data.nome_completo}"),
  "${data.estacao}",
  "${data.regiao}",
  "${data.cultura}")
  `;
}

//ARTES
function queryInsertProjectArtes(data){
  return `insert into artes value
  (
  (select projeto.id_projeto from projeto, usuario where projeto.id_usuario = usuario.id_usuario and  usuario.nome_completo = "${data.nome_completo}"),
  ${data.tempo_de_atuacao}
  `;
}

//ESTUDO
function queryInsertProjectEstudo(data){
  return `insert into estudo value
  (
  (select projeto.id_projeto from projeto, usuario where projeto.id_usuario = usuario.id_usuario and  usuario.nome_completo = "${data.nome_completo}"),
  "${data.curso}",
  "${data.objetivo}",
  ${data.tempo_de_duracao}
  `;
}

//COMERCIO
function queryInsertProjectComercio(data){
  return `insert into comercio value
  (
  (select projeto.id_projeto from projeto, usuario where projeto.id_usuario = usuario.id_usuario and  usuario.nome_completo = "${data.nome_completo}"),
  "${data.tipo}",
  "${data.data_abertura}",
  "${data.periodo_funcionamento}",
  ${data.tempo_de_mercado}
  `;
}

// DELETE USUARIO
function queryDeleteUser(data) {
  return `delete from usuario where id_usuario = ${data.id_usuario}
  `;
}

// PESQUISA USUARIO
function querySearchUser(data) {
  return `select * from usuario where CPF = ${data.CPF} or nome_completo = "${data.nome_completo}"
  `;
}

// MOSTRA  PROJETOS ABERTOS E SEUS CRIADORES
function querySearchProjectAndOwner(){
  return `select * from projeto inner join usuario on usuario.id_usuario = projeto.id_usuario
  `;
}

// MOSTRA PROJETOS ABERTOS PESQUISANDO POR UM NOME
function querySearchProjectAndOwnerForName(data){
  return `select * from projeto inner join usuario on usuario.id_usuario = projeto.id_usuario where nome_completo = "${data.nome_completo}"
  `;
}

// PESQUISO O PROJETO PELO SEU NOME
function querySearchProjectForNameTheProject(data){
  return `select * from projeto where nome_projeto = "${data.nome_projeto}"
  `;
}

// DELETA PROJETO PELO NOME DELE
function queryDeleteProjectForName(data){
  return `delete from projeto where projeto.nome_projeto = "${data.nome_projeto}"
  `;
}

// LINKA O COLABORADOR AO PROJETO QUE DESEJA COLABORAR
function queryCollaborate(data){
  return `insert into colabora value (
  (select colaborador.id_usuario from colaborador inner join usuario on usuario.CPF = ${data.CPF}),
  (select projeto.id_projeto from projeto where projeto.nome_projeto = "${data.nome_projeto})
  )
  `;
}

// LINKA O COLABORADOR AO PROJETO QUE DESEJA COLABORAR
function queryInvestiment(data){
  return `insert into investe value (
  (select investidor.id_usuario from investidor inner join usuario on usuario.CPF = ${data.CPF}),
  (select projeto.id_projeto from projeto where projeto.nome_projeto = "${data.nome_projeto})
  )
  `;
}

// QUERYS PARA REALIZAR OPERACOES EM CIMA DAS TABELAS
// update projeto set valor_atual = valor_atual - 10 where id_projeto = 2;

// PRINTA SOMENTE

console.log(queryInsertUser({
      id_usuario: 10,
      CPF: 101010,
      nome_completo: "asdasd asd",
      email: "asdasd@gail.com",
      senha: "123",
      telefone: "14 1312323",
      linkedin: "asdasd@asd",
      site: "asdasd.com"
}));

//AREA DE TESTE
//CADASTRA A CONTA BANCO
/*
execQuery(queryInsertUserDataBanking({
  nome_completo : "Pelotas",
  banco : "BRASIL",
  agencia : "01010-0",
  conta : "313131-31"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

// CADASTRA INVESTIDOR
/*
execQuery(queryInsertUserInvestor({
  nome_completo: "Pelotas"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

// CADASTRA EMPREENDEDOR
/*
execQuery(queryInsertUserEntrepreneur({
  nome_completo: "jorginho",
  sobre: "Sou empreendedor"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

// CADASTRA EMPREENDEDOR
/*
execQuery(queryInsertUserCollaborator({
  nome_completo: "jorginho",
  sobre: "Sou colaborador",
  expertise: "Sou bom"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/
/*
//CADASTRA PROJETO
execQuery(queryInsertProject({
  nome_completo: "Taquari",
  data_inicio: "2019-11-11",
  data_fim: "2019-11-11",
  descricao: "Laranjinha",
  valor_atual: 0,
  valor_desejado: 100
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/
//CADASTRA PROJETO
/*
execQuery(queryInsertProjectAgriculture({
  nome_completo: "Pelotas",
  estacao: "inverno",
  regiao: "Centro-Oeste",
  cultura: "Abacaxi"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

//CADASTRA USUARIO
/*
execQuery(queryInsertUser({
      id_usuario: 1018,
      CPF: 151515,
      nome_completo: "Taquari",
      email: "asdasd@gail.com",
      senha: "123",
      telefone: "14 1312323",
      linkedin: "asdasd@asd",
      site: "asdasd.com"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

/*
 *  DELETE USUARIO
 *
execQuery(queryDeleteUser({
  id_usuario: 1011
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*
*
*/

// PESQUISA USER
/*
execQuery(querySearchUser({
  CPF:  0,
  nome_completo: "jorginho"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

/*
execQuery('select * from usuario').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/
/*
execQuery(querySearchProjectAndOwnerForName({
  nome_completo: "jorginho"
})).then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
*/

//console.log("TO AQUI");
//Mostra projeto e seus donos
/*
execQuery(querySearchProjectAndOwner).then(data => {
  console.logo(data);
}).catch(err => {
  console.log(err);
});*/

module.exports = {
  execQuery,
  queryInsertUser,
  queryInsertUserDataBanking,
  queryInsertUserInvestor,
  queryInsertUserEntrepreneur,
  queryInsertUserCollaborator,
  queryInsertProject,
  queryInsertProjectAgriculture,
  queryInsertProjectArtes,
  queryInsertProjectEstudo,
  queryInsertProjectComercio,
  queryDeleteUser,
  querySearchUser,
  querySearchProjectAndOwner,
  querySearchProjectAndOwnerForName,
  querySearchProjectForNameTheProject,
  queryDeleteProjectForName,
  queryCollaborate,
  queryInvestiment
}
/*
module.exports = queryInsertUser
module.exports = queryInsertUserDataBanking
module.exports = queryInsertUserInvestor
module.exports = queryInsertUserEntrepreneur
module.exports = queryInsertUserCollaborator
module.exports = queryInsertProject
module.exports = queryInsertProjectAgriculture
module.exports = queryInsertProjectArtes
module.exports = queryInsertProjectEstudo
module.exports = queryInsertProjectComercio
module.exports = queryDeleteUser
module.exports = querySearchUser
module.exports = querySearchProjectAndOwner
module.exports = querySearchProjectAndOwnerForName
module.exports = querySearchProjectForNameTheProject
module.exports = queryDeleteProjectForName
module.exports = queryCollaborate
module.exports = queryInvestiment
*/
