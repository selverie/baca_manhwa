import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ManhwasModule } from './manhwas/manhwas.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { databaseConfig } from './config/database.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    ManhwasModule,
    BookmarksModule,
  ],
})
export class AppModule {}
