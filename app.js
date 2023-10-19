const express = require("express"); // loads the express package
const {
  engine
} = require("express-handlebars"); // loads handlebars for Express
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser')
const session = require("express-session")
const SQLiteStore = require('connect-sqlite3')(session)
const cookieParser = require('cookie-parser')
const port = 3000; // defines the port
const bcrypt = require('bcrypt')
const app = express(); // creates the Express application

// defines handlebars engine
app.engine("handlebars", engine());
// defines the view engine to be handlebars
app.set("view engine", "handlebars");
// defines the views directory
app.set("views", "./views");

//MiddleWares
//difine static directory "public"
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: false
}))

const db = require('./db');
const e = require("express");

app.use(session({
  secret: "ShukriIsTooAwesome&zwEEtByWinterrr",
  saveUninitialized: false,
  resave: false,
  store: new SQLiteStore({
    database: "sessions.db"
  })
}))

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn
  next()
})

// CONTROLLER (THE BOSS)
app.get("/", function (req, res) {
  res.render("home.handlebars");
});

app.get("/about", (req, res) => {
  db.getAllSkill((err, skills) => {
    if (err) {
      console.log(err)
      res.render('about.handlebars', {
        m_skills: {}
      })
    } else {
      console.log(skills)
      db.getAllEducation((err, educations) => {
        if (err) {
          console.log(err)
          res.render('about.handlebars', {
            m_educations:{}
          })
        } else {
          console.log(educations)
          db.getAllExperience((err, experience) => {
            if (err) {
              console.log(err)
              res.render('about.handlebars', {
                m_experience:{}
              })
            } else {
              console.log(experience)
              res.render('about.handlebars', {
                m_skills: skills,
                m_educations: educations,
                m_experience: experience
              })
            }
          })
        }
      })
    }
  })
});


app.get("/contact", (req, res) => {
  res.render("contact.handlebars");
});

//Renders the login page
app.get('/login', (req, res) => {
  res.render('login.handlebars');
});



app.get("/about/skills/create", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  res.render('createSkill.handlebars')
});

app.post("/about/skills/create", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  const skill = {
    name: req.body.name,
    desc: req.body.desc
  }
  db.createSkill(skill.name, skill.desc, function (error) {
    res.redirect('/about')
  })
});

app.get("/about/experiences/create", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  else {
    res.render('createExperience.handlebars')
  }
});

app.post("/about/experiences/create", (req, res) => {
    const experience = {
      name: req.body.name,
      desc: req.body.desc,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    }

  db.createExperince(experience.name, experience.desc, experience.startDate, experience.endDate, function (error) {
    console.log(experience)
    res.redirect('/about')
  })

});

app.get("/projects", (req, res) => {
  db.getAllProjects((err, projects) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      model = {
        projects
      }
    }
    console.log("model")
    console.log(model)
    res.render('projects.handlebars', model)
  })
});

app.get("/projects/create", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  res.render('createProject.handlebars')
});

app.post("/projects/create", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  const project = {
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.image,
    link: req.body.link,
    date: req.body.date
  }
  console.log(project)
  db.createProject(project.title, project.desc, project.img, project.link, project.date, function (error) {
    res.redirect('/projects')
  })
});

app.get("/projects/:id", (req, res) => {
  const id = req.params.id
  db.getProjectByID(id, (err, project) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      const model = {
        project
      }
      res.render('project.handlebars', model)
    }
  })
});


app.get("/projects/:id/update", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  const id = req.params.id

  db.getProjectByID(id, (err, project) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      const model = {
        project
      }
      res.render('updateProject.handlebars', model)
    }
  })
})



app.post('/projects/:id/update', (req, res) => {
  const id = req.params.id
  const project = {
    projectTitle: req.body.title,
    projectDesc: req.body.desc,
    projectImage: "no image",
    projectLink: req.body.link,
    projectDate: req.body.date
  }

  if (req.session.isLoggedIn == true && req.session.isAdmin == true) {
    //const id = req.params.id; // You need to get the id from the request parameters
    db.updateProjectById(
      id,
      project.projectTitle,
      project.projectDesc,
      project.projectImage,
      project.projectLink,
      project.projectDate,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Project updated!");
          res.redirect('/projects/' + id);
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});

app.post('/projects/:id/delete', (req, res) => {
  const id = req.params.id

  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true) {
    res.redirect('/login')
  }

  db.deleteProjectById(id, function (err) {
    if (err) {
      return res.status(500).send(err)
    } else {
      console.log("Project deleted!");
      res.redirect('/projects')
    }
  })
})

// app.get("/about/skills", (req, res) => {
 
//   if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
//     res.redirect('/login')
//   }
//   else {
//     res.render('createSkill.handlebars')
//   }
  
// })

app.get("/about/skills/:id", (req, res) => {
  const id = req.params.id

  db.getSkillByID(id, (err, skill) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      const model = {
        skill
      }
      res.render('skill.handlebars', model)
    }
  })
})


