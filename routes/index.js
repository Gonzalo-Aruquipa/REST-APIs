const Router = require("express");

const router = Router();

module.exports = function() {


  router.get("/", (req, res)=> {
    res.send("as")
  })

  return router;
}
