const email = document.querySelector('#email');
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const card = document.querySelector('#card')
const memberCard = document.querySelector('#memberCard')
const inputs = document.querySelectorAll('input');
const output = document.querySelector('#users')

let users = [
  {
    id: Math.floor(Math.random() * 100),
    firstName: 'Jonatan',
    lastName: 'Saveljeff',
    email: 'Saveljeffjonatan@gmail.com',
  },
  {
    id: Math.floor(Math.random() * 100),
    firstName: 'Github',
    lastName: '',
    email: '',
    homepage: 'https://www.linkedin.com/in/jonatan-saveljeff-a94650109/'
  },
  {
    id: Math.floor(Math.random() * 100),
    firstName: 'LinkedIn',
    lastName: '',
    email: '',
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

//* E-mail address validation from Ian Dunn which was made as an improvement from Warren Gaebel's regex. An even better validator would be this : https://github.com/dominicsayers/isemail if used on the serverside.
const validateEmail = (_email) => {
  let regEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

  if(regEx.test(_email.value)) {
    _email.classList.add('is-valid');
    _email.classList.remove('is-invalid');
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
  input.addEventListener('keyup', function(e) {

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

//* This is the template for rendering a new user.
const renderUsers = () => {
  output.innerHTML = '';

  //TODO: Make an if statement that chekcs user.homepage and reterns a new template.
  //${user.homepage ? `<a href=${user.homepage}></a>` : ''}
  users.forEach(user => {

    let template = `
    <div class="user d-flex justify-content-between align-items-center mb-4">
      <div id=${user.id} class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
        <button class="btn-small btn-danger">X</button>
    </div>
    `

    output.innerHTML += template;
  })

}
renderUsers();


const resetForm = () => {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
    input.classList.remove('is-valid');
  })
}


//? Validates the user input and returns a new user if validation is successful.
regForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(validateEmail(email) && validate('#firstName') && validate('#lastName')) {
    if(users.find(user => user.email === email.value)) {
      //TODO: Change log to an actual message.
      console.log("Email already exists")
    } else {
      createUser(firstName.value, lastName.value, email.value);
      renderUsers();
      resetForm();
    }
  }
})
