import throttle from 'lodash.throttle';
feedbackFormEl = document.querySelector('.feedback-form');
const FEEDBACK_FORM_KEY = 'feedback-form-state';

feedbackFormEl.addEventListener('input', throttle(handleFormInput, 500));
feedbackFormEl.addEventListener('submit', handleFormSubmit);

let messageForm = JSON.parse(localStorage.getItem(FEEDBACK_FORM_KEY)) || {};
const { email, message } = feedbackFormEl.elements;
populateMessage();

function handleFormInput() {
  messageForm = { email: email.value, message: message.value };
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(messageForm));
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  console.log({ email: email.value, message: message.value });

  localStorage.removeItem(FEEDBACK_FORM_KEY);
  evt.currentTarget.reset();
}

function populateMessage() {
  if (messageForm) {
    email.value = messageForm.email || '';
    message.value = messageForm.message || '';
  }
}
