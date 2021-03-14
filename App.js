const email = document.querySelector('#email');
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const card = document.querySelector('#card')
const memberCard = document.querySelector('#memberCard')
const editCard = document.querySelector('#editCard')
const inputs = document.querySelectorAll('input');
const output = document.querySelector('#users')
const text = document.querySelector('#emailExists')

let users = [
  {
    id: 1,
    firstName: 'Jonatan',
    lastName: 'Saveljeff',
    email: 'Saveljeffjonatan@gmail.com',
  },
  {
    id: 2,
    firstName: 'Github',
    lastName: '',
    email: 'https://github.com/Saveljeffjonatan',
    homepage: 'https://github.com/Saveljeffjonatan'
  },
  {
    id: 3,
    firstName: 'LinkedIn',
    lastName: '',
    email: 'https://www.linkedin.com/in/jonatan-saveljeff-a94650109/',
    homepage: 'https://www.linkedin.com/in/jonatan-saveljeff-a94650109/'
  }
]

//* Toggles between register a user and view users.
const showHide = () => {
  if(memberCard.classList.contains('collapse')) {
    card.classList.toggle('collapse')
    memberCard.classList.toggle('collapse')
  } else {
    card.classList.toggle('collapse')
    memberCard.classList.toggle('collapse')
  }
}

//? This function checks for a valid input then adds an css class for pass or fail.
const validate = (id) => {
  let input = document.querySelector(id);

  if(input.value.trim() === '' || input.value.length < 2) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');

    input.focus();
    return false;

  } else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true;
  }
}

//? The E-mail address validation that I use is from Ian Dunn which was made as an improvement from Warren Gaebel's regex. An even better validator would be this: https://github.com/dominicsayers/isemail if used on the serverside.
const validateEmail = (_email) => {
  let regEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

  //* Checks if our user is trying to register an existing email address then validates the email with our regex if returned
  if(users.find(user => user.email === email.value)) {
    text.classList.remove('collapse')
    _email.classList.remove('is-valid');
    _email.classList.add('is-invalid');
    return false
  }
  else if(regEx.test(_email.value)) {
    _email.classList.add('is-valid');
    _email.classList.remove('is-invalid');
    text.classList.add('collapse')
    return true;
  }
  else {
    _email.classList.remove('is-valid');
    _email.classList.add('is-invalid');
    _email.focus();
    return false;
  }
}

//? This function checks what type of input is being entered and then calls for the appropriate validation function.
inputs.forEach(input => {
  input.addEventListener('keyup', function() {

    let id = '#' + input.id;
    console.log('id', id)
    if(input.type === 'text'){
      validate(id);
    }else{
      validateEmail(input);
    }
  })
})

//? This is the logic for creating a user (what dependencies we need)
const createUser = (firstName, lastName, email) => {
  let user = {
    id: users.length + 1,
    firstName,
    lastName,
    email
  }

  users.push(user);
}

//? This lets us update the firstname and lastname while only displaying the email address that corresponds to the user.
const updateUser = (userID) => {
  const firstNameEdit = document.querySelector('#firstName-edit')
  const lastNameEdit = document.querySelector('#lastName-edit')
  const user = users.find(user => user.id === userID)

  user.firstName = firstNameEdit.value
  user.lastName = lastNameEdit.value

    renderUsers()

}

//* This is the template for our edit UI.
const displayEditForm = (userID) => {
  editCard.innerHTML = '';
  let user = users.find(user => user.id === userID)
  memberCard.classList.toggle('collapse')
  editCard.classList.toggle('collapse')

  let template =
  `
    <h1>Edit user</h1>

  <div class="row">
      <div class="form-goup col-md-6 mb-3">
        <input type="text" id="firstName-edit" class="form-control" value="${user.firstName}" placeholder="First Name">
        <div class="invalid-feedback">
          Please enter your firstname atleast 2 characters long.
        </div>
      </div>

      <div class="form-goup col-md-6 mb-3">
        <input type="text" id="lastName-edit" class="form-control" value="${user.lastName}" placeholder="Last Name">
        <div class="invalid-feedback">
          Please enter your lastname atleast 2 characters long.
        </div>
      </div>

      <div class="form-goup col-md-12 mb-3">
      <h2>${user.email}</h2>
      </div>
    </div>
    <button class="btn editUserInput" onClick="updateUser(${user.id})">Save</button>
    `

    editCard.innerHTML = template;
}

//* This is the template for rendering our user. It's made with innerHTML or more accurately as react has named it "_dangerouslySetInnerHTML".
const renderUsers = () => {
  output.innerHTML = '';


  users.forEach(user => {
    if(user.id === 1) {
      let template = `
      <div class="user d-flex justify-content-between align-items-center mb-4">
      <div id=${user.id} class="text">
        <h2>${user.firstName} ${user.lastName}</h2>
        <small>${user.email}</small>
      </div>
    </div>
    `

    output.innerHTML += template

    } else if(user.id === 2) {

      let template = `
      <div id="2" class="user d-flex justify-content-between align-items-center mb-4">
        <div id=${user.id} class="text">
          <h2>${user.firstName} ${user.lastName}</h2>
          <a href="${user.homepage}" target="_blank">My Github</a>
        </div>
      </div>
      `

      output.innerHTML += template

    } else if(user.id === 3) {

      let template = `
      <div class="user d-flex justify-content-between align-items-center mb-4 text-align-center">
        <div id=${user.id} class="text">
          <h2>${user.firstName} ${user.lastName}</h2>
          <a href="${user.homepage}" target="_blank">My Linkedin</a>
        </div>
      </div>
      `

      output.innerHTML += template

    } else {

    let template = `
    <div id=${user.id} class="user d-flex justify-content-between mb-4">
      <div class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
      <div class="buttons">
        <button class="btn-small btn-primary" onClick="displayEditForm(${user.id})">Change</button>
        <button class="btn-small btn-danger">X</button>
      </div>
    </div>
    `

    output.innerHTML += template;

    }
  })
}
renderUsers();

//? Simple function that resets the input fields and css classes.
const resetForm = () => {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
    input.classList.remove('is-valid');
  })
}


memberCard.addEventListener('click', e => {
  let userID = e.target.parentNode.parentNode.id

  //* Deletes the member from the users array.
  if(e.target.classList.contains('btn-danger')) {
    users = users.filter(user => user.id != userID)
    e.target.parentNode.parentNode.remove()
  }
})

//* Displays the edit user card
editCard.addEventListener('click', e => {
    e.preventDefault

  if(e.target.classList.contains('editUserInput')) {
    editCard.classList.toggle('collapse')
    memberCard.classList.toggle('collapse')
  }
})

//* Validates the user input and returns a new user if validation is successful.
regForm.addEventListener('submit', (e) => {
  e.preventDefault();


  if(validateEmail(email) && validate('#firstName') && validate('#lastName')) {
      createUser(firstName.value, lastName.value, email.value);
      renderUsers();
      resetForm();
  }
})
