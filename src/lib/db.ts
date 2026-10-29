// Database client wrapper
// Safe initialization for both build-time and runtime environments

let prismaInstance: any = null;

try {
  // Dynamic import to prevent build-time failure if Prisma client hasn't been generated
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prismaPackage = require("@prisma/client");
  if (prismaPackage?.PrismaClient) {
    const globalForPrisma = globalThis as unknown as { prisma: any };
    prismaInstance =
      globalForPrisma.prisma ??
      new prismaPackage.PrismaClient({
        log: ["error", "warn"],
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }
  }
} catch {
  // Prisma client not yet generated or running in static export
  prismaInstance = null;
}

export const prisma = prismaInstance;
