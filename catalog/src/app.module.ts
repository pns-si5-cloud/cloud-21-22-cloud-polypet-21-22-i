import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';
import { Product } from './models/Product';
const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbSocketPath+"/"+process.env.DB_HOST,
      extra: { socketPath: dbSocketPath+"/"+process.env.DB_HOST },
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Product],
      synchronize: true,
    }),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class AppModule {}
