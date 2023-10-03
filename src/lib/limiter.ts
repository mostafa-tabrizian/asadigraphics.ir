import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
   tokensPerInterval: 25,
   interval: 'min',
   fireImmediately: true,
})

export default limiter