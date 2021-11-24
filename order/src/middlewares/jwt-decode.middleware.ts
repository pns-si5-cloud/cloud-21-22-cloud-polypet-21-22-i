import { Injectable, NestMiddleware } from '@nestjs/common';
import jwtDecode from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtDecodeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.debug(req)
    const decodedToken: any = jwtDecode(
      req.header('x-forwarded-authorization').split(' ')[1],
    );
    console.log('decoded token :', JSON.stringify(decodedToken));
    if (req.method == 'GET') {
      req.query['clientID'] = decodedToken.user_id;
    } else if (req.method == 'POST') {
      req.body['clientID'] = decodedToken.user_id;
    }
    next();
  }
}
