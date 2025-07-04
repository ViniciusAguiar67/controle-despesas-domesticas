-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 04/07/2025 às 01:50
-- Versão do servidor: 9.1.0
-- Versão do PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `controle_despesas`
--
CREATE DATABASE IF NOT EXISTS `controle_despesas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `controle_despesas`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`, `descricao`) VALUES
(1, 'Alimentação', 'Gastos com compras de comida, bebida e refeições, tanto em casa quanto fora.'),
(2, 'Moradia', 'Despesas relacionadas à manutenção da casa, contas básicas e aluguel.'),
(3, 'Transporte', 'Custos com deslocamento, como combustível, transporte público e manutenção do veículo.'),
(4, 'Saúde', 'Investimentos em plano de saúde, medicamentos e consultas médicas.'),
(5, 'Educação', 'Pagamentos de mensalidades, material escolar e cursos para estudo.'),
(6, 'Lazer e Cultura', 'Atividades de entretenimento, assinaturas e passeios.'),
(7, 'Roupas e Calçados', 'Compras de vestuário, sapatos e acessórios pessoais.'),
(8, 'Cuidados Pessoais', 'Produtos e serviços para higiene, beleza e bem-estar físico.'),
(9, 'Outros', 'Despesas diversas como presentes, doações e cuidados com pets.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `despesas`
--

DROP TABLE IF EXISTS `despesas`;
CREATE TABLE IF NOT EXISTS `despesas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `valor` decimal(10,0) NOT NULL,
  `data_compra` timestamp NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `id_tipo_pagamento` int NOT NULL,
  `id_categoria` int NOT NULL,
  `id_local` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_pagamento` (`id_tipo_pagamento`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_local` (`id_local`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `despesas`
--

INSERT INTO `despesas` (`id`, `valor`, `data_compra`, `descricao`, `id_tipo_pagamento`, `id_categoria`, `id_local`) VALUES
(1, 500, '2025-07-02 03:00:00', 'Compra do Mês', 4, 1, 1),
(3, 125, '2025-07-03 03:00:00', 'Conta de Luz', 1, 2, 3),
(4, 1, '2025-07-01 03:00:00', 'Mensalidade da Faculdade', 4, 5, 4),
(5, 450, '2025-07-04 03:00:00', 'Conserto do Carro', 3, 3, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
CREATE TABLE IF NOT EXISTS `enderecos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `numero` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `municipio` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uf` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `complemento` varchar(100) NOT NULL,
  `cep` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `enderecos`
--

INSERT INTO `enderecos` (`id`, `logradouro`, `numero`, `bairro`, `municipio`, `uf`, `complemento`, `cep`) VALUES
(1, 'Rua José Geraldo Martins', '123', 'Vila Caputera', 'Mogi das Cruzes', 'SP', '', '08720-580'),
(3, 'Rua Alexandre Andriotti', '120', 'Jundiapeba', 'Mogi das Cruzes', 'SP', '', '08750-570'),
(4, 'Rua José Geraldo Martins', '123', 'Vila Caputera', 'Mogi das Cruzes', 'SP', '', '08720-580'),
(5, 'Rua Fernando Antonio Gonçalves Santos', '10', 'Parque Olimpico', 'Mogi das Cruzes', 'SP', '', '08746-180');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipos_pagamento`
--

DROP TABLE IF EXISTS `tipos_pagamento`;
CREATE TABLE IF NOT EXISTS `tipos_pagamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `tipos_pagamento`
--

INSERT INTO `tipos_pagamento` (`id`, `tipo`) VALUES
(1, 'Dinheiro'),
(2, 'Débito'),
(3, 'Crédito'),
(4, 'Pix');

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `despesas`
--
ALTER TABLE `despesas`
  ADD CONSTRAINT `despesas_ibfk_1` FOREIGN KEY (`id_tipo_pagamento`) REFERENCES `tipos_pagamento` (`id`),
  ADD CONSTRAINT `despesas_ibfk_2` FOREIGN KEY (`id_local`) REFERENCES `enderecos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `despesas_ibfk_3` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
