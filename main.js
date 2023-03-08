//menu
const menuButtons = Array.from(document.querySelectorAll('.menu-sub-title'));
const menuViews = Array.from(document.querySelectorAll('.menu-content'));
let activeIndex = 0;

menuButtons.forEach((button,_,arr) => {
    button.onclick = (event) => {
        handleActiveMenu(event.target);
        handleActiveMenuView(activeIndex);
    }
})

function handleActiveMenu(el) {
    const name = el.innerText.toLowerCase();
    menuButtons.forEach((target, index) => {
        if (name === target.innerText.toLowerCase()) {
            target.classList.add('active');
            activeIndex = index;
        }
        else {
            target.classList.remove('active');
        }
    })
}

function handleActiveMenuView(activeIndex) {
    menuViews.forEach((menu, index)=> {
        if(activeIndex === index) {
            menu.style.display = 'block';
        }else {
            menu.style.display = 'none';
        }
    })
} 

// get informations
const nameInput = document.querySelector("#get-informations input[name='name']");
const numOfPeopleInput = document.querySelector("#get-informations input[name='number-of-people']");
const dateInput = document.querySelector("#get-informations input[name='order-date']");
const reqInput = document.querySelector("#get-informations input[name='requirements']");
const phoneNumberInput = document.querySelector("#get-informations input[name='phone-number']");

const nameError = document.querySelector("#get-informations .name-error");
const numOfPeopleError = document.querySelector("#get-informations .number-of-people-error");
const dateError = document.querySelector("#get-informations .order-date-error");
const reqError = document.querySelector("#get-informations .requirements-error");
const phoneNumberError = document.querySelector("#get-informations .phone-number-error");

const sendMessageBtn = document.querySelector(".submit-btn button");

const errorMessage = {
    name: "Vui lòng nhập tên!",
    numberOfPeople: "Vui lòng nhập số người!",
    orderDate: "Vui lòng chọn lại ngày!",
    phoneNumber: "Vui lòng nhập số điện thoại!"
}

sendMessageBtn.onclick = function(e){
    const formData = getResult();
    const validateResult = validateInput(formData);
    if(validateResult.length > 0) {
        const errors = validateResult.reduce((obj, {key, value}) => {
            obj[key] = value;
            return obj;
        },{});
        bindingErrorToUI(errors);
        return;
    }
    bindingErrorToUI({});
    let timeout = null;
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(()=> {
        window.alert(`Cảm ơn ${formData.name} đã đặt bàn vào lúc ${formatDate(formData.orderDate)}.\nĐến đúng hẹn nhé!`)
    }, 100);
    clearInput();
    console.log(formData);
}

function getResult() {
    return {
        name: nameInput.value,
        numberOfPeople: numOfPeopleInput.value,
        orderDate: dateInput.value,
        phoneNumber: phoneNumberInput.value,
        requirements: reqInput.value,
    };
}

function validateInput(input) {
    const errors = [];
    Object.entries(input).forEach(([key, value]) => {
        if(key === 'orderDate') {
            !checkValidOrderDate(value) && errors.push({key, value: errorMessage[key]});
        }else if(!value && key !== 'requirements') {
            errors.push({key, value: errorMessage[key]})
        }
    })
    return errors;
}

function bindingErrorToUI(errorObj) {
    nameError.innerHTML = errorObj["name"] || "";
    numOfPeopleError.innerHTML = errorObj["numberOfPeople"] || "";
    dateError.innerHTML = errorObj["orderDate"] || "";
    phoneNumberError.innerHTML = errorObj["phoneNumber"] || "";
}

function checkValidOrderDate(orderDate) {
    const currentDate = new Date();
    const givenDate = new Date(orderDate);
    return givenDate > currentDate;
}

function formatDate(date) {
    const currentDate = new Date(date);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currDate = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return `${padDate(hours)}:${padDate(minutes)} ngày ${padDate(currDate)}-${padDate(month + 1)}-${year}`
}

function padDate(date) {
    return date.toString().padStart(2, '0')
}

function clearInput() {
    nameInput.value = "";
    numOfPeopleInput.value = "";
    dateInput.value = new Date();
    reqInput.value = "";
    phoneNumberInput.value = "";
}

