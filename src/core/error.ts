import { throws } from "assert"



enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    ACCESS_TOKEN = 'AccessTokenError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
    NOT_IMPLEMENTED = 'NotImplemented',
    VALIDATION_DB = 'MongodbError'
}

export enum HttpStatusCode {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    OUT_OF_QUOTA = 429,
    UNPROCESSABLE_ENTITY = 422,
    UNSUPPORTED_MEDIA_FILE = 415,
    INTERNAL_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    SERVICE_UNAVAILABLE = 503,
}

export abstract class ApiError extends Error {
    constructor(type: ErrorType, public message: string, public httpStatusCode: number) {
        super(type)
    }
}


export class NotFoundError extends ApiError {
    constructor(message?: string) {
        super(ErrorType.NOT_FOUND, message ?? "Data not Found", HttpStatusCode.NOT_FOUND)
    }
}

export class UnAthorizedError extends ApiError {
    constructor(message?: string) {
        super(ErrorType.UNAUTHORIZED, message ?? "Request in unathorized", HttpStatusCode.UNAUTHORIZED)
    }
}






