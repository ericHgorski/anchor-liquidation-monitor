
import { getRequestHandler } from '../totals'

describe('totals api controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(async (done) => {
    done()
  })

  afterAll(async () => {})

  describe('/', () => {
    it('should return a json', async (done) => {
      const res = await getRequestHandler['/']
      expect(JSON.parse(res)).toHaveProperty('prices')
      done()
    })
  })
})
