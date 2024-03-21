import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

const jwtModuleOptions = (): JwtModuleOptions => ({
  signOptions: {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  },
});

export const options = (): JwtModuleAsyncOptions => ({
  useFactory: (config) => jwtModuleOptions(),
});