app.get("/about/skills/:id/update", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true) {
    res.redirect('/login')
  }

  const id = req.params.id

  db.getSkillByID(id, (err, skill) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      const model = {
        skill
      }
      console.log(skill)
      res.render('updateSkills.handlebars', model)
    }
  })
});

app.post('/about/skills/:id/update', (req, res) => {
  const id = req.params.id
  const skill = {
    skillName: req.body.name,
    skillDesc: req.body.desc,

  }

  if (req.session.isLoggedIn === true && req.session.isAdmin === true) {
    db.updateSkillById(
      id,
      skill.skillName,
      skill.skillDesc,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Skill updated!");
          res.redirect('/about/skills/' + id);
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});

app.post('/about/skills/:id/delete', (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true) {
    res.redirect('/login')
  }
  const id = req.params.id

  db.deleteSkillById(id, (err) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      res.redirect('/about')
    }
  })
})

app.get("/about/educations/create", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  res.render('createEducation.handlebars')
});

app.post("/about/educations/create", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true){
    res.redirect('/login')
  }
  const education = {
    name: req.body.title,
    desc: req.body.desc,
    startDate: req.body.start,
    endDate: req.body.end

  }
  db.createEducation(education.name, education.desc, education.startDate, education.endDate, function (error) {
    res.redirect('/about')
  })
});

app.get("/about/educations/:id/update", (req, res) => {
  const id = req.params.id

  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true) {
    res.redirect('/login')
  }

  db.getEducationByID(id, (err, education) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      const model = {
        education
      }
      res.render('updateEducation.handlebars', model)
    }
  })
});

app.post('/educations/:id/update', (req, res) => {
  const id = req.params.id
  const education = {
    educationName: req.body.educationName,
    educationDesc: req.body.educationDesc,
    educationStartDate: req.body.educationStartDate,
    educationEndDate: req.body.educationEndDate
  }

  if (req.session.isLoggedIn === true && req.session.isAdmin === true) {
    //const id = req.params.id; // You need to get the id from the request parameters
    db.updateProjectById(
      id,
      education.educationName,
      education.educationDesc,
      education.educationStartDate,
      education.educationEndDate,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("education updated!");
          res.redirect('/Aboutme/' + id);
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});


app.get("/experiences/:id/update", (req, res) => {
  if (req.session.isLoggedIn !== true || req.session.isAdmin !== true) {
    res.redirect('/login')
  }
  const id = req.params.id

  db.getexperienceByID(id, (err, experience) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      const model = {
        experience
      }
      res.render('updateExperience.handlebars', model)
    }
  })
});

app.post('/experiences/:id/update', (req, res) => {
  const id = req.params.id
  const experience = {
    experienceName: req.body.experienceName,
    experienceDesc: req.body.experienceDesc,
    experienceStartDate: req.body.experienceStartDate,
    experienceEndDate: req.body.experienceEndDate
  }

  if (req.session.isLoggedIn === true && req.session.isAdmin === true) {
    //const id = req.params.id; // You need to get the id from the request parameters
    db.updateExperienceById(
      id,
      experience.experienceName,
      experience.eexperienceesc,
      experience.eexperienceStartDate,
      experience.experienceEndDate,
      (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("experience updated!");
          res.redirect('/Aboutme/' + id);
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});


const adminUsername = "Dema"
const hash = "$2a$10$tESSlBBd11ON9QDRLzZuTu6COuk3DNxhpMZJ.AQtJoGFLGG5GDm72"

app.post('/login', (req, res) => {
  const username = req.body.un
  const password = req.body.pw
  const error = []

  bcrypt.compare(password, hash, (err, result) => {

    console.log(result)
    if (err) {
      error.push("authentication failed")
      const model = { error } 
      res.render("login.handlebars", model)
    } else {
      if (result && username == adminUsername) {

        req.session.isLoggedIn = true
        req.session.isAdmin = true
        res.redirect("/")
      } else {
        error.push("wrong username or password")
        const model = { error }
        res.render('login.handlebars', model)
      }
    }
  })
})

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

app.use(function (req, res) {
  res.status(404).render('404.handlebars')
});

// runs the app and listens to the port
app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});