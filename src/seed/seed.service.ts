import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,
		private readonly http: AxiosAdapter
	) { }

	async execute() {
		await this.pokemonModel.deleteMany({}); // Borra todos los registros de la colección

		const pokemonsToInsert: { no: number, name: string }[] = [];
		const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');
		data.results.forEach(async ({ name, url }) => {
			const segments = url.split('/');
			const no: number = +segments[segments.length - 2];

			// await this.pokemonModel.create({ no, name }); inserta de uno en uno los registros
			pokemonsToInsert.push({ no, name });
		});

		await this.pokemonModel.insertMany(pokemonsToInsert);
		return "SEED executed successfully";
	}
}
