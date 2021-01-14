const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");

// Array stores Employee info
const currentEmployees = []

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");




// Inquirer prompt asks user series of questions about typical employees
function mainQuestions(){
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's id#?"
    }, 
    {
        type: "input",
        name: "email",
        message: "What is the employee's E-mail @ddress?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role with the company?",
        choices: ["Manager", "Engineer", "Intern"],
    }
        // Prompt moves into switch case to determine what type of Employee is answering mainQuestions, then asks specific questions based on that extended Employee class.
        ]).then ((info) =>{
            switch (info.role) {
            case "Manager":
                getOfficeNum(info);
                break;
            case "Engineer":
                getGithub(info);
                break;
            case "Intern":
                getSchool(info);
                break;
            default:
                break;   
        }
    }) 
} 
mainQuestions()

// Specific question for Manager class.
function getOfficeNum(info){
    inquirer.prompt ([
        {
            type: "input",
            name: "officeNum",
            message: "What is this manager's office number?"
        }
    ]).then(answer => {
        
        const newManager = new Manager (info.name, info.id, info.email, answer.officeNum)
        addEmployee(newManager)
        
    }) 
    return
}
// Specific question for Engineer class
function getGithub(info){
    inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is this engineer's Git Hub ID?"
        }
    ]).then (answer => {
        
        const newEngineer = new Engineer (info.name, info.id, info.email, answer.github)
        addEmployee(newEngineer)
    })
    return
}
// Specific question for Intern class
function getSchool(info){
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What school is this intern enrolled at?"
        }
    ]).then (answer => {
        
        const newIntern = new Intern (info.name, info.id, info.email, answer.school)
        addEmployee(newIntern)
    })
    return
}
// After Employee based questions are answered, user is prompted to make another employee profile or render employee information to html
function askMore() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Do you want to add another employee? If not, we will now render your employees."
        }
        // If user confirms "yes", the question suite runs again, if "no" render function begins
    ]).then (confirm => {
        if (confirm.confirm === true) {
            
            return mainQuestions()
        // Uses render function to put Employee object info into HTML format and then writes to HTML page
        } fs.writeFile("employees.html", render(currentEmployees), (err) => {
        
            if (err) {
                throw err
            } else {
                console.log("Success!")
            }
        })
           
        
    })
}
// Function adds Employee objects to array
function addEmployee (employee) {
    currentEmployees.push(employee)
    askMore()
}



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
