import { IsEnum, IsNotEmpty, IsString, Matches, ValidateByOptions, ValidationOptions } from "class-validator";

const unitRegEx = "^[0-1]{64}$";

export class SearchPostgresDto {

    @IsString()
    @IsNotEmpty()
    @Matches(unitRegEx, "", { message: "Invalid unit format" })
    unit: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['audio', 'image', 'text', 'video'])
    mode: string;

}
