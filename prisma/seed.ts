import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("5enha#", 10);
  
  // Exemplo de inserção de dados
  await prisma.fiscal.create({
    data: {
      CPF: '12345678901',
      Nome: 'teste',
      Senha: hashedPassword,
      Tipo: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });