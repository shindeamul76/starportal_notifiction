import { jwtVerify, importJWK, JWTPayload } from 'jose';
import { JWT_SECRET } from '../config';

export const extractUserId = async (jwt: string) => {
  if (jwt) {
    const secret = JWT_SECRET;
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

        const { payload } = await jwtVerify(jwt, jwk);

        const payloadWithoutId =  payload as JWTPayload;

        return payloadWithoutId.id
  } else {
    return null;
  }
};
