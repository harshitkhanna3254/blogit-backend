require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:8000${path}`;
let cookie;

describe("All Tests", () => {
  it("Register a new User", (done) => {
    console.log("Register Test");
    let user = {
      username: "testUser",
      email: "test@rice.edu",
      name: "Test User",
      password: "123",
      phoneNumber: 1234567890,
      zipcode: 560068,
      gender: "male",
      dob: "12/12/1998",
    };

    fetch(url("/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        expect(res.username).toEqual(user.username);
        expect(res.email).toEqual(user.email);
        done();
      });
  });

  it("Login a registered user", (done) => {
    console.log("Login Test");

    let user = {
      username: "testUser",
      password: "123",
    };

    fetch(url("/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        cookie = res.headers.get("set-cookie");
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual(user.username);
        expect(res.email).toEqual(user.email);
        done();
      });
  });

  it("Get the headline", (done) => {
    console.log("Get Headline Test");
    fetch(url("/profile/headline"), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testUser");
        expect(res.headline).toEqual("Welcome to Blog-It");
        done();
      });
  });

  it("Update the headline", (done) => {
    console.log("Update Headline Test");

    const newHeadlineObj = { headline: "New Headline" };

    fetch(url("/profile/headline"), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify(newHeadlineObj),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.username).toEqual("testUser");
        expect(res.headline).toEqual("New Headline");
        done();
      });
  });

  it("POST a new Article", (done) => {
    console.log("New Article Test");
    var article = { text: "New Post" };
    // console.log(cookie);
    fetch(url("/articles"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify(article),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.text).toEqual("New Post");
        expect(res.author).toEqual("testUser");
        done();
      });
  });

  it("Get all articles", (done) => {
    console.log("Get Articles Test");
    fetch(url("/articles"), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.articles.length).toEqual(1);
        done();
      });
  });

  it("Get article by id(username)", (done) => {
    console.log("Get Article by Id Test");
    fetch(url("/articles/testUser"), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.articles.length).toEqual(1);
        done();
      });
  });

  it("Logout the logged in user", (done) => {
    console.log("Logout Test");
    fetch(url("/auth/logout"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        expect(res.message).toEqual("Success");
        done();
      });
  });
});
