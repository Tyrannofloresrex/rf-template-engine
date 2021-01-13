const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function employeeQuestions(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your id#?"
        }, 
        {
            type: "input",
            name: "email",
            message: "What is your E-mail @ddress?"
        },
        {
            type: "list",
            name: "role",
            message: "What is your role with the company?",
            choices: ["Manager", "Engineer", "Intern"],
        }


    ]).then ((info)=>{
        switch (info.role) {
            case "Manager":
                getOfficeNum(info);
                break;

            case "Engineer":
                getGithub();
                break;

            case "Intern":
                getSchool();
                break;
            
            default:
                break;   
        }
})
} employeeQuestions()
// TODO:Ask user if they want to make another account
function getOfficeNum(answer){
    inquirer.prompt ([
        {
            type: "input",
            name: "officeNum",
            message: "What is your office number?"
        }
    ]).then(answer => {
        console.log(data)
        console.log(answers)
        const newManager = new Manager (name, id, email, officeNum)
    }) 
    return
}

function getGithub(){
    inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is your Git Hub ID?"
        }
    ]).then (answers => {
        console.log(answers)
        Engineer.github = answers.github
        Engineer.prototype.role = "Engineer"
    })
    return
}

function getSchool(){
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What school are you enrolled at?"
        }
    ]).then (answers => {
        console.log(answers)
        Intern.school = answers.school
        Intern.prototype.role = "Intern"
    })
    return
}

// TODO:function getRole() {

// }
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
