const sqlite3 = require('sqlite3')
const database = new sqlite3.Database('portfolio-databases.db')

database.run(`
    CREATE TABLE IF NOT EXIST Projects(
        projectid INTEGER PRIMARY KEY AUTOINCREMENT,
        projectTitle TEXT,
        projectDesc TEXT,
        projectImage TEXT,
        projectLink TEXT,
        projectDate TEXT
    )`
    
)

database.run(`
    CREATE TABLE IF NOT EXIST Skills(
        Skillid INTEGER PRIMARY KEY AUTOINCREMENT,
        SkillName TEXT,
        SkillDesc TEXT
    )`
    
)

database.run(`
    CREATE TABLE IF NOT EXIST Education(
        Educationid INTEGER PRIMARY KEY AUTOINCREMENT,
        EducationName TEXT,
        EducationDesc TEXT,
        EducationStartDate TEXT,
        EducationEndDate TEXT,
    )`
    
)

database.run(`
    CREATE TABLE IF NOT EXIST Experience(
        Experienceid INTEGER PRIMARY KEY AUTOINCREMENT,
        ExperienceName TEXT,
        ExperienceDesc TEXT,
        ExperienceStartdate TEXT,
        ExperienceEndDate TEXT,
    )`
    
)

exports.getAllProjects = function(callback){
    const query = "SELECT * From Projects ORDER BY id DESC"

    database.all(query, function(error, res){
        callback(error, res)
    })
}


