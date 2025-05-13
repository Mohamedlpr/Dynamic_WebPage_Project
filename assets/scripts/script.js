document.addEventListener("DOMContentLoaded", function (){
    // variables to get the navigation bar and sections
    let nav_list = document.getElementById("nav_bar");
    let sections = document.querySelectorAll("section");
    // Loops through each section and creates a li tag and a link
    sections.forEach(function (section){
        // Creates a <li> and an <a>
        let list_item = document.createElement("li");
        let link = document.createElement("a");
        // Uses section title and links to the section's id
        link.textContent = section.querySelector("h2").textContent;
        link.href = "#" + section.id;
        // Puts the link inside the <li> and adds the <li> to the nav bar
        list_item.appendChild(link);
        nav_list.appendChild(list_item);
    });
    // Smooth scrolling when clicking on nav elements
    let nav_links = document.querySelectorAll("nav a");
    // Loops through each link and adds a click event
    nav_links.forEach(function (link){
        link.addEventListener("click", function (event){
            // prevents the default behavior
            event.preventDefault();
            // Finds all the sections and gets the href attribute
            let target_section = document.querySelector(link.getAttribute("href"));
            // Scrolls to the targeted section smoothly
            if (target_section){
                target_section.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
    // Makes the section active
    function active(){
        // Gets all sections and nav links
        let sections = document.querySelectorAll("section");
        let nav_links = document.querySelectorAll("nav a");
        // Loops through each section
        sections.forEach(function (section){
            let position = section.getBoundingClientRect();
            // Checks if the section is visible and its position
            let isVisible = position.top >= -15 && position.top < 150;
            // Highlights the section
            if (isVisible){
                section.classList.add("active");
            }else{
                section.classList.remove("active");
            }
            // Highlights the nav link
            nav_links.forEach(function (link){
                let target = document.querySelector(link.getAttribute("href"));
                if (target === section){
                    if (isVisible){
                        link.classList.add("active");
                    }else{
                        link.classList.remove("active");
                    }
                }
            });
        });
    }
    // Runs the highlight function when you scroll
    window.addEventListener("scroll", active);
    active();
    // gets the form and the error message and the comments list
    let form = document.getElementById("comment_form");
    let error = document.getElementById("error_message");
    let comments = document.getElementById("comments_list");
    form.addEventListener("submit", function (event){
        // Prevents the default behavior
        event.preventDefault();
        // Gets the values from the form and removes any extra spaces
        let name = form.name.value.trim();
        let email = form.email.value.trim();
        let comment = form.comment.value.trim();
        // Simple email check
        let emailCheck = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        // Checks if any field is empty or if email is invalid
        if (!name || !email || !comment || !emailCheck.test(email)){
            // Shows an error message if empty or invalid
            error.style.display = "block";
            return;
        }
        // Hides it if the inputs are ok
        error.style.display = "none";
        // Creates a new comment and shows it on the page
        let newComment = document.createElement("div");
        // Gives it a class name
        newComment.className = "comment";
        newComment.innerHTML =
            "<div class='name'>" + name + "</div>" +
            "<div class='email'>" + email + "</div>" +
            "<div class='text'>" + comment + "</div>";
        // Add the comment to the list
        comments.appendChild(newComment);
        form.reset();
    });
});
