
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.json([{
    id : 1,
    name : "Sohn",
    email: "miconblog@gmail.com"
  }, {
    id : 2,
    name : "Kim",
    email: "kim@email.com"
  }])
};

exports.add = function(req, res){
  res.json({
    success: "OK"
  })
};

exports.update = function(req, res){
  res.json({
    success: "OK"
  })
};

exports.remove = function(req, res){
  res.json({
    success: "OK"
  })
};


