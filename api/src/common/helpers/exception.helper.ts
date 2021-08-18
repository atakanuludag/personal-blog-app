import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionHelper extends HttpException {
    constructor(message: string, status: HttpStatus) {
        super(message, status);
    }
}