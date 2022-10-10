import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("1.Testing Endpoint",()=>{
    it("gets the api/images endpoint",async ()=>{
        const response = await request.get('/api/images?filename=icelandwaterfall&height=200&width=300');

        expect(response.status).toBe(200); 
    })
    it("testing if the image does not exist",async ()=>{
        const response = await request.get('/api/images?filename=test&height=200&width=300');
        
        expect(response.status).toBe(404); 
    })
    it("testing if the filename is missing",async ()=>{
        const response = await request.get('/api/images?height=200&width=300');
        
        expect(response.status).toBe(404); 
    })
    it("testing if the hieght is missing",async ()=>{
        const response = await request.get('/api/images?filename=icelandwaterfall&width=300');
        
        expect(response.status).toBe(404); 
    })
    it("testing if the width is missing",async ()=>{
        const response = await request.get('/api/images?filename=icelandwaterfall&height=200');
        
        expect(response.status).toBe(404); 
    })
});


describe("2.Testing resize function",()=>{

    it("expect resize function to throw error if height or width is 0 or less",async ()=>{
        const response = await request.get('/api/images?filename=icelandwaterfall&height=0&width=300');
        
        expect(response.text).toEqual("Please make sure that the hieght and width are more than 0"); 
    })
    it("expect resize function to throw error if height or width have any charecter",async ()=>{
        const response = await request.get('/api/images?filename=icelandwaterfall&height=500&width=f300');
        
        expect(response.text).toEqual("Please make sure that the hieght and width do not have any characters in them"); 
    })
});