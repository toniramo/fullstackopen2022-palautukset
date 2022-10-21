describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Timo Tonttu',
      username:'timot',
      password: 'salainen123'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.get('form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'Login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="username"]').type('timot');
      cy.get('input[name="password"]').type('salainen123');
      cy.get('#login-button').click();
      cy.contains('Timo Tonttu logged in.');
    });

    it('fails with wrong credentials', function() {
      cy.get('input[name="username"]').type('timot');
      cy.get('input[name="password"]').type('321nenialas');
      cy.get('#login-button').click();

      cy.get('.notification.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'background-color', 'rgb(255, 192, 203)');

      cy.get('html').should('not.contain', 'Timo Tonttu logged in.');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'timot', password: 'salainen123' });
    });

    it('A blog can be created', function() {
      cy.get('#blogs')
        .should('not.contain', 'Uusi ploki');

      cy.contains('button', 'New blog').click();
      cy.get('input[name="title"]').type('Uusi ploki');
      cy.get('input[name="author"]').type('Tuntematon kirjoittaja');
      cy.get('input[name="url"]').type('uusi.ploki.foo');
      cy.get('#create-button').click();

      cy.get('.info')
        .should('contain', 'A new blog Uusi ploki by Tuntematon kirjoittaja added.')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('#blogs')
        .should('contain', 'Uusi ploki');
    });

    describe('and some blogs exists', function() {
      let blog1, blog2, blog3;
      beforeEach(function() {
        blog1 = {
          title: 'Blog1',
          author: 'Author1',
          url: 'url.1',
          likes: 0
        };

        blog2 = {
          title: 'Blog2',
          author: 'Author2',
          url: 'url.2',
          likes: 3
        };

        blog3 = {
          title: 'Blog3',
          author: 'Author3',
          url: 'url.3',
          likes: 2
        };

        cy.addBlog(blog1);
        cy.addBlog(blog2);
        cy.addBlog(blog3);

      });
      it('blog can be liked', function() {
        cy.get('#blogs')
          .contains(blog1.title)
          .siblings()
          .contains('button', 'View')
          .click();

        cy.get('#blogs')
          .contains(blog1.title)
          .parent()
          .parent()
          .as('testBlog');

        cy.get('@testBlog')
          .contains(`likes: ${blog1.likes}`)
          .contains('button', 'Like')
          .click();

        cy.get('@testBlog')
          .contains(`likes: ${blog1.likes+1}`);
      });
    });
  });
});