function index(req, res) {
  /* TODO: If you are going to use the apiController please include all routes available in your API. -jc */
  res.json({
    message: "Welcome to Applied!",
    documentation_url: "Will come",
    base_url: "Will come",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
