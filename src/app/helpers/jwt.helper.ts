import * as jose from 'jose';
import { UserRoles } from 'src/app/constants/role.constant';
import { ENV } from 'src/environments/ENV';

interface ITokenRequestPayload {
  user: {
    id: string | any;
    role: string;
    companyId?: string;
    username: string;
    email: string;
    phoneNumber: string;
  };
  isRefreshToken?: boolean;
}

interface ITokenResponsePayload {
  user: {
    id: string | any;
    role: string;
    companyId?: string;
    username: string;
    email: string;
    phoneNumber: string;
  };
  isRefreshToken?: boolean;
  iat: number;
  exp: number;
  nbf: number;
  sub: string;
  jti: string;
}

const secret = new TextEncoder().encode(ENV.jwt.secretKey);

export const JWTHelper = {
  sign: async (payload: any, options: any): Promise<string> => {
    return await new jose.SignJWT(payload)
      .setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT',
      })
      .setIssuer(ENV.jwt.publicKey)
      .setExpirationTime(options.expiresIn)
      .setNotBefore(0)
      .setSubject(payload.user.id)
      .setJti(payload.user.id)
      .sign(secret);
    // return sign(payload, ENV.jwt.secret, options);
  },
  verify: async (token: string): Promise<ITokenResponsePayload | any> => {
    try {
      return (
        await jose.jwtVerify(token, secret, {
          issuer: ENV.jwt.publicKey,
        })
      ).payload;
    } catch (error) {
      // console.log(error);
      return null;
    }
  },

  verifyRefreshToken: async (token: string): Promise<ITokenResponsePayload> => {
    try {
      const decoded = (await JWTHelper.verify(token)) as ITokenResponsePayload;
      if (decoded.isRefreshToken) {
        return decoded;
      }
    } catch (error) {
      return null;
    }
  },

  extractToken: (bearderToken: any): string => {
    const token = bearderToken.replace(/Bearer\s+/gm, '');
    return token;
  },

  makeAccessToken: async (data: ITokenRequestPayload): Promise<string> => {
    const configAccess = {
      payload: {
        ...data,
      },
      options: {
        algorithm: 'HS512',
        expiresIn: ENV.jwt.tokenExpireIn,
      },
    };
    return await JWTHelper.sign(configAccess.payload, configAccess.options);
  },

  makeRefreshToken: async (data: ITokenRequestPayload): Promise<string> => {
    const configAccess = {
      payload: {
        ...data,
      },
      options: {
        algorithm: 'HS512',
        expiresIn: ENV.jwt.refreshTokenExpireIn,
      },
    };
    return await JWTHelper.sign(configAccess.payload, configAccess.options);
  },

  isJwtExpired: (exp: number): boolean => {
    const date: Date = new Date(exp * 1000);
    const parsedDate = Date.parse(date.toString());
    if (parsedDate - Date.now() > 0) {
      return false;
    } else {
      return true;
    }
  },
  isExpiredToken: async (token: string) => {
    const verifyUser = await JWTHelper.verify(token);

    const isJwtExpired = JWTHelper.isJwtExpired(verifyUser?.exp);
    if (!verifyUser || isJwtExpired || !UserRoles[verifyUser.user?.role])
      return true;

    return false;
  },
  decodedToken: async (token: string): Promise<ITokenResponsePayload> => {
    const verifyUser: ITokenResponsePayload = await JWTHelper.verify(token);
    return verifyUser;
  },
};
