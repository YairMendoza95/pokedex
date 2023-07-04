import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
	constructor(
		// la propiedad .name no hace referencia al atributo "name" de la entity sino el nombre del schema
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon> // Se crea el model a partir de mongoose y el nombre del entity,
	) { }

	// las inserciones a BD son asincronas
	async create(createPokemonDto: CreatePokemonDto) {
		try {
			createPokemonDto.name = createPokemonDto.name.toLowerCase();

			const pokemon = await this.pokemonModel.create(createPokemonDto);
			return pokemon;
		}
		catch (error) {
			this.handleExceptions(error);
		}
	}

	findAll() {
		return this.pokemonModel.find();
	}

	async findOne(term: string) {
		let pokemon: Pokemon;

		// Número
		if (!isNaN(+term)) {
			pokemon = await this.pokemonModel.findOne({ no: term });
		}

		// MongoId
		if (!pokemon && isValidObjectId(term)) {
			pokemon = await this.pokemonModel.findById(term);
		}

		// Name
		if (!pokemon) {
			pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
		}

		if (!pokemon) throw new NotFoundException(`Pokemon not found with name or No. ${ term }`);
		return pokemon;
	}

	async update(term: string, updatePokemonDto: UpdatePokemonDto) {
		const pokemon = await this.findOne(term);

		if (updatePokemonDto.name)
			updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

		try {
			await this.pokemonModel.updateOne(updatePokemonDto);

			return { ...pokemon.toJSON(), ...updatePokemonDto };
		}
		catch (error) {
			this.handleExceptions(error);
		}
	}

	async remove(id: string) {
		const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

		if (deletedCount === 0) throw new BadRequestException(`Pokemon with id: ${ id } is not found`);
		return;
	}

	private handleExceptions(error: any) {
		if (error.code === 11000) {
			throw new BadRequestException(`Pokemon already exists in database: ${ JSON.stringify(error.keyValue) }`);
		} else {
			console.log(error);
			throw new InternalServerErrorException(`Cannot create Pokemon`);
		}
	}
}
