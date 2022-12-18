import handleFrontEnd from "./handleFrontEnd";

export default function handleSaveContact() {
 
  const _csrf = document.querySelector('.header-table ._csrf');
  const name = document.querySelector('#contact-name');
  const surname = document.querySelector('#contact-surname');
  const email = document.querySelector('#contact-email');
  const phone = document.querySelector('#contact-phone');
  const birthday = document.querySelector('#contact-birthday');
  const cpf = document.querySelector('#contact-cpf');
  let genderOption;
  if (document.querySelector('#contact-gender-male').checked) {
    genderOption = 'masculino';
  } else if (document.querySelector('#contact-gender-female').checked) {
    genderOption = 'feminino';
  }

  const arrayEls = [name.checkValidity(), surname.checkValidity(), email.checkValidity(), phone.checkValidity(), birthday.checkValidity(), cpf.checkValidity()];
  if (arrayEls.includes(false)) return;
  else {
    axios.post(`/agenda`, {
      _csrf: _csrf.dataset.csrftoken,
      name: name.value,
      surname: surname.value,
      email: email.value,
      phone: phone.value,
      birthday: `${birthday.value}T00:00`,
      gender: genderOption,
      cpf: cpf.value,
    })
    .then(response => {
      console.log(response);
      handleFrontEnd(`contact`, cpf.value);
    }).catch(error => console.log(error)) 
  }
}
