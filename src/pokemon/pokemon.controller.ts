import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
	constructor(private readonly pokemonService: PokemonService) { }

	@Post()
	@HttpCode(HttpStatus.CREATED) // Nos ayuda a definir los estatus http que requerimos
	// @HttpCode(201)
	create(@Body() createPokemonDto: CreatePokemonDto) {
		return this.pokemonService.create(createPokemonDto);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	findAll() {
		return this.pokemonService.findAll();
	}

	@Get(':term')
	@HttpCode(HttpStatus.OK)
	findOne(@Param('term') term: string) {
		return this.pokemonService.findOne(term);
	}

	@Patch(':term')
	@HttpCode(HttpStatus.ACCEPTED)
	update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
		return this.pokemonService.update(term, updatePokemonDto);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.ACCEPTED)
	remove(@Param('id', ParseMongoIdPipe) id: string) {
		return this.pokemonService.remove(id);
	}
}
