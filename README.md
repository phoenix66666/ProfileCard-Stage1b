# Advanced Todo Card Project
  HNG stage 1 task

This project builds upon a basic Todo Card in HNG stage 0 task. It creates a more interactive and stateful component using HTML, CSS, and JavaScript.  It focuses on enhancing user experience through editable content, status transitions, priority changes, expand/collapse behavior, and dynamic time handling.

# added Features

*   **Editable Content:** Allows users to modify the title, description, priority, and due date of the todo item.
*   **Status Transitions:** Enables users to toggle the status of the todo item between "Pending," "In Progress," and "Done."
*   **Priority Changes:** Provides a visual indicator to represent the priority level (Low, Medium, High) of the todo item.
*   **Expand/Collapse Behavior:** Collapses long descriptions by default and allows users to expand them for full viewing.
*   **Dynamic Time Handling:** Displays the time remaining until the due date with granular updates and indicates when a todo item is overdue.

# new design

## Editing Mode

  Clicking the "Edit" button transitions the card into edit mode. Click "Save" button updates the card values,"Cancel" button restores previous values.

## Status Controls

  * Allows users to toggle the status of the todo item.
 *  If the checkbox is toggled → status becomes "Done".
*   If the status is manually set to "Done" → the checkbox becomes checked.
*   If unchecked after "Done" → revert to "Pending".
*   Status must stay visually synced with: Checkbox, Status display, and Status control.


## Priority Indicator Enhancements

   Visually indicates the priority level of the todo item.
  

## Expand / Collapse Behavior

*   Collapses long descriptions by default.
*   **Behavior:**
    *   The description is collapsed by default if it exceeds a certain length.
    *   Clicking the expand toggle reveals the full content.
    *   The toggle is keyboard accessible.

## Time Management Enhancements

*   Displays the time remaining until the due date and indicates overdue items.
*   **Overdue Indication:** Shows a visible visual change and an explicit "Overdue" indicator when the todo item is overdue.
*   **Time Logic:**
    *   Updates every 30–60 seconds.
    *   Shows granular time: "Due in 2 days", "Due in 3 hours", "Due in 45 minutes", "Overdue by 1 hour".
*   **"Done" Status:**
    *   Time remaining stops updating when the status becomes "Done".
    *   Replaced with: "Completed".

#  Accessibility 

*   Edit form fields have `<label for="">`.
*   The status dropdown have an accessible name.
*   The expand toggle use `aria-expanded` and `aria-controls`.
*   The collapsible section must have a matching `id`.
*   Live time updates use `aria-live="polite"`.
*   Keyboard fully usable


# Getting Started

1.  Clone the repository.
2.  Open `index.html` in your browser.
3.  Interact with the Todo Card to test its functionality.

# Technologies Used

*   HTML
*   CSS
*   JavaScript (Vanilla JS)

# Testing

The project is designed for easy testing with automated tools. Use the `data-testid` attributes to target specific elements in your tests.

