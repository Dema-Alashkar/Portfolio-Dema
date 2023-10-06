const express = require("express"); // loads the express package
const { engine } = require("express-handlebars"); // loads handlebars for Express
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser')

const port = 3000; // defines the port
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

app.use(bodyParser.urlencoded({extended: false}))

const db = new sqlite3.Database('projects-dema.db')

/*
// creates table projects at startup
db.run("CREATE TABLE projects (projectid INTEGER PRIMARY KEY, projectTitle TEXT NOT NULL, projectDesc TEXT NOT NULL, projectImage TEXT NOT NULL, projectLink TEXT, projectDate TEXT NOT NULL)", (error) => {
  if (error) {
    // tests error: display error
    console.log("ERROR: ", error)
  } else {
    // tests error: no error, the table has been created
    console.log("---> Table projects created!")
    const projects=[
      { "id":"1", "title":"Databases Conceptual", "desc":"Conseptual Diagram for Meza Nuts", "urlImg": "/img/DatabaseConIMG.jpeg", "link": "", "date":"2023" },
      { "id":"2", "title":"Database Logical", "desc":"Logiacl Diagram for Meza Nuts", "urlImg": "/img/DatabaseLogIMG.jpeg", "link": "", "date":"2023" },
      { "id":"3", "title":"CV", "desc":"My Fisrt CV using HTML and CSS", "urlImg": "/img/CVIMG.jpeg", "link": "", "date":"2023" },
      { "id":"4", "title":"Use Case", "desc":"Use Case for a Flight Booking systm With Diagrams", "urlImg": "/img/UseCaseIMG.jpeg", "link": "https://github.com/Dema-Alashkar/OOAD-lab01/blob/main/Lab-01-OOA:D.pdf", "date":"2023" },
      { "id":"5", "title":"Academic System Domain And Design Modeling", "desc":"Developing a domain model for an academic system and reverse-engineered a design model from code, showcasing expertise in object-oriented softwear development and UML-class diagramming", "urlImg": "/img/DiagramIMG.jpeg", "link": "https://github.com/Dema-Alashkar/OOAD-Lab02/blob/main/Lab02-OOA:D%20(2).pdf", "date":"2023" },
    ]
    // inserts projects
    projects.forEach( (oneProject) => {
      db.run("INSERT INTO projects (projectid, projectTitle, projectDesc, projectImage, projectLink, projectDate) VALUES (?, ?, ?, ?, ?, ?)", [oneProject.id, oneProject.title, oneProject.desc, oneProject.urlImg, oneProject.link, oneProject.date], (error) => {
        if (error) {
          console.log("ERROR: ", error)
        } else {
          console.log("Line added into the projects table!")
        }
      })
    })
  }
})
*/
/*db.run("CREATE TABLE IF NOT EXISTS Skills (Skillid INTEGER PRIMARY KEY, SkillName TEXT NOT NULL, SkillDesc TEXT NOT NULL)", (error) => {
  if (error) {
    console.log("ERROR: ", error);
  } else {
    console.log("---> Table Skills created!");
    const Skills = [
      {"id": "1", "Name": "C++", "Desc": "Proficient in programming language C++"},
      {"id": "2", "Name": "SQL", "Desc": "Proficient in programming language SQL"},
      {"id": "3", "Name": "HTML", "Desc": "Proficient in programming language HTML"},
      {"id": "4", "Name": "CSS", "Desc": "Proficient in programming language CSS"},
      {"id": "5", "Name": "Java", "Desc": "Proficient in programming language Java"},
      {"id": "6", "Name": "Javascript", "Desc": "Proficient in programming language Javascript"},
      {"id": "7", "Name": "Qt Creator", "Desc": "Proficient in using the Qt Creator integrated development environment (IDE) for C++ application development"},
      {"id": "8", "Name": "Azure", "Desc": "Proficient in using Azure Data Studio for database development, management, and query execution"},
      {"id": "9", "Name": "Visual Studio Code (VS Code)", "Desc": "Experienced in using Visual Studio Code as a versatile code editor with extensions for various programming languages and development tasks"},
      {"id": "10","Name": "Microsoft Office", "Desc": "Proficient in using Microsoft Office suite for word processing, spreadsheet analysis, presentations, email management and more"}
    ];
    // inserts Skills
    Skills.forEach((oneSkill) => {
      db.run("INSERT INTO Skills (SkillID, SkillName, SkillDesc) VALUES (?, ?, ?)", [oneSkill.id, oneSkill.Name, oneSkill.Desc], (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the Skills table!");
        }
      });
    });
  }
});
*/

