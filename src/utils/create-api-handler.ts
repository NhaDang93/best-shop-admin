import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// import { WebsiteConfig, getConfig } from '..'

export type WebsiteApiHandler<
  T = any,
  H extends WebsiteHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<WebsiteApiResponse<T>>,
  // config: WebsiteConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void> | Promise<boolean>;

// export interface WebsiteApiHandler<
//   T = any,
//   H extends WebsiteHandlers = {},
//   Options extends {} = {}
// > {
//   (
//     req: NextApiRequest,
//     res: NextApiResponse<WebsiteApiResponse<T>>,
//     // config: WebsiteConfig,
//     handlers: H,
//     // Custom configs that may be used by a particular handler
//     options: Options,
//   ): void | Promise<void>
// }

export type WebsiteHandler<T = any, Body = null> = (options: {
  req: NextApiRequest;
  res: NextApiResponse<WebsiteApiResponse<T>>;
  body: Body;
}) => void | Promise<void> | Promise<boolean>;

export type WebsiteHandlers<T = any> = {
  [k: string]: WebsiteHandler<T, any>;
};

export type WebsiteApiResponse<T> = {
  data: T | null;
  errors?: { message: string; code?: string }[];
};

export default function createApiHandler<
  T = any,
  H extends WebsiteHandlers = {},
  Options extends {} = {}
>(
  handler: WebsiteApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    // config,
    operations,
    options,
  }: {
    operations?: Partial<H>;
    options?: Options extends {} ? Partial<Options> : never;
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers };
    const opts = { ...defaultOptions, ...options };

    return function apiHandler(req, res) {
      return handler(req, res, /* getConfig(config), */ ops, opts);
    };
  };
}
