const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);
const {describe, test, after, beforeEach, before} = require("node:test");
const assert = require("assert");
let TOKEN;
let id;


const createUserAndLogin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({});
            const userResponse = await api.post("/api/users").send({
                username: "testitopi",
                name: "Topi",
                password: "topinsalis"
            });

            if (userResponse.body.error) {
                return reject(new Error(userResponse.body.error));
            }

            const loginResponse = await api.post("/api/login").send({
                username: "testitopi",
                password: "topinsalis"
            });

            if (loginResponse.body.error) {
                return reject(new Error(loginResponse.body.error));
            }

            TOKEN = loginResponse.body.token;
            id = loginResponse.body.id;
            console.log("User ID:", id);
            console.log("Token:", TOKEN);
            setTimeout(() => {
                console.log("Timeout done")
                resolve();
            }, 2000);
        } catch (error) {
            reject(error);
        }
    });
};

before(async () => {
    try {
        await createUserAndLogin();
    } catch (error) {
        reject(error);
    }
})



const testBlogList = [
    {
      title: 'Pipsa possu',
      author: 'JM LATVALA',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
        title: 'CCCP',
        author: 'Rico187',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 11,
      },
      {
        title: 'Kampela',
        author: 'Rico187',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
      }
  ]


beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of testBlogList) {
        const blogToSend = {...blog};
        const resp = await api.post("/api/blogs").set('authorization', `Bearer ${TOKEN}`).send(blogToSend);
    }
})

describe("GET blogs tests", () => {
    test("Returns right amount of blogs", async () => {
        const res = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        assert.strictEqual(res.body.length, 3);
    })
    test("Blogs have id field", async () => {
        const res = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        if (res.body.length === 0) assert.strictEqual(res.body.length, 0);
        const hasID = res.body.reduce((hasID, item) => item.id ? true : false, true);
        assert.strictEqual(hasID, true);
    })
    test("Get blogs without token succeeds", async () => {
        const res = await api.get("/api/blogs");
        assert.strictEqual(res.status, 200);
    } )
})

describe("Add blog tests", () => {
    const sampleBlog = {
        title: "Saku Sammakko",
        author: "Saku Samis",
        url: "http://sakunsivu.fi/",
        likes: 2
    }

    test("Adding a blog works", async () => {
        const res1 = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        const a = res1.body.length;
        await api.post("/api/blogs").set("authorization", `Bearer ${TOKEN}`).send(sampleBlog);
        const res2 = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        const b = res2.body.length
        assert.strictEqual((b - a), 1);
    })
    test("Adding a blog with no likes field", async () => {
        const result = await api.post("/api/blogs").set("authorization", `Bearer ${TOKEN}`).send({
            title: "No likes blog",
            author: "Non liked author",
            url: "http://nolikes.com/"
        });
        assert.strictEqual(result.status, 201);
        assert.strictEqual(result.body.likes, 0);
    })
    
    test("Add blog with no title results in 400", async () => {
        const result = await api.post("/api/blogs").set("authorization", `Bearer ${TOKEN}`).send({
            author: "Minä",
            url: "http://minäminä.fi",
            likes: 2
        })
        assert.strictEqual(result.status, 400);
    })

    test("Add blog with no url results in 400", async () => {
        const result = await api.post("/api/blogs").set("authorization", `Bearer ${TOKEN}`).send({
            title: "Minun blogini",
            author: "Minä",
            likes: 2
        })
        assert.strictEqual(result.status, 400);
    })
})

describe("Deleting blog tests", () => {
    test("Deleting a blog", async () => {

        const res = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        const blogs = res.body;

        await api.delete(`/api/blogs/${blogs[0].id}`).set("authorization", `Bearer ${TOKEN}`);
        

        const res2 = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        const newBlogs = res2.body;

        assert.strictEqual((blogs.length - newBlogs.length), 1)
    })
    test("Deleting a invalid ID results in ERROR", async () => {
        const response = await api.delete("/api/blogs/93bogus02").set("authorization", `Bearer ${TOKEN}`);
        assert.strictEqual(response.status, 400);

    })
})

describe("Updating blogs test", () => {
    test("Update an existing blog", async () => {
        const res = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        const blogToDelete = res.body[0];
        
        const result = await api.put("/api/blogs").set("authorization", `Bearer ${TOKEN}`).send({
            ...blogToDelete,
            likes: blogToDelete.likes + 1,
            user: blogToDelete.user.id
        })
        const res2 = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        const updatedBlog = res2.body.reduce((match, curr) => blogToDelete.id === curr.id ? curr : match, {});

        assert.strictEqual(updatedBlog.id, blogToDelete.id);
        assert.strictEqual((blogToDelete.likes + 1), updatedBlog.likes);

    })
    test("Trying to update with invalid object", async () => {
        const res = await api.get("/api/blogs").set("authorization", `Bearer ${TOKEN}`);
        const blogToDelete = res.body[0];
        blogToDelete.id = "GIBBERISH";
        const result = await api.put("/api/blogs").set("authorization", `Bearer ${TOKEN}`).send({
            ...blogToDelete,
            likes: blogToDelete.likes + 1
        });

        
        assert.strictEqual(result.status, 400)

    })
})

describe("Unauthorized tests", () => {
    test("Post a blog no token", async() => {
        const res = await api.post("/api/blogs").send({
            title: "Testinki",
            author: "Testi Taavi",
            url: "http://eimitöön.fi/",
            likes: 1
        });

        assert.strictEqual(res.status, 401);
    })

    test("Get blogs invalid token", async () => {
        const res = await api.get("/api/blogs").set("authorization", `Bearer 8935h3hgwskbf!`);
        assert.strictEqual(res.status, 400);
    })
    
    test("Remove blog that is not own", async () => {
        const sampleBlog = {
            title: "Saku Sammakko",
            author: "Saku Samis",
            url: "http://sakunsivu.fi/",
            likes: 2
        }
        // Add a new blog
        const res = await api.post("/api/blogs").set("authorization", `Bearer ${TOKEN}`).send(sampleBlog);
        const blog = res.body;

        // Add a new user
        await api.post("/api/users").send({
            username: "testitopi2",
            name: "Topitopi",
            password: "topinsaliz"
        });

        const loginResponse = await api.post("/api/login").send({
            username: "testitopi2",
            password: "topinsaliz"
        });

        const tok = loginResponse.body.token;

        // Delete a blog that is not created by this user

        const response = await api.delete(`/api/blogs/${blog.id}`).set("authorization", `Bearer ${tok}`);
        assert.strictEqual(response.status, 401);


    })
})

after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    
})