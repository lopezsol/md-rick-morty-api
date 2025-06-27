import { User } from 'src/auth/entities/user.entity';
import { ResultCode } from '../enums/result-code.enum';

export function successResponse({
  message,
  data = {},
}: {
  message: string;
  data?: any;
}) {
  return {
    header: {
      message,
      resultCode: ResultCode.OK,
    },
    data,
  };
}

export function errorResponse(resultCode: ResultCode, error: string) {
  return {
    header: {
      resultCode,
      error,
    },
  };
}
