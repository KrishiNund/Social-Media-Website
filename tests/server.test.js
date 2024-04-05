const {connectToMongoDB,signup,app,getUserStatus} = require('../server')
const request = require('supertest');

test('Successfully connects to mongodb', async () => {
    const result = await connectToMongoDB();
    expect(result).not.toBeNull();
})

test('Sucessfully stores user details when signing up', async () => {
    userDetails = {
        "fullName": "john",
        "username": "john11",
        "email": "john11@gmail.com",
        "password": "hello1234",
        "gender": "male",
        "dob": "2002-03-07"
    }
    const result = await signup(userDetails);
    //check if insertedId is not undefined, that is if it exists
    expect(result.insertedId).toBeDefined();
})

test('Server is running on the correct port', async () => {
    const PORT = 3000;
    const server = app.listen(PORT);
    expect(server.address().port).toBe(PORT);
    server.close()
})

test('Returns "Logged Out" message when username is not in session', async () => {
    const req = {session: {}};
    //create mock response object
    const res = {send:jest.fn()};

    getUserStatus(req,res);

    expect(res.send).toHaveBeenCalledWith({message:"Logged Out",data:"None"});
})

test('GET / should return status 200',async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
})
