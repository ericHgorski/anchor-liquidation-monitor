
const { getRequestHandler } = require('../totals/index')

describe('totals api controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(async (done) => {
    done()
  })

  afterAll(async () => {})

  describe('/info', () => {
    it('should return a json with a total_borrowed field', async (done) => {
      const res = await getRequestHandler['/']
      expect(JSON.parse(res)).toHaveProperty('total_borrowed')
      done()
    })
  })
})
