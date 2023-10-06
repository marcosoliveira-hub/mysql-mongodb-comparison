// Criação da coleção estudantes e a inserção dos dados
// (Lembre-se que a coleção é criada automaticamente caso ela não exista)

db.estudantes.insertMany([
  {
    "nome": "João Silva",
		"idade": 20,
    "sexo": "Masculino",
    "curso": "Engenharia Elétrica",
    "materias": [
      {
        "nome": "Cálculo I",
        "carga_horaria": 60,
        "media": 8.5
      },
      {
        "nome": "Física I",
        "carga_horaria": 45,
        "media": 7.2
      }
    ]
  },
  {
    "nome": "Maria Santos",
    "idade": 22,
    "sexo": "Feminino",
    "curso": "Ciência da Computação",
    "materias": [
      {
        "nome": "Programação em Python",
        "carga_horaria": 50,
        "media": 9.0
      },
      {
        "nome": "Banco de Dados",
        "carga_horaria": 55,
        "media": 8.2
      }
    ]
  },
  {
    "nome": "Pedro Oliveira",
    "idade": 21,
    "sexo": "Masculino",
    "curso": "Medicina",
    "materias": [
      {
        "nome": "Anatomia Humana",
        "carga_horaria": 70,
        "media": 9.5
      },
      {
        "nome": "Histologia",
        "carga_horaria": 55,
        "media": 8.7
      }
    ]
  },
  {
    "nome": "Ana Souza",
    "idade": 19,
    "sexo": "Feminino",
    "curso": "Administração",
    "materias": [
      {
        "nome": "Gestão de Projetos",
        "carga_horaria": 45,
        "media": 7.8
      },
      {
        "nome": "Economia",
        "carga_horaria": 60,
        "media": 7.0
      }
    ]
  },
  {
    "nome": "Lucas Ferreira",
    "idade": 23,
    "sexo": "Masculino",
    "curso": "Psicologia",
    "materias": [
      {
        "nome": "Psicologia Clínica",
        "carga_horaria": 65,
        "media": 8.9
      },
      {
        "nome": "Psicopatologia",
        "carga_horaria": 55,
        "media": 8.4
      }
    ]
  },
  {
    "nome": "Mariana Oliveira",
    "idade": 21,
    "sexo": "Feminino",
    "curso": "Engenharia Elétrica",
    "materias": [
      {
        "nome": "Cálculo I",
        "carga_horaria": 60,
        "media": 5.2
      },
      {
        "nome": "Sistemas de Potência",
        "carga_horaria": 60,
        "media": 8.2
      }
    ]
  }
]);

// Dados da coleção

db.estudantes.find()

// Seleção com filtragem

db.estudantes.find({idade: {$lte: 20}})

// Alteração (update) da idade de um estudante

db.estudantes.updateOne(
  { nome: 'Maria Santos' },
  { $set: { idade: 23 } }
);

// Deleção de todos os estudantes com 21 anos ou menos

db.estudantes.deleteMany({ idade: { $lte: 21 } });

// Criação de índice para o campo nome (o número 1 é para indicar que a ordenação do índice deve ser feita em ordem crescente)

db.estudantes.createIndex({ nome: 1 });

// Exemplo de transação (alterando idade, inserindo uma matéria a mais para o aluno João Silva e aplicando as mudanças com commit)

const session = db.getMongo().startSession();
session.startTransaction();

try {
  db.estudantes.updateOne(
    { nome: 'João Silva' },
    { $set: { idade: 21 } },
    { session }
  );

  db.notas.insertOne(
    {
      aluno: 'João Silva',
      materia: 'Cálculo II',
      nota: 9.3
    },
    { session }
  );

  session.commitTransaction();
} catch (error) {
  print(`Error occurred: ${error}`);
  session.abortTransaction();
} finally {
  session.endSession();
}

// Exemplo de agregação mostrando a média de idade de todos os alunos, separando-os pelo sexo

db.estudantes.aggregate([
  {
    $group: {
      _id: '$sexo',
      avg_age: { $avg: '$idade' }
    }
  }
]);
