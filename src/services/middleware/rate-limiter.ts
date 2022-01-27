
// would create basic rate limiter using 'express-rate-limit' and 'rate-limit-mongo'
// and pass to endpoints as middleware. exmaple below

// export const rateLimiter = new RateLimit({
//   store: new MongoStore({
//     uri: MONGODB_URL,
//     expireTimeMs: 60 * 60 * 1000 * 24,
//     collectionName: 'rateLimiter',
//     errorHandler: function (msg: any) {
//       console.error(`Failed to update rate limiter ${msg}`)
//     }
//   }),
//   max: 130,
//   skipFailedRequests: true,
//   windowMs: 60 * 60 * 1000 * 24
// })
