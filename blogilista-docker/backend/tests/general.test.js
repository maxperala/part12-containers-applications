const {test, describe} = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const testBlogList = [
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Pipsa possu',
      author: 'JM LATVALA',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'CCCP',
        author: 'Rico187',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 11,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f3',
        title: 'Kampela',
        author: 'Rico187',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 0
      }
  ]

test('dummy test returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
})

describe('total likes', () => {
    test('List has one blog', () => {
        const list = [testBlogList[0]];
        const result = listHelper.totalLikes(list);
        assert.strictEqual(result, list[0].likes)

    })
    test('List has multiple blogs', () => {
        const result = listHelper.totalLikes(testBlogList);
        assert.strictEqual(result, 22);
    })
    test('List is empty', () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    })
})

describe('most liked', () => {
    test('List has multiple blogs', () => {
        const result = listHelper.favouriteBlog(testBlogList);
        assert.strictEqual(result, testBlogList[1]);
    })
    test('list is empty', () => {
        const result = listHelper.favouriteBlog([]);
        assert.strictEqual(result, undefined);
    })
})

describe('most blogs', () => {
    test('Most blogged author', () => {
        const result = listHelper.mostBlogs(testBlogList);
        assert.strictEqual(result.author, "Rico187");
    })
    test('Empty list returns undefined', () => {
        assert.strictEqual(listHelper.mostBlogs([]), undefined);
    })
})

describe('most liked', () => {
    test('most liked author', () => {
        const result = listHelper.mostLikes(testBlogList);
        assert.strictEqual(result.author, "Rico187");
    })
    test("Empty list returns undefined", () => {
        const result = listHelper.mostLikes([]);
        assert.strictEqual(result, undefined);
    })
})