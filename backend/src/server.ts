import app from './app';
import config from './config';
import prisma from "./prisma";

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

