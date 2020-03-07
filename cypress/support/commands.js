// ***********************************************
// This example commands.js shows you how to
// create the custom command: 'login'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************
//
// Cypress.Commands.add("login", function(email, password){
//   var email    = email || "joe@example.com"
//   var password = password || "foobar"
//
//   var log = Cypress.Log.command({
//     name: "login",
//     message: [email, password],
//     consoleProps: function(){
//       return {
//         email: email,
//         password: password
//       }
//     }
//   })
//
//   cy
//     .visit("/login", {log: false})
//     .contains("Log In", {log: false})
//     .get("#email", {log: false}).type(email, {log: false})
//     .get("#password", {log: false}).type(password, {log: false})
//     .get("button", {log: false}).click({log: false}) //this should submit the form
//     .get("h1", {log: false}).contains("Dashboard", {log: false}) //we should be on the dashboard now
//     .url({log: false}).should("match", /dashboard/, {log: false})
//     .then(function(){
//       log.snapshot().end()
//     })
// })


//A function to expand Node 1
Cypress.Commands.add('expandNode1', () => {
    cy.get('.DropdownTree').click()
    cy.get('.TreeNodeExpandIcon > .SvgIcon').click()
})


//A function to expand Node 2
Cypress.Commands.add('expandNode2', () => {
    cy.get('.DropdownTree').click()
    cy.get('.TreeNodeExpandIcon > .SvgIcon').click()
    cy.get('[data-testid=TreeSelection__node-header-node2] > .TreeNode > .TreeNode__inner > .TreeNode__main > .TreeNodeExpandIcon > .SvgIcon > use').click()
})


//A function to select a node from the tree and assert that expectedText is displayed in the text bar, isChildOfNode2 === true in case the node is child of Node 2
Cypress.Commands.add('SelectNode', (node, expectedText, isChildOfNode2) => {
    
    cy.visit('http://storybook.b360-dev.autodesk.com/current/iframe.html?id=dropdowntree--default');

    if (isChildOfNode2 === true){
       cy.expandNode2()

    } else {
        cy.expandNode1()
    }
        cy.contains(node).click()
        cy.get('.DropdownTree__input-text > span').should('contain', expectedText) 
})



