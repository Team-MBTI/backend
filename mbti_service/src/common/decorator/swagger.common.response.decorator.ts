import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccessResponseDto = <T extends Type<any>>(data: T) => {
  return applyDecorators(
    ApiOkResponse({
      isArray: true,
      schema: {
        oneOf: [
          {
            properties: {
              status: {
                type: 'string',
                example: 'ok',
              },
              data: {
                $ref: getSchemaPath(data),
              },
            },
          },
        ],
      },
    }),
  );
};
