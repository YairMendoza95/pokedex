import { join } from 'path';
import { Module } from '@nestjs/common';

// Dependencias a instalar
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidaionSchema } from './config/joi.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [EnvConfiguration],
			validationSchema: JoiValidaionSchema
		}), // Importa el archivo de variables de entorno, siempre debe ir al inicio
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'), // Establece la ruta de los componentes públicos
		}),
		MongooseModule.forRoot(process.env.MONGO), // Conexión a MongoDB
		PokemonModule,
		CommonModule,
		SeedModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
