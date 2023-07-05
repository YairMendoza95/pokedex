import { join } from 'path';
import { Module } from '@nestjs/common';

// Dependencias a instalar
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'), // Establece la ruta de los componentes públicos
		}),
		MongooseModule.forRoot('mongodb://localhost:27017/NEST_POKEDEX'), // Conexión a MongoDB
		PokemonModule,
		CommonModule,
		SeedModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
