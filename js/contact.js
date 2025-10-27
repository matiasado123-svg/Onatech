  <script>
    (function(){
      const form = document.getElementById('contactForm');
      const msgSuccess = document.getElementById('msg-success');
      const honeypot = document.getElementById('website');

      // Basic client-side validation + fake submit (replace with actual POST)
      form.addEventListener('submit', function(evt){
        evt.preventDefault();

        // Honeypot spam trap
        if (honeypot && honeypot.value.trim() !== '') {
          // silently fail (bot)
          return;
        }

        // Validate required fields manually for better UX
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        const consent = form.consent.checked;

        let errors = [];

        if (!name) errors.push('Vul uw naam in.');
        if (!email) errors.push('Vul een geldig e-mail adres in.');
        if (!message || message.length < 10) errors.push('Voeg een kort bericht toe (minimaal 10 tekens).');
        if (!consent) errors.push('U moet toestemming geven om contact op te nemen.');

        // show message error near message field if present
        const messageError = document.getElementById('messageError');
        messageError.textContent = '';

        if (errors.length) {
          // Simple aggregated alert + inline message
          alert('Er ontbreken gegevens:\n– ' + errors.join('\n– '));
          if (message.length < 10) {
            messageError.textContent = 'Uw bericht is te kort (min. 10 tekens).';
          }
          return;
        }

        // TODO: hier stuur je het formulier via fetch() naar jouw backend of service.
        // Voorbeeld: gebruik fetch('/api/contact', { method:'POST', body: new FormData(form) })
        // Wij voeren hier een mock-submit uit en tonen een succesmelding.

        // Simulate network delay
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Versturen…';

        setTimeout(() => {
          // Reset & show success
          form.reset();
          submitButton.disabled = false;
          submitButton.textContent = 'Verstuur bericht';
          msgSuccess.style.display = 'block';

          // Scroll to success
          msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Hide after a while
          setTimeout(() => {
            msgSuccess.style.display = 'none';
          }, 7000);
        }, 900);
      });
    })();
  </script>