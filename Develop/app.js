const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let staff = [];
let idArray = [];

function appStart() {
    function addManager() {
        console.log("Create Staff");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What's your manager's name?"
            },
            {
                type: "input",
                name: "managerDepartment",
                message: "What's your manager's Department?"
            },
            {
                type: "input",
                name: "managerContact",
                message: "What's your manager's Phone Number?"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerDepartment, answers.managerContact);
            staff.push(manager);
            idArray.push(answers.managerId);
            addStaff();
        });
    };

    function addStaff() {
        inquirer.prompt([
            {
                type: "list",
                name: "pickStaff",
                message: "Who are you adding?",
                choices: [
                    "Engineer",
                    "Intern",
                    "My team is complete"
                ]
            }
        ]).then(userPicks => {
            switch (userPicks.pickStaff) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    assembleStaff();
            }
        })
    };

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What's your engineer's name?"
            },
            {
                type: "input",
                name: "engineerSpec",
                message: "What's your engineer's Specialization?"
            },
            {
                type: "input",
                name: "engineerBack",
                message: "What's your engineer's Background?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What's your engineer's username on Github?"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerSpec, answers.engineerBack, answers.engineerGithub);
            staff.push(engineer);
            idArray.push(answers.engineerId);
            addStaff();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What's your intern's name?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "Where does this Intern study?"
            },
            {
                type: "input",
                name: "internGoals",
                message: "Whhat is this Intern's end Goal?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What's this intern's email?"
            }
        ]).then(answers => {
            const intern = new intern(answers.internName, answers.internSchool, answers.internGoals, answers.internEmail);
            staff.push(intern);
            idArray.push(answers.internId);
            addStaff();
        });
    }
    function assembleStaff() { 
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
          }
          fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    addManager();
}

appStart();
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
