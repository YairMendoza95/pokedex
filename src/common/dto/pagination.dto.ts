import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    // Al ser componentes que se utilizaran en más de una ocasión es recomendable crear el paginationDto en los common
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?: number;
}
