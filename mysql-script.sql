-- Criação e utilização do esquema (SCHEMA) (Pode ser trocado por 'database')

CREATE SCHEMA escola;
use escola;

-- Criação das tabelas dos alunos e matérias

CREATE TABLE alunos (
    aluno_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    idade INT,
    sexo VARCHAR(10),
    curso VARCHAR(255)
);

CREATE TABLE materias (
    materia_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    carga_horaria INT,
    media DECIMAL(5, 2),
    aluno_id INT,
    FOREIGN KEY (aluno_id) REFERENCES alunos(aluno_id) -- Chave Estrangeira (alunos(id) -> materias(aluno_id))
);

-- Inserir 6 estudantes na tabela alunos
INSERT INTO alunos (nome, idade, sexo, curso)
VALUES
    ('João Silva', 20, 'Masculino', 'Engenharia Elétrica'),
    ('Maria Santos', 22, 'Feminino', 'Ciência da Computação'),
    ('Pedro Oliveira', 21, 'Masculino', 'Medicina'),
    ('Ana Souza', 19, 'Feminino', 'Administração'),
    ('Lucas Ferreira', 23, 'Masculino', 'Psicologia'),
    ('Mariana Oliveira', 21, 'Feminino', 'Engenharia Elétrica');

-- Inserir matérias para os alunos
INSERT INTO materias (nome, carga_horaria, media, aluno_id)
VALUES
    ('Cálculo I', 60, 8.5, 1),
    ('Física I', 45, 7.2, 1),
    ('Programação em Python', 50, 9.0, 2),
    ('Banco de Dados', 55, 8.2, 2),
    ('Anatomia Humana', 70, 9.5, 3),
    ('Histologia', 55, 8.7, 3),
    ('Gestão de Projetos', 45, 7.8, 4),
    ('Economia', 60, 7.0, 4),
    ('Psicologia Clínica', 65, 8.9, 5),
    ('Psicopatologia', 55, 8.4, 5),
    ('Cálculo I', 60, 5.2, 6),
    ('Sistemas de Potência', 60, 8.2, 6);

-- Alunos e matérias em suas respectivas tabelas
SELECT * FROM alunos;
SELECT * FROM materias;

-- Seleção utilizando parâmetro para filtragem

SELECT * FROM alunos WHERE alunos.idade <= 20

-- Alteração (update)

UPDATE estudantes SET idade = 23 WHERE nome = ’Maria Santos

-- Deleção

DELETE FROM estudantes WHERE idade <= 21

-- Criação de índice

CREATE INDEX idx_nome ON estudantes (nome)

-- Exemplo de Transação

START TRANSACTION;

UPDATE alunos SET idade = 21 WHERE nome = 'João Silva';

INSERT INTO materias (nome, carga_horaria, media, aluno_id)
VALUES ('Cálculo II', 60, 9.3, (SELECT aluno_id FROM alunos WHERE nome = 'João Silva'));

COMMIT;

-- Exemplo de agregação (GROUP BY)

SELECT sexo, AVG(idade) AS avg_age FROM alunos GROUP BY sexo;