/*
db.run("CREATE TABLE IF NOT EXISTS Education (Educationid INTEGER PRIMARY KEY, EducationName TEXT NOT NULL, EducationDesc TEXT NOT NULL, EducationStartDate TEXT NOT NULL, EducationEndDate TEXT NOT NULL)", (error) => {
  if (error) {
    console.log("ERROR: ", error);
  } else {
    console.log("---> Table Education created!");
    const Education = [
      {"id": "1", "Name": "High School", "Desc": "Completed high school education in Social Science With A Specialization In Psychology In Per Brahegymnasiet Jönköping", "StartDate": "2018", "EndDate": "2021"},
      {"id": "2", "Name": "Course In Business Administration", "Desc": "Took a Business Administration course in Per Brahegymnasiet Jönköping", "StartDate": "2019", "EndDate": "2019"},
      {"id": "3", "Name": "Technical Fundamental Year", "Desc": "Completed a technical fundamental year in Jönköpings University", "StartDate": "2021", "EndDate": "2022"},
      {"id": "4", "Name": "Online Course In Leadership", "Desc": "Took an online course in Leadership at Jönkping University", "StartDate": "2022", "EndDate": "2022"},
      {"id": "5", "Name": "Bachelor's In Software Development And Mobile Platforms", "Desc": "Currently studying Software Development And Mobile Platforms In Jönköping University", "StartDate": "2022", "EndDate": "2025"}
    ]; 
    // inserts Education
    Education.forEach((oneEducation) => {
      db.run("INSERT INTO Education (EducationID, EducationName, EducationDesc, EducationStartDate, EducationEndDate) VALUES (?, ?, ?, ?, ?)", [oneEducation.id, oneEducation.Name, oneEducation.Desc, oneEducation.StartDate, oneEducation.EndDate], (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the Education table!");
        }
      });
    });
  }
});
*/

/*
db.run("CREATE TABLE IF NOT EXISTS Experience (ExperienceId INTEGER PRIMARY KEY, ExperienceName TEXT NOT NULL, ExperienceDesc TEXT NOT NULL, ExperienceStartDate TEXT NOT NULL, ExperienceEndDate TEXT NOT NULL)", (error) => {
  if (error) {
    console.log("ERROR: ", error);
  } else {
    console.log("---> Table Experience created!");
    const Experience = [
      {"id": "1", "Name": "E-Challenge", "Desc": "Participated in E-Challenge at Jönköping University for Husqvarna", "StartDate": "2023", "EndDate": "2023"},
      {"id": "2", "Name": "Meza Nuts AB", "Desc": "Worked at Meza Nuts AB as a packager", "StartDate": "2022", "EndDate": "2022"},
      {"id": "3", "Name": "Meza Nuts AB", "Desc": "Worked at Meza Nuts AB as a photographer", "StartDate": "2023", "EndDate": "2023"},
      {"id": "5", "Name": "Meza Nuts AB", "Desc": "Worked at Meza Nuts AB as a production leader", "StartDate": "2023", "EndDate": "2023"},
      {"id": "4", "Name": "FN-challenge", "Desc": "Participated in the FN challenge in high school and won the challenge with my team", "StartDate": "2019", "EndDate": "2019"}
       ]; 
    // inserts Experience
    Experience.forEach((oneExperience) => {
      db.run("INSERT INTO Experience (ExperienceID, ExperienceName, ExperienceDesc, ExperienceStartDate, ExperienceEndDate) VALUES (?, ?, ?, ?, ?)", [oneExperience.id, oneExperience.Name, oneExperience.Desc, oneExperience.StartDate, oneExperience.EndDate], (error) => {
        if (error) {
          console.log("ERROR: ", error);
        } else {
          console.log("Line added into the Experience table!");
        }
      });
    });
  }
});
*/


// CONTROLLER (THE BOSS)
app.get("/", function (request, response) {
  response.render("home.handlebars");
});

app.get("/aboutme", (request, response) => {
  db.all("SELECT * FROM education", (error, theProjects) => {
    if (error) {
      const model = {
        hasError: true,
        theError: error,
        projects: []
      }
      response.render("projects.handlebars", model)
    } else {
      const model = {
        hasError: false,
        theError: "",
        projects: theProjects
      }
      response.render("projects.handlebars", model)
    }
  })
});


app.get("/projects", (request, response) => {
  db.all("SELECT * FROM projects", (error, theProjects) => {
    if (error) {
      const model = {
        hasError: true,
        theError: error,
        projects: []
      }
      response.render("projects.handlebars", model)
    } else {
      const model = {
        hasError: false,
        theError: "",
        projects: theProjects
      }
      response.render("projects.handlebars", model)
    }
  })
});

app.get("/contact", (request, response) => {
  response.render("contact.handlebars");
});


//Renders the login page
app.get('/login',(req, res) => {
  res.render('login.handlebars');
});

app.post('/login',(req, res) => {
  const un = req.body.un
  const pw = req.body.pw

  if(un == "Dema" && pw == "f2A4Dzv6U"){
    console.log("Dema is Logged in!")
    res.redirect('/')
  }else{
    console.log('Bad user and/or bad password')
    res.redirect('/login')
  }
})

app.use(function(req,res){
  res.status(404).render('404.handlebars')
});

// runs the app and listens to the port
app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});



