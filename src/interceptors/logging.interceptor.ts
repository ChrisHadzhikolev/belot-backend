import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  /**
   * Logging interceptor.
   *
   * When succesfull it logs the request url, method, execution time, and start time.
   *
   * Format: "{method} - {url} - {execution-time} - {start-time}"
   *
   * @export
   * @class ExchangeLoggingInterceptor
   * @implements {NestInterceptor}
   */
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private logger: Logger = new Logger(LoggingInterceptor.name);
  
    /**
     * Intercepts Http requests
     *
     * Logs the request when succesfull
     *
     * @param {ExecutionContext} context context
     * @param {CallHandler} next call handler
     * @returns {Observable<any>}
     * @memberof ExchangeLoggingInterceptor
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const { url, method } = context.switchToHttp().getRequest();
  
      const now = Date.now();
      const startTime = new Date().toISOString();
      return next
          .handle()
          .pipe(
              tap(() =>
                  this.logger.log(
                      `${method} - ${url} - ${Date.now() - now}ms - ${startTime}`,
                  ),
              ),
          );
    }
  }
  
  