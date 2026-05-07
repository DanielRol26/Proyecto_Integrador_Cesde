const inputFullName = document.getElementById('fullname');
const selectDocumentType = document.getElementById('document-type');
const inputDocumentNumber = document.getElementById('document-number');
const radioMale = document.getElementById('male');
const radioFemale = document.getElementById('female');
const inputBirthDate = document.getElementById('birth-date');
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('pass');
const inputConfirmPassword = document.getElementById('confirmpass');
const checkboxTermsPrivacy = document.getElementById('terms-privacy');
const checkboxEmailPromotions = document.getElementById('email-promotions');
const formulary = document.getElementById('form');
const fullNameError = document.getElementById('fullname-error');
const documentTypeError = document.getElementById('documenttype-error');
const documentNumberError = document.getElementById('documentnumber-error');
const genderError = document.getElementById('gender-error')
const birthDateError = document.getElementById('birthdate-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirmpassword-error');
const termsPrivacyError = document.getElementById('termsprivacy-error');

let registeredUsers = [];

formulary.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = inputFullName.value.charAt(0).toUpperCase() + inputFullName.value.slice(1).toLowerCase();
    const documentType = selectDocumentType.value;
    const documentNumber = inputDocumentNumber.value.trim();
    const male = radioMale.value;
    const female = radioFemale.value;
    const birthDate = inputBirthDate.value;
    const email = inputEmail.value.trim().toLowerCase();
    const termsPrivacy = checkboxTermsPrivacy.checked;
    const emailPromotions = checkboxEmailPromotions.checked;

    if (inputFullName.value.trim() === '') {
        fullNameError.textContent = 'El nombre no puede estar vacio';
        fullNameError.classList.add('error');
        return
    }
    if (selectDocumentType.value === '') {
        documentTypeError.textContent = 'Debe seleccionar su tipo de documento';
        documentTypeError.classList.add('error');
        return
    }
    if (inputDocumentNumber.value.trim() === '') {
        documentNumberError.textContent = 'El número de documento no puede estar vacio';
        documentNumberError.classList.add('error');
        return
    }
    let gender = '';
    if (radioMale.checked) {
        gender = radioMale.value;
    } else if (radioFemale.checked) {
        gender = radioFemale.value;
    } else {
        genderError.textContent = 'Seleccione una de las opciones';
        genderError.classList.add('error');
        return
    }
    if (inputBirthDate.value.trim() === '') {
        birthDateError.textContent = 'Debe selecionar su fecha de nacimiento';
        birthDateError.classList.add('error');
        return
    }
    if (inputEmail.value.trim() === '') {
        emailError.textContent = 'El correo no puede estar vacio';
        emailError.classList.add('error');
        return
    }
    if (inputEmail.value.trim() === '') {
        emailError.textContent = 'El correo no puede estar vacio';
        emailError.classList.add('error');
        return
    }
    let password = '';
    if (inputPassword.value.trim() === '') {
        passwordError.textContent = 'La contraseña no puede estar vacía';
        passwordError.classList.add('error');
    } else if (inputConfirmPassword.value.trim() === '') {
        confirmPasswordError.textContent = 'Debe confirmar su contraseña';
        confirmPasswordError.classList.add('error');
    } else if (inputPassword.value === inputConfirmPassword.value) {
        password = inputPassword.value;
    } else {
        passwordError.textContent = 'Las contraseñas no coinciden';
        passwordError.classList.add('error');
        return
    }
    if (!checkboxTermsPrivacy.checked) {
        termsPrivacyError.textContent = 'Para continuar con la creación de la cuenta debes aceptar los términos y condiciones'
        termsPrivacyError.classList.add('error');
        return
    }

    const newRegisteredUser = { fullName, documentType, documentNumber, gender, birthDate, email, password, termsPrivacy, emailPromotions };

    registeredUsers = [...registeredUsers, newRegisteredUser];

    formulary.reset();
    showUsers(registeredUsers);
})

function clearError(input, errorSpan) {
    input.addEventListener('input', () => {
        errorSpan.textContent = '';
    })
}

function clearErrorOnChange(input, errorSpan) {
    input.addEventListener('change', () => {
        errorSpan.textContent = '';
    });
}
clearError(inputFullName, fullNameError);
clearError(inputDocumentNumber, documentNumberError);
clearError(inputBirthDate, birthDateError);
clearError(inputEmail, emailError);
clearError(inputPassword, passwordError);
clearError(inputConfirmPassword, confirmPasswordError);
clearErrorOnChange(selectDocumentType, documentTypeError);
clearErrorOnChange(radioMale, genderError);
clearErrorOnChange(radioFemale, genderError);
clearErrorOnChange(checkboxTermsPrivacy, termsPrivacyError);

