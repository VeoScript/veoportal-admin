import { H3Event } from 'h3'

export interface IResponse {
  statusCode: number
  statusMessage: string
  cause?: any
}

const errorResponse = (event: H3Event, response: IResponse): IResponse => {
    event.node.res.statusCode = response.statusCode
    event.node.res.statusMessage = response.statusMessage
    return {
        statusCode: response.statusCode,
        statusMessage: response.statusMessage,
        cause: response.cause ? response.cause : null
    }
}

export default errorResponse