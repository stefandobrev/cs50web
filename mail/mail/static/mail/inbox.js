document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Event listener for submitting the html form
  document.querySelector('#compose-form').addEventListener('submit', function(event) {
    event.preventDefault();
    postEmails().then(() => {
      load_mailbox('sent');
    });
  });

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  getEmails(mailbox);
}

async function postEmails() {
  const emailData = {
    'recipients': document.querySelector('#compose-recipients').value,
    'subject': document.querySelector('#compose-subject').value,
    'body': document.querySelector('#compose-body').value
  };

  try {
    const response = await fetch('/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from server:', errorData);
    } else {
      const result = await response.json();
      console.log("Success:", result);
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

async function getEmails(mailbox) {
  try {
    const response = await fetch(`/emails/${mailbox}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error from server:', errorData);
      return;
    }

    const data = await response.json();
    console.log('Mailbox data:', data);

    const emailsView = document.querySelector('#emails-view');
    emailsView.innerHTML = emailsView.querySelector('h3').outerHTML;

    data.forEach(email => {
      const emailDiv = document.createElement('div');
      emailDiv.classList.add('inbox-mails');

      if (email.read) {
        emailDiv.classList.add('gray-bg')
      } else {
        emailDiv.classList.add('white-bg')
      }

      emailDiv.innerHTML = `
      <a href="{% url {email} %}" class="email-link">
        <div class="left-content">
          <p><b>${email.sender}</b></p>
          <p>${email.subject}</p>
        </div>
        <p class="timestamp">${email.timestamp}</p>
      </a>
      `;

      emailsView.append(emailDiv);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}