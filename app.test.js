const request = require('supertest')
const app = require('./app')

describe('GET /plus/:num1/:num2',() => {
    it('responds with sum of two floating point numbers', async () => {
        const responds = await request(app).get('/plus/50.5/55.2')
        expect(responds.status).toBe(200)
        expect(responds.text).toBe("105.7")
    })

    it('responds with sum of two integer numbers', async () => {
        const responds = await request(app).get('/plus/2/3')
        expect(responds.status).toBe(200)
        expect(responds.text).toBe("5")
    })

    it('responds with sum of integer and floating point numbers', async () => {
        const responds = await request(app).get('/plus/2/3.8')
        expect(responds.status).toBe(200)
        expect(responds.text).toBe("5.8")
    })

    it('responds with error if two params not number', async () => {
        const responds = await request(app).get('/plus/num1/num2')
        expect(responds.status).toBe(400)
    })

    it('responds with error if first params not number', async () => {
        const responds = await request(app).get('/plus/num1/5')
        expect(responds.status).toBe(400)
    })

    it('responds with error if seconds params not number', async () => {
        const responds = await request(app).get('/plus/10/num2')
        expect(responds.status).toBe(400)
    })

    it('responds with error params is missing', async () => {
        const responds = await request(app).get('/plus/10')
        expect(responds.status).toBe(404)
    })

    afterAll(async () => {
        try {
          await app.close()
        }
        catch (err) {
          console.log(err)
        }
    });
})