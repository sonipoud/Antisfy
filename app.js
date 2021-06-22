const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const teamMembers = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Manager
const employees = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },

        {
            type: 'input',
            name: 'Id',
            message: 'What is your ID number?'
        },

        {
            type: 'input',
            name: 'Email',
            message: 'What is your Email address?'
        },
        {
            type: 'list',
            choices: ['Manager', 'Engineer', 'Intern'],
            message: 'Please select your position at the company:',
            name: 'position'
        }
    ]).then((getStart) => {
        switch (getStart.position) {
            case "Manager":
                getManagerInfo();
                break;
            case "Engineer":
                getEngineerInfo();
                break;
            case "Intern":
                getInternInfo();
                break;
        }
    })
}

function getManagerInfo() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is your office number?'

        }
    ]).then((managerInfo) => {
        const managerObj = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber)
        teamMembers.push(managerObj);
        addEmployee();
    });
};

function getEngineerInfo() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'What is your github username?'
        }
    ]).then((engineerInfo) => {
        const engineerObj = new Engineer(engineerInfo.name, engineerInfo.id, engineerInfo.email, engineerInfo.github)
        teamMembers.push(engineerObj);
        addEmployee();
    });
}

function getInternInfo() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'school',
            message: 'What is the name of the school you attend?'
        }
    ]).then((internInfo) => {
        const internObj = new Intern(internInfo.name, internInfo.id, internInfo.email, internInfo.school)
        teamMembers.push(internObj);
        addEmployee();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Do you want to add any more employees?',
            name: 'position',
            choices: ['Manager', 'Engineer', 'Intern', 'No more employee to add'],
        }
    ]).then((user) => {
        switch (user.position) {
            case "Manager":
                employees();
                break;
            case "Engineer":
                employees();
                break;
            case "Intern":
                employees();
                break;
            case "No more employee to add":
            break;         
        };
    });
};

function buildHtml(){
    fs.writeFile(outputPath, render(teamMembers), function(err){
        if(err) {
            return console.log(err)
        }
    })
}

employees();





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
