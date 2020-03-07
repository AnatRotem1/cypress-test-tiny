/// <reference types="cypress" />

describe('page', () => {
  beforeEach(() => {
    cy.visit('http://storybook.b360-dev.autodesk.com/current/iframe.html?id=dropdowntree--default');
  })


  it('1. Assert the component shows a tree that contains nodes. Some of them have children', () => {
    cy.get('.DropdownTree').click()               //Verifies the component shows a tree
      .get('.TreeNode').should('be.visible')      //Verifies the tree contains nodes
    cy.get('.TreeNodeExpandIcon > .SvgIcon').click()
    cy.get('.TreeNode').children().should('contain', 'Node 2')//Verifies some of the tree nodes have children
      .and('be.visible') 
    })


  it('2. Assert you can only select one node', () => {
    cy.get('.DropdownTree').click()
    cy.get('.TreeNodeExpandIcon > .SvgIcon').click()
    cy.get('[data-testid=TreeSelection__node-header-node4] > .TreeNode').click()
    cy.get('.DropdownTree__input-text > span').should('contain', 'Node 1 > Node 4') //Verifies that the node selected is displayed in the text bar
    cy.get('.DropdownTree').click()   
    cy.get('.TreeNode > [data-testid=TreeSelection__selected-node]').should('have.length', 1) //Verifies only one node was chosen. there is a bug so will fail
    })


  it('3. Assert you can select all nodes in the tree, even ones with children.', () => {
    cy.SelectNode('Node 1', 'Node 1', false)
    cy.SelectNode('Node 2', 'Node 1 > Node 2', false)
    cy.SelectNode('Node 4', 'Node 1 > Node 4', false)
    cy.SelectNode('Node 3', 'Node 1 > Node 2 > Node 3', true)
    cy.SelectNode('Node 4', 'Node 1 > Node 2 > Node 4', true)
    cy.SelectNode('Node 5', 'Node 1 > Node 2 > Node 5', true)
    cy.SelectNode('Node 6', 'Node 1 > Node 2 > Node 6', true)
    cy.SelectNode('Node 7', 'Node 1 > Node 2 > Node 7', true)
    cy.SelectNode('Node 8', 'Node 1 > Node 2 > Node 8', true)
    cy.SelectNode('Node 9', 'Node 1 > Node 2 > Node 9', true)
    }) 


  it('4. Assert expand/Collapse functionality is available when clicking on the arrow of the node which has children', () => {
    //Expand Node 1
    cy.expandNode1()
    cy.get('.TreeNode').children().should('contain', 'Node 2').and('be.visible')
    cy.get('.TreeNode').children().should('contain', 'Node 4').and('be.visible')
    //Collapse Node 1 
    cy.get('[data-testid=TreeSelection__node-header-node1] > .TreeNode > .TreeNode__inner > .TreeNode__main > .TreeNodeExpandIcon > .SvgIcon').click()
    cy.should('not.contain', 'Node 2')
    cy.should('not.contain', 'Node 4')
    //Expand Node 2
    cy.expandNode2()
    cy.contains('Node 3').and('be.visible')
    //Collapse Node 2
    cy.get('[data-testid=TreeSelection__node-header-node2] > .TreeNode > .TreeNode__inner > .TreeNode__main > .TreeNodeExpandIcon > .SvgIcon > use').click()
    cy.should('not.contain', 'Node 3')
    })


    it('5. Assert when clicking on the label of a node with children, it will select it and not expand/collapse.', () => {
   //Node 1 is collapsed
    cy.SelectNode('Node 1', 'Node 1', false)
    cy.get('.DropdownTree').click()  //open the tree to see if it is collapsed or expanded
    cy.should('not.contain', 'Node 2')
    //Node 1 is expanded
    cy.get('.TreeNodeExpandIcon > .SvgIcon').click()
    cy.contains('Node 2')
    //Node 2 is collapsed
    cy.SelectNode('Node 2', 'Node 1 > Node 2', false)
    cy.get('.DropdownTree').click()  //open the tree to see if it is collapsed or expanded
    cy.should('not.contain', 'Node 3')
    //Node 2 is expanded
    cy.get('[data-testid=TreeSelection__selected-node] > .TreeNode__main > .TreeNodeExpandIcon > .SvgIcon > use').click()
    cy.contains('Node 3')
    })


    it('6. Asser cancel closes the dropdown and perform no action.', () => {
    cy.SelectNode('Node 5', 'Node 1 > Node 2 > Node 5', true)
    cy.get('.DropdownTree').click() 
    cy.get('.Button--link-secondary').click()

    //Cancel closes the dropdown
    cy.get('[data-testid=TreeSelection__node-header-node1] > .TreeNode > .TreeNode__inner').should('not.exist')
    cy.get('.ReactVirtualized__Grid__innerScrollContainer').should('not.exist')
    cy.get('.ReactVirtualized__Grid__innerScrollContainer').should('not.exist')

    //Cancel performes no action
    cy.get('.DropdownTree__input-text > span').should('contain', 'Node 1 > Node 2 > Node 5') 
    })


    it('7. Assert Clear button clears the selection.', () => { 
    cy.SelectNode('Node 5', 'Node 1 > Node 2 > Node 5', true)
    cy.get('.DropdownTree').click() 
    cy.get('.Button--link')

    //Clear deletes the selection
    cy.get('.DropdownTree__input-text > span').should('not.contain', 'Node 1 > Node 2 > Node 5') 
    })


    it('8. Assert dropdown tree is scrollable', () => {
    cy.expandNode2()
    cy.get('.ReactVirtualized__Grid').scrollTo('bottom') 
    })

      })

    


