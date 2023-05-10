const md5 = require('md5');
const User = require('../models/User');
const claim = require('../models/claim');
const session = require('express-session');
const express = require('express');
const Student = require('../models/Student');
// const Claim =require('../models/Claim');
const app = express();

// Display the form to create a new user
exports.displayCreateUserForm = (req, res) => {
  res.render('create-user');
};

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Create a new user
exports.createUser = async (req, res) => {
  // const { name, comment } = req.body;

  console.log('name:', req.body.name);
  console.log('comment:', req.body.list);


  try {
  req.send({ name: req.body.name, comment: req.body.list});

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Display all users
exports.displayUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.render('users-list', {
      users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

exports.signup = (req, res) => {
  res.render('signup')
}

exports.login = (req, res) => {
  res.render('login')
}


exports.insert_claim = async (req, res) => {
  let mati=req.body.mati
  let cmtr = req.body.arr;
  let d=[];
  let obj = JSON.parse(req.body.list);
  d.push(obj);
// res.send(obj);

const newClaim = new claim({
  marticule:mati  
  ,
  matiere: 
    obj
  ,
  commentaire: cmtr
});

newClaim.save()
  .then(() => {
    console.log('Claim created successfully');
    res.redirect('/studentclaim');
  })
  .catch(err => console.error(err));


  // try {
  //   const claim = await claim.create({
      
  //     d,
  //     cmtr
  //   });


  //   res.redirect('/');
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({
  //     success: false
  //     ,
  //     error: 'Server error'
  //   });
  // }
}



//insert claim
exports.insert = async (req, res) => {
  const { name, email, password } = req.body;

  console.log('name:', name);
  console.log('email:', email);
  console.log('password:', md5(password));

  try {
    const user = await User.create({
      name,
      email,
      password
    });


    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false
      ,
      error: 'Server error'
    });
  }

}

exports.auth = async (req, res) => {
  let letters = req.body.name.slice(0, 5);
  console.log("check:",Number(letters));

  try {
    // Check for admin account
    let check = await User.findOne({ email: req.body.name });
    // const matt=check.matricule;
    // console.log(matt)
    // console.log("checke:", checke);
    // console.log(req.body.name,req.body.password);
    if (req.body.name == "admin" && req.body.password == "admin") {
      
      req.session.isAdmin = true;
      req.session.save();
      res.redirect("/admin");
    } 
    else {
      if (check.password === req.body.password) {
        // Set session data
        // const checke = await Student.findOne({ matricule: check.matricule });
        console.log("gd", req.body.name)
        req.session.isLoggedIn = true;
        req.session.userName = req.body.name;
        req.session.mat=Number(letters);
        req.session.save();
        // Redirect to home page
        res.redirect('/studentclaim');
      } else {
        res.send("incorrect password");
      }
    }
  } catch (e) {
    console.log("ahmedou");
    res.send("wrong details");
  }
}

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
        console.log(err)
    } else {
        res.redirect('/')
    }
    })
};

exports.home = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('home', { naming: `${req.session.userName}` });
} else {
    res.redirect('/');
  }
}

exports.displayadmin = (req, res) => {

if (req.session.isAdmin) {
    res.render('adminclaim'); 
} else {
    res.redirect('/');
  }
}


exports.displayadminm = (req, res) => {
  if (req.session.isAdmin) {
    res.render('adminclainm'); 
} else {
    res.redirect('/');
  }
}


//adminc -> admin 
//admincm -> admin,adminsubject


exports.displayadmins = (req, res) => {
  if (req.session.isAdmin) {
    res.render('adminsubject'); 
    } else {
    res.redirect('/');
  }
}

exports.studentclaim = (req, res) => {

if (req.session.isLoggedIn) {
    
    res.render('studentclaim');
  } else {
  
    res.redirect('/');
  }
}


exports.studentclaimaff = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render('studentclaimaff')
  } else
    {
    res.redirect('/');
  }
}