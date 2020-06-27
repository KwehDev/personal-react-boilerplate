import { NextApiRequest } from 'next';
import nextConnect from 'next-connect';

import { SESSION_COOKIE_NAME } from '../../../../src/constants';
import { AuthenticatedRequest } from '../../../../src/server/auth/types';
import {
  authNSecurityMiddleware,
  sentryMiddleware,
} from '../../../../src/server/middlewares';
import { RequestHandler } from '../../../../src/server/types';

const meHandler: RequestHandler<NextApiRequest & AuthenticatedRequest> = (
  req,
  res
) => {
  return res.json(req[SESSION_COOKIE_NAME]);
};

export default nextConnect()
  .use(sentryMiddleware)
  .use(authNSecurityMiddleware)
  .get(meHandler);
