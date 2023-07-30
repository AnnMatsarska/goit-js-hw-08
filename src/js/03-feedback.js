import throttle from 'lodash.throttle';
const feedbackFormEl = document.querySelector('.feedback-form');
// const submitEl = document.querySelector('.feedback-form button');

const FEEDBACK_FORM_KEY = 'feedback-form-state';
const message = {};

feedbackFormEl.addEventListener('input', throttle(handleFormInput, 500));
feedbackFormEl.addEventListener('submit', handleFormSubmit);

populateMessage();

function handleFormInput(evt) {
  evt.preventDefault();
  message[evt.target.name] = evt.target.value;
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(message));
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  console.log(JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY)));
  localStorage.removeItem(FEEDBACK_FORM_KEY);
}

function populateMessage() {
  const savedMassege = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY));
  if (savedMassege) {
    let { email, message } = feedbackFormEl.elements;
    email.value = savedMassege.email || ' ';
    message.value = savedMassege.message || ' ';
  }
}
