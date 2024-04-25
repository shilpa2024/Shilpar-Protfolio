function sendMail() {
  var parms = {
      name: $("#name").val(),
      email: $("#email").val(),
      subject: $("#subject").val(),
      message: $("#message").val()
  };

  emailjs.send("service_bx7khko", "template_jt0zntk", parms)
      .then(function() {
          alert("Email is sent successfully !!!");
      })
      .catch(function(error) {
          console.error("Error sending email:", error);
      });
}

$(document).ready(function() {
  // Sticky header
  $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
          $(".header-area").addClass("sticky");
      } else {
          $(".header-area").removeClass("sticky");
      }

      // Update the active section in the header
      updateActiveSection();
  });

  // Handle header links click
  $(".header ul li a").click(function(e) {
      e.preventDefault();

      var target = $(this).attr("href");

      if ($(target).hasClass("active-section")) {
          return;
      }

      if (target === "#home") {
          $("html, body").animate({
              scrollTop: 0
          }, 500);
      } else {
          var offset = $(target).offset().top - 40;

          $("html, body").animate({
              scrollTop: offset
          }, 500);
      }

      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
  });

  // Initial content revealing js
  ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
  });

  // Contact form scroll
  document.addEventListener('DOMContentLoaded', function() {
      const contactButton = document.querySelector('.btn');
      const contactSection = document.getElementById('contact');

      contactButton.addEventListener('click', function(event) {
          event.preventDefault();
          contactSection.scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Form submission
  $("form[name='submitToGoogleSheet']").submit(function(e) {
      e.preventDefault();
      var form = $(this);
      var url = "https://docs.google.com/forms/d/e/1FAIpQLSc2YQYv66biJpZhCJYFDbAs5SBL0b9H1DrpPXHJ2nSYNbcSAA/formResponse";
      var data = form.serialize();
      $.ajax({
          type: "POST",
          url: url,
          data: data,
          success: function(response) {
              $("#msg").html("Message sent successfully");
              setTimeout(function() {
                  $("#msg").html("");
              }, 5000);
              form.trigger("reset");
          },
          error: function(xhr, status, error) {
              console.error('Error!', error);
          }
      });
  });
});

// Function to update active section in the header
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
          scrollPosition >= offset - 40 &&
          scrollPosition < offset + height - 40
      ) {
          $(".header ul li a").removeClass("active");
          $(".header ul li a[href='#" + target + "']").addClass("active");
      }
  });
}