const filterType = document.getElementById('filter-type');
const filterValue = document.getElementById('filter-value');

filterType.addEventListener('change', () => {
    filterValue.innerHTML = '';

    if (filterType.value === 'name') {

        filterValue.innerHTML = `
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>
        <option value="J">J</option>
        <option value="K">K</option>
        <option value="L">L</option>
        <option value="M">M</option>
        <option value="N">N</option>
        <option value="Ñ">Ñ</option>
        <option value="O">O</option>
        <option value="P">P</option>
        <option value="Q">Q</option>
        <option value="R">R</option>
        <option value="S">S</option>
        <option value="T">T</option>
        <option value="U">U</option>
        <option value="V">V</option>
        <option value="W">W</option>
        <option value="X">X</option>
        <option value="Y">Y</option>
        <option value="Z">Z</option>
    `;
    } else if (filterType.value === 'document-type') {
        filterValue.innerHTML = `
            <option value="all">-- Seleccionar --</option>
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
            <option value="PPT">PPT</option>
            <option value="NIT">NIT</option>
        `;
    } else if (filterType.value === 'gender') {
        filterValue.innerHTML = `
            <option value="all">-- Seleccionar --</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
        `;
    } else if (filterType.value === 'email') {
        filterValue.innerHTML = `
            <option value="all">-- Seleccionar --</option>
            <option value="gmail">Gmail</option>
            <option value="hotmail">Hotmail</option>
            <option value="outlook">Outlook</option>
        `;
    } else {
        filterValue.innerHTML = `
            <option value="">None</option>
        `;
    }
});

const btnFilter = document.getElementById('btn-filter');
const btnShowAll = document.getElementById('btn-show-all');
const usersList = document.getElementById('users-list');

function showUsers(users) {

    usersList.innerHTML = '';

    users.forEach(user => {

        const card = document.createElement('li');

        card.classList.add(
            'flex',
            'flex-col',
            'gap-[12px]',
            'bg-[#fcfdff]',
            'border',
            'border-[#dbe4f0]',
            'rounded-[16px]',
            'p-[22px]',
            'shadow-[0_2px_10px_rgba(15,23,42,0.05)]',
            'w-full',
            'max-w-[390px]',
            'min-h-[360px]',
            'list-none'
        );

        const name = document.createElement('p');
        name.textContent = `Nombre Uusario: ${user.fullName}`;

        const documentType = document.createElement('p');
        documentType.textContent = `Tipo de documento: ${user.documentType}`;

        const documentNumber = document.createElement('p');
        documentNumber.textContent = `Número de documento: ${user.documentNumber}`;

        const gender = document.createElement('p');
        gender.textContent = `Sexo: ${user.gender}`;

        const birthDate = document.createElement('p');
        birthDate.textContent = `fecha de nacimiento: ${user.birthDate}`;

        const email = document.createElement('p');
        email.textContent = `Correo electrónico: ${user.email}`;

        const password = document.createElement('p');
        password.textContent = `Contraseña: ${user.password}`;

        const termsPrivacy = document.createElement('p');
        termsPrivacy.textContent = `¿Aceptó terminos y condiciones?: ${user.termsPrivacy}`;

        const emailPromotions = document.createElement('p');
        emailPromotions.textContent = `¿Aceptó recibir información de promociones y descuentos?: ${user.emailPromotions}`;


        card.appendChild(name);
        card.appendChild(documentType);
        card.appendChild(documentNumber);
        card.appendChild(gender);
        card.appendChild(birthDate);
        card.appendChild(email);
        card.appendChild(password);
        card.appendChild(termsPrivacy);
        card.appendChild(emailPromotions);
        usersList.appendChild(card);
    });
}

btnShowAll.addEventListener('click', () => {
    showUsers(registeredUsers);
})

btnFilter.addEventListener('click', () => {

    const type = filterType.value;
    const value = filterValue.value;

    let filteredUsers = [];

    registeredUsers.forEach(user => {

        if (type === 'document-type' && user.documentType === value) {
            filteredUsers.push(user);
        } else if (type === 'gender' && user.gender === value) {
            filteredUsers.push(user);
        } else if (type === 'email' && user.email.includes(value)) {
            filteredUsers.push(user);
        } else if (type === 'name' && user.fullName.charAt(0).toUpperCase() === value) {
            filteredUsers.push(user);
        }
    })
    showUsers(filteredUsers);
});

function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}
