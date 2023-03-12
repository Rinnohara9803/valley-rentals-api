const request=require('supertest')
const app=require('../src/app')
describe('Test user data Get /user/myprofile',()=>{
    test('should be fail with 403 status code', async() => { 
        const response=await request(app).get('/user/myprofile')
        expect(response.statusCode).toBe(403)
     })
})
describe('Test Create new user POST /user/',()=>{
    test('should be success with status code 201',async()=>{
        let Data={
            "Email":"wakandaForever@gmail.com",
            "Password":"Wakanda@31",
            "Contact":"9810213412",
            "Gender":"Male",
            "DOB":"12/05/2000",
            "Fullname":"Wakada Forever"
        }
        const response=await request(app).post('/user/',Data)
        expect(response.statusCode).toBe(201)
    })
})