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
  document.querySelector('#email-content-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-content-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  getEmails(mailbox);
}

// Send emails
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

// Show all emails in the inbox
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
      <div class="email-link">
        <div class="left-content">
          <p><b>${email.sender}</b></p>
          <p>${email.subject}</p>
        </div>
        <p class="timestamp">${email.timestamp}</p>
      <div>
      `;

      emailDiv.querySelector(".email-link").addEventListener('click', (event) => {
        event.preventDefault();
        viewMail(email.id);
      });

      emailsView.append(emailDiv);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Check content of an email
async function viewMail(emailId) {
  try {
    const response = await fetch(`emails/${emailId}`);
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error from server:", errorData);
      return;
    }
    const emailData = await response.json();

    // Mark the email as read
    fetch(`emails/${emailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        read: true
      })
    });

    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-content-view').style.display = 'block';

    const emailContentView = document.querySelector("#email-content-view");

    emailContentView.innerHTML = `
      <div>
        <p><b>From: </b>${emailData.sender}</p>
        <p><b>To: </b>${emailData.recipients}</p>
        <p><b>Subject: </b>${emailData.subject}</p>
        <p><b>Date: </b>${emailData.timestamp}</p>
      </div>
      <hr>
      <div class="container">
        <p>${emailData.body}
      </div>
      <hr>
      <div class="bttn-section">
        <button id="bttn-reply" type="button" class="btn btn-primary">Reply</button>
        <button id="bttn-archive" type="button" class="btn btn-secondary">
        ${emailData.archived ? 'Unarchive' : 'Archive'}
        </button>
      </div>
    `;

    emailContentView.querySelector('#bttn-reply').addEventListener('click', (event) => {
      event.preventDefault();
      setReply(emailData.id);
    });


    emailContentView.querySelector("#bttn-archive").addEventListener('click', (event) => {
      event.preventDefault();
      setArchive(emailData.id);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Changes Archive module variable with PUT method
function setArchive(emailId) {
  fetch(`/emails/${emailId}`)
    .then(response => response.json())
    .then(email => {
      const newArchivedStatus = !email.archived;

      fetch(`/emails/${emailId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          archived: newArchivedStatus
        })
      }).then(() => {
        load_mailbox('inbox');
      })
    })
    .catch (error => {
      console.error("Error:", error)
    });
}

// Reply function - using same structure as compose 
async function setReply(emailId) {
    try {
      const response = await fetch(`/emails/${emailId}`);
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error fetching data:', errorData);
        return
      }

      const emailData = await response.json();
      console.log('Mail data:', emailData);

      // Checks subject starting text for a reply
      let subjectValue = emailData.subject;
      if (!subjectValue.startsWith('Re: ')) {
        subjectValue = 'Re: ' + subjectValue;
      }

      // Adds timestamp and email sender in the begining of a reply
      let bodyValue = `On ${emailData.timestamp} ${emailData.sender} wrote: ` + emailData.body;
      

        // Show compose view and hide other views
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'block';
      document.querySelector('#email-content-view').style.display = 'none';

      // Clear out composition fields
      document.querySelector('#compose-recipients').value = emailData.sender;
      document.querySelector('#compose-subject').value = subjectValue;
      document.querySelector('#compose-body').value = bodyValue;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}