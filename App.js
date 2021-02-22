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

const showHide = () => {
  if(memberCard.classList.contains('collapse')) {
    card.classList.toggle('collapse')
    memberCard.classList.toggle('collapse')
  } else {
    card.classList.toggle('collapse')
    memberCard.classList.toggle('collapse')
  }
}

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

//* The E-mail address validation that I use is from Ian Dunn which was made as an improvement from Warren Gaebel's regex. An even better validator would be this: https://github.com/dominicsayers/isemail if used on the serverside.
const validateEmail = (_email) => {
  let regEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

  //* Checks if user.input email already exists, then checks the regex.
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

inputs.forEach(input => {
  input.addEventListener('keyup', function() {

    let id = '#' + input.id;

    if(input.type === 'text')
      validate(id);
    else
      validateEmail(input);
  })
})

const createUser = (firstName, lastName, email) => {
  let user = {
    id: Math.floor(Math.random() * 100),
    firstName,
    lastName,
    email
  }

  users.push(user);
}

const displayEditForm = (userID) => {
  editCard.innerHTML = '';
  let user = users.find(user => user.id === userID)
  memberCard.classList.toggle('collapse')
  editCard.classList.toggle('collapse')

  console.log(userID)
  let template =
  `
  <div id="editCard">
    <h1>Edit user</h1>

  <div class="row">
      <div class="form-goup col-md-6 mb-3">
        <input type="text" id="firstName" class="form-control" value="${user.firstName}" placeholder="First Name">
        <div class="invalid-feedback">
          Please enter your firstname atleast 2 characters long.
        </div>
      </div>

      <div class="form-goup col-md-6 mb-3">
        <input type="text" id="lastName" class="form-control" value="${user.lastName}" placeholder="Last Name">
        <div class="invalid-feedback">
          Please enter your lastname atleast 2 characters long.
        </div>
      </div>

      <div class="form-goup col-md-12 mb-3">
        <input type="email" id="email" class="form-control" value="${user.email}" placeholder="Please enter your email">
      </div>
      <div id="emailExists" class="collapse mb-3">
        This email exists already.
      </div>
      <div class="invalid-feedback">
        Please enter your email.
      </div>
    </div>
    <button class="btn editUserInput" onClick="saveUser(inputs)">Save</button>
    </div>
    `

    editCard.innerHTML = template;
}

const saveUser = (inputData) => {
  let firstName
  let lastName
  let email

  inputData.forEach(item => {
    console.log(item)
    if(item.id === "firstName"){
      firstName = item.value
    }
    if(item.id === "lastName"){
      lastName = item.value
    }
    if(item.id === "email"){
      email = item.value
    }
  })
  console.log(firstName, lastName, email)
}



//* This is the template for rendering a new user.
//! The logic of my IF statements has a flaw that if my Math.random generates the ID 2 or 3 our users will get user.homepage
//! also but because of the small project I found that this would be a suitable solution.
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
    <div class="user d-flex justify-content-between mb-4">
      <div id=${user.id} class="text">
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


const resetForm = () => {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
    input.classList.remove('is-valid');
  })
}


// memberCard.addEventListener('click', e => {

//   let userID = e.target.parentNode.parentNode.id
//   console.log(e.target.parentNode.id)

//   //* Deletes the member from the user array.
//   if(e.target.classList.contains('btn-danger')) {
//     users = users.filter(user => user.id != userID)
//     e.target.parentNode.parentNode.remove()
//   }

//     //* Opens a new prompt for editing a user
// //     if(e.target.classList.contains('btn-primary')) {

// //     }
// })

editCard.addEventListener('click', e => {
    e.preventDefault

    //TODO: Change so this actually edits the new user input without swaping place in the list of the user.
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
