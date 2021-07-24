import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string,
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

  //Receber o token via auth
  const authToken = req.headers.authorization;

  //Validar se token esta preenchido
  if(!authToken) {
    return res.status(401).json({message: 'User Unauthorized'});
  }

  const [,token] = authToken.split(" ");

  try {

    //Verificar se token é valido
    const { sub } = verify(token, '72fec2f4c6a9c5fc07d8764f5b46a717') as IPayload;

    //Recupera infos do usuario
    req.user_id = sub;
    
    return next();

  } catch(err) {
    return res.status(401).json({message: 'User Unauthorized'});
  }

}