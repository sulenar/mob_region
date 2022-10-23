import { Request, Response } from 'express';
import { findRegion } from './findRegoin';

type IGetRegion = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>> | void>;

export const getRegion: IGetRegion = async (req, res) => {
  const phone: string = req.params.phone
    .replace('+7', '8')
    .replace(/[^\d]/g, '');

  if (phone.length != 11) {
    res.writeHead(400, 'Bad request');
    return res.end('Error! Incorrect "phone" parameter');
  }

  const pref: string = phone.slice(1, 4);
  const num = phone.slice(4);

  const result = await findRegion(pref, num)
    .then((result: string): string => result)
    .catch((error: string): string => error);

  res.send(result);
};
