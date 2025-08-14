import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'; // Nome da chave para o metadado
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // Define que a rota é pública
