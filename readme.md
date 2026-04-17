# Profile Card Project

This project implements a responsive and accessible Profile Card component using HTML, CSS, and vanilla JavaScript. The card displays user information, including name, biography, avatar, social links, hobbies, dislikes, and the current time in milliseconds.  The project is built with testability in mind, with every visible element including a `data-testid` attribute for easy targeting in automated tests.


## HTML & Semantics

The project utilizes semantic HTML elements to structure the Profile Card. 

## Accessibility 

The Profile Card adheres to accessibility :
using `alt` text for the avatar image, provide `aria-live` for dynamic time updates, interactive elements have accesible name, etc.


## Responsiveness

The Profile Card is designed to be responsive and look good on various screen sizes:

*   **Mobile, Tablet, and Desktop:** The card adapts to different screen sizes.
*   **Layout:** On small screens, content stacks vertically. On wider screens, the avatar is arranged to the left, and text is to the right.


## Getting Started

1.  Clone the repository.
2.  Open `index.html` in your browser.


## Technologies Used

*   HTML
*   CSS
*   JavaScript 

## Testing

The project is designed for easy testing with automated tools.  Use the `data-testid` attributes to target specific elements in your tests.

