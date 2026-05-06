const dateInput = document.getElementById("fecha-nacimiento");
const calendarIcon = document.getElementById("calendarIcon");

calendarIcon.addEventListener("click", () => {
    dateInput.showPicker();
});