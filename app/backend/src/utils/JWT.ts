import { Secret, sign } from 'jsonwebtoken';

const { JWT_SECRET = 'jwt_secret' } = process.env;

function generationToken(id: number, role: string): string {
  const payload = { id, role };
  const token = sign(payload, JWT_SECRET as Secret);
  return token;
}

export default generationToken;

// const generationToken = (id: number, role: string): string => {
//   const payload = { id, role };
//   const token = sign(payload, JWT_SECRET as Secret);
//   return token;
// };
