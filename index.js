const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const didiserv = require("./functions/factory");
// const didiRoutes = require("./routes/didiRoutes");
const postgres = require("pg");
const Pool = postgres.Pool;

const app = express();

let useSSL = false;
let local = (process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" || false);
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://codex:pg123@localhost:5432/dididata";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const didi = didiserv(pool);
// const route = didiRoutes(didi);

app.use(
  session({
    secret: "error messages",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs.engine());
// app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render("index");
  });

  app.get('/index', async function(req, res){
	try{
		res.render("index")
	}catch(error){
		console.log(error)
	}
});

app.get('/about', async function(req, res){
	try{
		res.render("about")
	}catch (error){
		console.log(error)
	}
});

app.get('/invoices', async function(req, res){
	try{
		res.render("invoices")
	}catch(error){
		console.log(error)
	}
});

app.get('/contact', async function(req, res){
	try{
		res.render("contact")
	}catch(error){
		console.log(error)
	}
});

app.post('/invoice', async function(req, res, next) {
	try {
	  let outstanding = req.body.outstanding;
	  let names = req.body.textBoxBttn;
  
	  if (outstanding == undefined && names == "") {
		req.flash("info", "Please enter the name and select type of invoice!");
		res.render("invoices", {
		  count: await didi.poolTable(),
		});
	  } else if (outstanding == undefined) {
		req.flash("info", "Please select the type of invoice!");
		res.render("invoices", {
		  count: await didi.poolTable(),
		});
	  } else if (names == "") {
		req.flash("info", "Please enter a valid name!");
		res.render("invoices", {
		  count: await didi.poolTable(),
		});
	  } else {
		didi.Message(outstanding, names);
		await didi.setNames(names);
		res.render("invoices", {
		  pull: didi.getPull(),
		  count: await didi.poolTable(),
		});
		
	  }
	} catch (error) {
	  next(error);
	}
  });

app.post('/invoice', async function(req, res) {
	try {
	  res.render("invoices", {
		requestTimes: await didi.poolTable(),
	  });
	} catch (error) {
	  console.log(error);
	}
  });

app.get('/requests', async function(req, res) {
	try {
	  var nameList = await didi.getNames();
	  // console.log(nameList)
	  res.render("requests", {
		namesList: nameList,
	  });
	} catch (error) {
	  console.log(error);
	}
  });

app.get('/veiws/:username', async function(req, res) {
	var name = req.params.username;
	let rqstNames = await didi.getUserName(name);
	console.log(rqstNames);
	res.render("veiws", {
	  username: name,
	  requestTimes: rqstNames,
	});
  });

app.post('/home', function(req, res) {
	res.redirect("invoices");
  });


let PORT = process.env.PORT || 1812;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});