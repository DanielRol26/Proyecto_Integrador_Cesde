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

let registeredUsers = [
    {
        fullName: 'Juan Perez',
        documentType: 'CC',
        documentNumber: '1025478963',
        gender: 'Male',
        birthDate: '1998-05-12',
        email: 'juan@gmail.com',
        password: 'Juan123*',
        termsPrivacy: true,
        emailPromotions: true,
        roleUser: 'admin'
    },
    {
        fullName: 'Laura Martinez',
        documentType: 'TI',
        documentNumber: '1002547896',
        gender: 'Female',
        birthDate: '2006-08-21',
        email: 'laura@hotmail.com',
        password: 'Laura123*',
        termsPrivacy: true,
        emailPromotions: false,
        roleUser: 'client'
    },
    {
        fullName: 'Carlos Ruiz',
        documentType: 'CE',
        documentNumber: '895412365',
        gender: 'Male',
        birthDate: '1995-11-03',
        email: 'carlos@outlook.com',
        password: 'Carlos123*',
        termsPrivacy: true,
        emailPromotions: true,
        roleUser: 'admin'
    },
    {
        fullName: 'Maria Gomez',
        documentType: 'CC',
        documentNumber: '1098745632',
        gender: 'Female',
        birthDate: '1999-04-18',
        email: 'maria@gmail.com',
        password: 'Maria123*',
        termsPrivacy: true,
        emailPromotions: true,
        roleUser: 'client'
    },
    {
        fullName: 'Andres Torres',
        documentType: 'PPT',
        documentNumber: '774512369',
        gender: 'Male',
        birthDate: '2001-06-09',
        email: 'andres@hotmail.com',
        password: 'Andres123*',
        termsPrivacy: true,
        emailPromotions: false,
        roleUser: 'admin'
    },
    {
        fullName: 'Sofia Ramirez',
        documentType: 'CC',
        documentNumber: '1012458796',
        gender: 'Female',
        birthDate: '2000-12-14',
        email: 'sofia@gmail.com',
        password: 'Sofia123*',
        termsPrivacy: true,
        emailPromotions: true,
        roleUser: 'client'
    },
    {
        fullName: 'David Lopez',
        documentType: 'NIT',
        documentNumber: '900123456',
        gender: 'Male',
        birthDate: '1992-07-22',
        email: 'david@outlook.com',
        password: 'David123*',
        termsPrivacy: true,
        emailPromotions: false,
        roleUser: 'admin'
    },
    {
        fullName: 'Valentina Castro',
        documentType: 'CC',
        documentNumber: '1036987452',
        gender: 'Female',
        birthDate: '2003-02-27',
        email: 'valentina@gmail.com',
        password: 'Valentina123*',
        termsPrivacy: true,
        emailPromotions: true,
        roleUser: 'client'
    },
    {
        fullName: 'Mateo Herrera',
        documentType: 'TI',
        documentNumber: '1054789632',
        gender: 'Male',
        birthDate: '2005-09-11',
        email: 'mateo@hotmail.com',
        password: 'Mateo123*',
        termsPrivacy: true,
        emailPromotions: false,
        roleUser: 'client'
    },
    {
        fullName: 'Camila Vargas',
        documentType: 'CE',
        documentNumber: '854796321',
        gender: 'Female',
        birthDate: '1997-01-05',
        email: 'camila@outlook.com',
        password: 'Camila123*',
        termsPrivacy: true,
        emailPromotions: true,
        roleUser: 'admin'
    }
];

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
    const roleUser = 'client';

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
    const emailExists = registeredUsers.some(user => user.email === email)

    if (emailExists) {
        emailError.textContent = 'El correo ya se encuentra registrado'
        emailError.classList.add('error')
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

    const newRegisteredUser = { fullName, documentType, documentNumber, gender, birthDate, email, password, termsPrivacy, emailPromotions, roleUser };

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
        name.textContent = `Nombre Usuario: ${user.fullName}`;

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

        const roleUser = document.createElement('p');
        emailPromotions.textContent = `Rol del usuario: ${user.roleUser}`;

        card.appendChild(name);
        card.appendChild(documentType);
        card.appendChild(documentNumber);
        card.appendChild(gender);
        card.appendChild(birthDate);
        card.appendChild(email);
        card.appendChild(password);
        card.appendChild(termsPrivacy);
        card.appendChild(emailPromotions);
        card.appendChild(roleUser);
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
