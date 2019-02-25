var fs = require('fs');
var customers = {}
//create new user
exports.create = function(req, res) {
	
	var newCustomer = req.body;
	customers["customer" + newCustomer.id] = newCustomer;
	
	console.log("--->After Post, customers:\n" + JSON.stringify(customers, null, 4));

	fs.writeFile ("myjsonfile.json", JSON.stringify(customers, null, 4), function(err) {
		if (err) throw err;
		res.end(JSON.stringify(newCustomer, null, 4));
		console.log('complete create user');
		}
	)
};
//find all user
exports.findAll = function(req, res) {
	fs.readFile('myjsonfile.json',function(err,customers){
		if(err) throw err;
		res.end(customers);  
	})
};

exports.findOne = function(req, res) {
  fs.readFile('myjsonfile.json',function(err,customers){
		if(err) throw err;
    var customer = customers["customer" + req.params.id];
		console.log("--->Find customer: \n" + JSON.stringify(customer, null, 4));
    res.end( "Find a Customer:\n" + JSON.stringify(customer, null, 4));
  })
};

exports.update = function(req, res) {
	fs.readFile('myjsonfile.json',function(err,customers){
  if(err) throw err;
	var id = parseInt(req.params.id);
	var updatedCustomer = req.body; 
	if(customers["customer" + id] != null){
		// update data
		customers["customer" + id] = updatedCustomer;

		console.log("--->Update Successfully, customers: \n" + JSON.stringify(customers, null, 4))

    fs.writeFile ("myjsonfile.json", JSON.stringify(updatedCustomer, null, 4), function(err) {
      if (err) throw err;
      res.end("Update Successfully! \n" + JSON.stringify(updatedCustomer, null, 4));
      console.log('complete update user');
      })
	} else {
		res.end("Don't Exist Customer:\n:" + JSON.stringify(updatedCustomer, null, 4));
	}
})};

exports.delete = function(req, res) {
  fs.readFile('myjsonfile.json',function(err,customers){
    if(err) throw err;
	var deleteCustomer = customers["customer" + req.params.id];
    delete customers["customer" + req.params.id];
    console.log("--->After deletion, customer list:\n" + JSON.stringify(customers, null, 4) );
    res.end( "Deleted customer: \n" + JSON.stringify(deleteCustomer, null, 4));
  });
  fs.writeFile('myjsonfile.json',JSON.stringify(customers),function(err){
    if(err) throw err;
  })
}