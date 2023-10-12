import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
   tokensPerInterval: 34, // 5 search and 3 home visit in a min
   interval: 'min',
   fireImmediately: true,
})

export default limiter
