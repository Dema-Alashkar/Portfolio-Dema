const sqlite3 = require('sqlite3')
const database = new sqlite3.Database('portfolio-databases.db')

database.run(`
    CREATE TABLE IF NOT EXISTS Projects(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectTitle TEXT,
        projectDesc TEXT,
        projectImage TEXT,
        projectLink TEXT,
        projectDate TEXT
    )`
)

database.run(`
    CREATE TABLE IF NOT EXISTS Skills(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        SkillName TEXT,
        SkillDesc TEXT
    )`
    
)

database.run(`
    CREATE TABLE IF NOT EXISTS Education(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        EducationName TEXT,
        EducationDesc TEXT,
        EducationStartDate TEXT,
        EducationEndDate TEXT
    )`
    
)

database.run(`
    CREATE TABLE IF NOT EXISTS Experience(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ExperienceName TEXT,
        ExperienceDesc TEXT,
        ExperienceStartdate TEXT,
        ExperienceEndDate TEXT
    )`
    
)
exports.createProject = function(title, desc, img, link, date, callback) {
    const query = "INSERT INTO Projects (projectTitle, projectDesc, projectImage, projectLink, projectDate) VALUES (?,?,?,?,?)"
    const values = [title, desc, img,link, date]
    console.log(query)
    console.log(values)
    database.run(query,values,function(error){
        callback(error)
    })
}

exports.getAllProjects = function(callback){
    const query = "SELECT * FROM Projects ORDER BY id DESC"

    database.all(query, function(error, res){
        callback(error, res)
    })
}
exports.getProjectByID = function(id, callback){
    const query = "SELECT * FROM Projects WHERE id = ? LIMIT 1"
    const value = id

    database.get(query, value, function(error, res){
        callback(error, res)
    }) 
}

exports.updateProjectById = function(id, projectTitle, projectDesc, projectImage, projectLink, projectDate, callback ){
    const query = "UPDATE Projects SET projectTitle = ?, projectDesc = ?, projectImage = ?, projectLink = ?, projectDate = ? WHERE id = ?"
    const values = [projectTitle, projectDesc, projectImage, projectLink, projectDate, id]

    database.run(query, values, function (error){
        callback(error)
    })
}

exports.deleteProjectById = function(id, callback){
    const query = "DELETE FROM Projects WHERE id = ?"
    const values = id

    database.run(query, values, function (error, res) {
        if (error) {
            console.log(error)
        } else {
            console.log(res)
            callback(error, res)
        }
    })
}
// Skills
exports.createSkill = function(Skillname, Skilldesc, callback) {
    const query = "INSERT INTO Skills (SkillName, skillDesc) VALUES (?,?)"
    const values = [Skillname, Skilldesc]
    database.run(query,values,function(error){
        callback(error)
    })
}


exports.getAllSkill = function(callback){
    const query = "SELECT * From Skills ORDER BY id DESC"

    database.all(query, function(error, res){
        callback(error, res)
    })
}

exports.getSkillByID = function(id, callback){
    const query = "SELECT * FROM Skills WHERE id = ? LIMIT 1"
    const value = id

    database.get(query, value, function(error, res){
        callback(error, res)
    })
}

exports.updateSkillById = function(Skillid , SkillName, SkillDesc, callback){
    const query = "UPDATE Skills SET SkillName = ?, SkillDesc = ? WHERE id = ?"
    const values = [SkillName, SkillDesc, Skillid]

    database.run(query, values, function (error){
        callback(error)
    })
}

exports.deleteSkillById = function(id, callback){
    const query = "DELETE FROM Skills WHERE id = ?"
    const value = id

    database.run(query, value, function(error, res){
        callback(error, res)
    })
}
//Education

exports.createEducation = function(EducationName, EducationDesc, EducationStartDate, EducationEndDate, callback) {
    const query = "INSERT INTO Education (EducationName, EducationDesc, EducationStartDate, EducationEndDate) VALUES (?, ?, ?, ?)"
    const values = [EducationName, EducationDesc, EducationStartDate, EducationEndDate]
    database.run(query,values,function(error){
        callback(error)
    })
}


exports.getAllEducation = function(callback){
    const query = "SELECT * From Education ORDER BY id DESC"

    database.all(query, function(error, res){
        callback(error, res)
    })
}

exports.getEducationByID = function(id, callback){
    const query = "SELECT * FROM Education WHERE id = ? LIMIT 1"
    const value = id

    database.get(query, value, function(error, res){
        callback(error, res)
    })
}

exports.updateEducationById = function(Educationid, EducationName, EducationDesc, EducationStartDate, EducationEndDate, callback){
    const query = "UPDATE Education SET EducationName = ?, EducationDesc = ?, EducationStartDate = ?, EducationEndDate = ?, WHERE id = ?"
    const values = [EducationName, EducationDesc, EducationStartDate, EducationEndDate, Educationid]

    database.run(query, values, function (error){
        callback(error)
    })
}

exports.deleteEducationById = function(id, callback){
    const query = "DELETE FROM Education WHERE id = ?"
    const value = id

    database.run(query, value, function(error, res){
        callback(error, res)
    })
}

//Experince

exports.createExperince = function(ExperienceName, ExperienceDesc, ExperienceStartDate, ExperienceEndDate, callback) {
    const query = "INSERT INTO Experience (ExperienceName, ExperienceDesc, ExperienceStartDate, ExperienceEndDate) VALUES (?, ?, ?, ?)"
    const values = [ExperienceName, ExperienceDesc, ExperienceStartDate, ExperienceEndDate]
    console.log(query)
    console.log(values)
    database.run(query,values,function(error){
        callback(error)
    })
}

exports.getAllExperience = function(callback){
    const query = "SELECT * From Experience ORDER BY id DESC"

    database.all(query, function(error, res){
        callback(error, res)
    })
}

exports.getExperienceByID = function(id, callback){
    const query = "SELECT * FROM Experience WHERE id = ? LIMIT 1"
    const value = id

    database.get(query, value, function(error, res){
        callback(error, res)
    })
}

exports.updateExperienceById = function(id , ExperienceName, ExperienceDesc, ExperienceStartdate, ExperienceEndDate, callback){
    const query = "UPDATE Experience SET ExperienceName = ?, ExperienceDesc = ?, ExperienceStartdate = ?, ExperienceEndDate = ? WHERE id = ?"
    const values = [ExperienceName, ExperienceDesc, ExperienceStartdate, ExperienceEndDate, id]

    database.run(query, values, function (error){
        callback(error)
    })
}

exports.deleteExperienceById = function(id, callback){
    const query = "DELETE FROM Experience WHERE id = ?"
    const value = id

    database.run(query, value, function(error, res){
        callback(error, res)
    })
}

