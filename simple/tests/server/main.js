import assert from "assert";



// var assert = require('assert')

describe('basicTest',function(){
    describe('Multiplication',function(){
        it('should equal 15 when 5 is multiplied by 3', function(){
        var result = 5*3
        assert.equal(result,15)    
        })
    })
})


describe("simple", function () {
  // it("package.json has correct name", async function () {
  //   const { name } = await import("../package.json");
  //   assert.strictEqual(name, "simple");
  // });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
