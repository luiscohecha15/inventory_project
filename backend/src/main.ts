import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  // Allow CORS from the frontend dev server (Vite) during development
  // Adjust origin as needed for production or CI environments
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  });
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  console.log("Backend listening on", process.env.PORT || 3000);
}
bootstrap();
