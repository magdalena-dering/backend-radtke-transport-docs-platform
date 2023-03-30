import { Prisma } from '@prisma/client';

export const mapToPrismaError = (
  exception: Prisma.PrismaClientKnownRequestError,
) => {
  const prismaCode = exception?.code;
  const prismaTarget = (exception?.meta?.target as Array<string>)?.join(',');
  const prismaMessage = exception?.meta?.message;
  const prismaCause = exception?.meta?.cause;

  const errorMap = {
    P2002: `The ${prismaTarget} already exists`,
    P2023: `Inconsistent column data: ${prismaMessage}`,
    P2025: prismaMessage ? `${prismaMessage} ${prismaCause}` : `${prismaCause}`,
    default: `Unhandled prisma code: ${prismaCode}`,
  };

  return errorMap[prismaCode] || errorMap.default;
};
