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
    email: 'My github',
    // link: 'https://www.linkedin.com/in/jonatan-saveljeff-a94650109/'
  },
  {
    id: Math.floor(Math.random() * 100),
    firstName: 'LinkedIn',
    lastName: '',
    email: 'My linkedin',
    // link: 'https://www.linkedin.com/in/jonatan-saveljeff-a94650109/'
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

const validateEmail = (_email) => {

  let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

// regForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   validate('#firstName');
//   validate('#lastName');
//   validateEmail(email);


//   if(validateEmail(email) && validate('#firstName') && validate('#lastName')) {
//     console.log('Success!')
//     regForm.reset()
//   } else {
//     console.log('nope!')
//   }
// })

const createUser = (firstName, lastName, email) => {
  let user = {
    id: Math.floor(Math.random() * 100),
    firstName,
    lastName,
    email
  }

  users.push(user);
}

const renderUsers = () => {

  output.innerHTML = '';

  users.forEach(user => {
    let template = `
    <div class="user d-flex justify-content-between align-items-center mb-4">
      <div id=${user.id} class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
        <button class="btn btn-danger">X</button>
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

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
  validate('#firstName');
  validate('#lastName');
  validateEmail(email);

  if(validateEmail(email) && validate('#firstName') && validate('#lastName')) {
    createUser(firstName.value, lastName.value, email.value);
    renderUsers();
    resetForm();
  }
})


