
const { getRequestHandler } = require('../totals')

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
      const res = await getRequestHandler['/info']
      expect(JSON.parse(res)).toHaveProperty('total_borrowed')
      done()
    })
  })
})
