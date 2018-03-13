import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import {ApiService} from "../services/api.service";

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private apiService: ApiService) {}

  resolve(...args: any[]): ExpressMiddleware {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      const queryToken = req.query.key;
      const token = queryToken || (authHeader ? authHeader.substr(6) : null);
      if (token) {
        req.token = token;
        this.apiService.setToken(token);
        next();
      } else {
        res.status(403).send({error: "No token"});
        // res.end()
      }

    };
  }
}