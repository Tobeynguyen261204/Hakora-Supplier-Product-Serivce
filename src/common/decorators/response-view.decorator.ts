import { SetMetadata, Type } from '@nestjs/common';

export const RESPONSE_VIEW_KEY = 'response_view';

export const ResponseView = (dtoClass: Type<unknown>) =>
    SetMetadata(RESPONSE_VIEW_KEY, dtoClass);
