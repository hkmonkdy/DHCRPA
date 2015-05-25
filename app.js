var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routeIndex = require('./routes/index');
var routeApplications = require('./routes/applications');
var routeApplication = require('./routes/application');

var controllerMongoDB = require('./controllers/mongoDB');

var app = module.exports = express();

// config                         

app.set('view engine', 'ejs');    
app.set('views', __dirname + '/views');                     

// middleware                     

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'Jevons', 
                 saveUninitialized: true,
                 resave: true}));
app.use(express.static(path.join(__dirname, 'public')));   

// Session-persisted message middleware                     

app.use(function(req, res, next){
  var err = req.session.error     
    , msg = req.session.success;  
  delete req.session.error;       
  delete req.session.success;

  res.locals.message = '';        
  if (err) res.locals.message = err;
  if (msg) res.locals.message = '';
 
  next();                         
});                               

// dummy database                 

var users = {                     
  jevons: { name: 'jevons' }              
};                                

// when you create a user, generate a salt                  
// and hash the password ('foobar' is the pass here)        

/*
hash('foobar', function(err, salt, hash){                   
  if (err) throw err;             
  // store the salt & hash in the "db"                      
  users.tj.salt = salt;           
  users.tj.hash = hash.toString();
});
*/


// Authenticate using our plain-object database of doom!    

function authenticate(name, pass, fn) {                     
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name.toLowerCase()];
  // query the db for the given username
  if (!user) return fn(new Error('cannot find user'));
  // apply the same algorithm to the POSTed password, applying the hash against the pass / salt, if there is a match we found the user
  /*
  hash(pass, user.salt, function(err, hash){
    if (err) return fn(err);
    if (hash.toString() == user.hash) return fn(null, user);
    fn(new Error('invalid password'));
  })
  */
  
  console.log("pass");
  if(pass != "dhcrp"){
	fn(new Error('invalid password'));
  }else{
	return fn(null, user);
  }
}                                 

function restrict(req, res, next) {                         
  if (req.session.user) {         
    next();                       
  } else {                        
    //req.session.error = 'Access denied!';                   
    res.redirect('/login');       
  }                               
}                                                                         

app.get('/logout', function(req, res){                      
  // destroy the user's session to log them out             
  // will be re-created next request                        
  req.session.destroy(function(){ 
    res.redirect('/');
  });                             
});                               

app.get('/login', function(req, res){                       
  res.render('login');
});

app.post('/login', function(req, res){                      
  authenticate(req.body.userName, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in                 
      // to prevent fixation      
      req.session.regenerate(function(){                    
        // Store the user's primary key                     
        // in the session store to be retrieved,            
        // or in this case the entire user object           
        req.session.user = user;  
        req.session.success = 'Authenticated as ' + user.name                                 
          + ' click to <a href="/logout">logout</a>. '      
          + ' You may now access <a href="/restricted">/restricted</a>.';

		res.locals.session = req.session;
        res.render('index');
      });                         
    } else {                      
      req.session.error = 'Authentication failed, please check your '                         
        + ' username and password.';                       
      res.redirect('login');      
    }                             
  });                             
});



app.get('/applications', function(req, res){                       
  routeApplications.applications(req, res, controllerMongoDB);
});

app.get('/application', function(req, res){                       
  routeApplication.application(req, res, controllerMongoDB);
});

app.post('/updateApplicationStatus', function(req, res){                       
  res.sendStatus(200);
});

app.post('/searchApplications', function(req, res){                       
  routeApplication.application(req, res, controllerMongoDB);
});

app.get('/inquiries', function(req, res){                       
  res.render('inquiries');
});

app.get('/inquiry', function(req, res){                       
  res.render('inquiry');
});

app.get('/index', function(req, res){                      
    res.redirect('/');
});  

//app.get('/', restrict, function(req, res, controllerMongoDB){
app.get('/', function(req, res){
  routeIndex.index(req, res, controllerMongoDB);
});   

app.listen(3001);                   
console.log('Express started on port ' + 3001);