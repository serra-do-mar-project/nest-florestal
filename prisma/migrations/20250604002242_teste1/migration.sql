/*
  Warnings:

  - The primary key for the `fiscal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `CPF` on the `fiscal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(14)`.
  - You are about to drop the `autoinfracao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exemplocaso` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `autoinfracao` DROP FOREIGN KEY `AutoInfracao_CPF_fkey`;

-- DropForeignKey
ALTER TABLE `autoinfracao` DROP FOREIGN KEY `AutoInfracao_ID_exemploCaso_fkey`;

-- DropIndex
DROP INDEX `Fiscal_CPF_key` ON `fiscal`;

-- AlterTable
ALTER TABLE `fiscal` DROP PRIMARY KEY,
    MODIFY `CPF` VARCHAR(14) NOT NULL,
    MODIFY `Nome` VARCHAR(255) NOT NULL,
    MODIFY `Senha` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`CPF`);

-- DropTable
DROP TABLE `autoinfracao`;

-- DropTable
DROP TABLE `exemplocaso`;

-- CreateTable
CREATE TABLE `Infracao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_resumo` VARCHAR(100) NULL,
    `nome_completo` VARCHAR(255) NOT NULL,
    `palavra_chave` VARCHAR(255) NULL,
    `categoria` VARCHAR(100) NOT NULL,
    `tags` VARCHAR(255) NULL,
    `exemplo` TEXT NULL,
    `definicao` TEXT NULL,
    `proc_OP` TEXT NULL,
    `proc_ADM` TEXT NULL,
    `enquad_PEN` TEXT NULL,
    `enquad_ADM` TEXT NULL,
    `formulario` VARCHAR(255) NULL,
    `tipoOcorrencia` VARCHAR(100) NULL,
    `campos` TEXT NULL,

    INDEX `Infracao_categoria_idx`(`categoria`),
    INDEX `Infracao_palavra_chave_idx`(`palavra_chave`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relatorio` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Data_Emissao` DATE NOT NULL,
    `CPF_Fiscal` VARCHAR(14) NOT NULL,
    `ID_Infracao` INTEGER NOT NULL,
    `Observacoes` TEXT NULL,
    `Local_Ocorrencia` VARCHAR(255) NULL,
    `Data_Ocorrencia` DATETIME(3) NULL,

    INDEX `Relatorio_Data_Emissao_idx`(`Data_Emissao`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Relatorio` ADD CONSTRAINT `Relatorio_CPF_Fiscal_fkey` FOREIGN KEY (`CPF_Fiscal`) REFERENCES `Fiscal`(`CPF`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relatorio` ADD CONSTRAINT `Relatorio_ID_Infracao_fkey` FOREIGN KEY (`ID_Infracao`) REFERENCES `Infracao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
