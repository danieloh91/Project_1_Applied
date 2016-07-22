function index(req, res) {
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
