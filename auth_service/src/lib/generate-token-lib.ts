
import { JWT_SECRET } from "@starportal/main/config";
import { JWTPayload, SignJWT, importJWK } from 'jose';


export const generateJWT = async (payload: JWTPayload) => {
    const secret = JWT_SECRET;
  
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
  
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('365d')
      .sign(jwk);
  
    return jwt;
  };