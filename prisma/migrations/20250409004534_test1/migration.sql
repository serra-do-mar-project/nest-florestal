-- CreateTable
CREATE TABLE `Fiscal` (
    `CPF` VARCHAR(191) NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `Senha` VARCHAR(191) NOT NULL,
    `Tipo` INTEGER NOT NULL,

    UNIQUE INDEX `Fiscal_CPF_key`(`CPF`),
    PRIMARY KEY (`CPF`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AutoInfracao` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Data_Emissao` DATETIME(3) NOT NULL,
    `CPF` VARCHAR(191) NOT NULL,
    `Lat` INTEGER NOT NULL,
    `Lon` INTEGER NOT NULL,
    `ID_exemploCaso` INTEGER NOT NULL,
    `Descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExemploCaso` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `PalavraChave` VARCHAR(191) NOT NULL,
    `naturezaDano` VARCHAR(191) NOT NULL,
    `proc_OP` VARCHAR(191) NOT NULL,
    `proc_ADM` VARCHAR(191) NOT NULL,
    `enq_PEN` VARCHAR(191) NOT NULL,
    `enq_ADM` VARCHAR(191) NOT NULL,
    `Modelo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AutoInfracao` ADD CONSTRAINT `AutoInfracao_CPF_fkey` FOREIGN KEY (`CPF`) REFERENCES `Fiscal`(`CPF`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AutoInfracao` ADD CONSTRAINT `AutoInfracao_ID_exemploCaso_fkey` FOREIGN KEY (`ID_exemploCaso`) REFERENCES `ExemploCaso`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
