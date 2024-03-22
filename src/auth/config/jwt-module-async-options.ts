import { ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get("JWT_SECRET_KEY"),
  signOptions: {
    expiresIn: config.get("JWT_EXPAIRES_AT", "15m"),
  },
});

export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
