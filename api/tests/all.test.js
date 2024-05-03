const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const req = require('supertest')
const User = require('../models/user.model')



describe('AUTH->-> POST /api/user/signup', () => {

    it('should return a 400 status if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/user/signup')
            .send({email: '', password: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual("All fields are required");
    });
    
    it('should return a 400 status if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/user/signup')
            .send({ name: 'testUser', email: 'notITemail@gmail.com', password: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual("All fields are required");
    });
    
    it('should return a 400 status if email does not follow the required format for students', async () => {
        const response = await request(app)
            .post('/api/user/signup')
            .send({ email: 'notITemail@test.com', password: 'password123' });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual("All fields are required");
    });
    
    it('should signup successfully with correct data', async () => {
        const uniqueEmail = `IT21201714@test.com`;
        const response = await request(app)
            .post('/api/user/signup')
            .send({ name: 'testUser', email: uniqueEmail, password: 'password123'});
        expect(response.statusCode).toBe(200);
    });
    

})

describe('AUTH->-> POST /api/user/signin', () => {
    let userId
    afterAll(async () => {
        await User.findByIdAndDelete(userId)
        // await mongoose.disconnect()
    })

    beforeAll(async () => {
        await request(app)
            .post('/api/user/signup')
            .send({
                name: 'testUser',
                email: 'IT21201714@test.com',
                password: 'password123'
            });
    });

    it('should return a 400 status if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/user/signin')
            .send({ email: '', password: '' });
        expect(response.statusCode).toBe(400);
    });

    it('should return a 404 status if the user is not found', async () => {
        const response = await request(app)
            .post('/api/user/signin')
            .send({ email: 'nonexistentuser@example.com', password: 'randomPassword' });
        expect(response.statusCode).toBe(404);
    });

    it('should sign in successfully with correct credentials', async () => {
        const response = await request(app)
            .post('/api/user/signin')
            .send({ email: 'IT21201714@test.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.headers['set-cookie']).toBeDefined()

        // Assuming the token is set as an HTTP-only cookie
        const cookies = response.headers['set-cookie'][0];
        const tokenString = cookies.split(';')[0].split('=')[1];
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET_KEY); // Use verify to both decode and verify the token
        userId = decoded.id;
    });

})
