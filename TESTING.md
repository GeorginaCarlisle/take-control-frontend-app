# Testing and Validation

## Contents

[Code Validation](#code-validation)

[User Story Testing](#user-story-testing)

[Form input testing](#form-input-testing)

[Accessibility Testing](#accessibility-testing)

[Lighthouse](#lighthouse)

[Responsive Testing](#responsive-testing)

[Compatibility Testing](#compatibility-testing)

---

## Code Validation

### CSS Validation

All css files have been passed through the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)

| CSS file | Result | Extra notes |
| --- | --- | --- |
| About.module.css | | |
| Accordion.module.css | PASS | |
| ActionTask.module.css | | |
| Button.module.css | PASS | |
| Cards.module.css | PASS | |
| FocusCreate.module.css | PASS | |
| FocusDesktop.module.css | PASS | |
| FocusMobile.module.css | PASS | |
| FocusView.module.css | PASS | |
| Footer.module.css | | |
| Form.module.css | PASS | |
| Goal.module.css | PASS | |
| GoalCreate.module.css | PASS | |
| Miscellaneous.module.css | PASS | |
| NavBar.module.css | PASS | |
| Page.module.css | PASS | |
| TakeAction.module.css | | |
| Task.module.css | | |
| TaskCreate.module.css | | |
| Toast.module.css | | |

[Return to contents list](#contents)

### JavaScript Validation

EsLint was installed and in use during building of this project and has been used to validate all the JavaScript files, the majority of which also contain JSX. All files pass through the EsLint without warning, other than the following:

DesktopTakeAction.js with the following warnings:

- Line 52:6:  React Hook useEffect has a missing dependency: 'setHasLoaded'. Either include it or remove the dependency array
- Line 66:6:  React Hook useEffect has missing dependencies: 'setActiveTasks' and 'setHasLoaded'. Either include them or remove the dependency array

MobileTakeAction.js with the following warnings:

- Line 58:6:  React Hook useEffect has a missing dependency: 'setHasLoaded'. Either include it or remove the dependency array
- Line 72:6:  React Hook useEffect has missing dependencies: 'setActiveTasks' and 'setHasLoaded'. Either include them or remove the dependency array

[Return to contents list](#contents)

## User Story Testing

All completed user stories have been manually tested against their acceptance criteria. This has been documented below, organised by epic.

### Epic - New User Experience

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 1 | As a new user, I can instantly see information about the application, so that I can understand the value that it may offer me. | | |

| 2 | As a new user, I can find out more about the planning side of the application, so that I can learn more about how the application works enticing me to sign up. | | |

| 3 | As a new user, I can find out more about the take action side of the application, so that I can learn more about how the application works enticing me to sign up. | | |

### Epic - Navigation

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 4 | As a user, a clear navigation bar is present throughout the site, so that I can navigate easily between different sections of the application. | Navigation bar fixed at the top of all pages. | PASS |
| | | Links are present to help the user navigate through the site. | PASS |
| | | The apps logo is displayed on the left and takes the user back to the home page. | PASS |
| | | On smaller screens the navigation links are accessed by clicking on a hamburger icon. | PASS |
| | | Navigation menu can be toggled off by re-clicking the hamburger icon or by clicking outside of the menu. | PASS |
| | | Navigation menu is automatically toggled off on the page changing. | PASS |
| 5 | As a user, the navigation bar contains links which are specific to whether I am logged in or logged out, so that all available links are relevant and accessible to me. | Non authenticated users should find: about, signup and signin in the nav bar. | PASS |
| | | Authenticated users should find: plan, take action and signout in the nav bar. | PASS |
| | | Non authenticated users trying to access (plan, take action and any of their nested routes) will be redirected to the login page. | PASS |
| | | All links should work as expected. | PASS |
| 6 | As a user, navigation between different sections of the website is seamless without un-necessary page refreshing, so that I can navigate quickly around the site. | Clicking on navigation links takes the user to the required section of the site. | PASS |
| | | No page refreshing occurs. | PASS |
| 7 | As an authorised user, all sub pages include an x that will return me to my previous page on clicking, so that I can easily check things out and then return to where I was. | When visiting a focus, miscellaneous, focuscreate, actionTaskCreate or daily reset I can see a clear x in the top right corner. | PASS |
| | | Clicking on the x returns me to my previous page. | PASS |
| 8 | As an authorised user, clicking on a task within the ‘take action’ page will take me to the ‘plan’ page where that task is located. | Clicking on the picture next to a task in Take action takes me to that focus area in the plan section. | |

### Epic - Authentication

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 9 | As a new user, I can easily set up an account, so that I can quickly get stuck into exploring and using the application. | A link to signup is present in the Navbar for non-authenticated users. | PASS |
| | | A call to action button to signup is present on the landing page. | PASS |
| | | Links take the user to the signup page. | PASS |
| | | Clear page title. | PASS |
| | | Sign up form with clear labels to aid completion. | PASS |
| | | Errors in form input fields are clearly displayed back to the user. | PASS |
| | | Successful completion takes user to the login page. | PASS |
| 10 | As a signed-up user, I can use my username and password to sign in to my account, so that my account remains secure and only I can login. | A link to sign in is present in the Navbar for non-authenticated users. | PASS |
| | | Link takes the user to the sign in page. | PASS |
| | | Clear page title. | PASS |
| | | Sign in form with clear labels to aid completion. | PASS |
| | | Errors in form input fields are clearly displayed back to the user. | PASS |
| | | Successful completion takes user to the home page, which welcomes them and provides call to action buttons to 'plan' and 'take action'. | PASS |
| 11 | As a signed-up user, I am the only one who can access my data, so that it remains safe and secure. | Current user data is accessible to all pages and components, so that everything is rendered appropriately for the current user. | PASS |
| 13 | As an authenticated user, I can easily logout of my account, so that I can keep my account secure. | Authenticated users are provided with a clear link to sign out in the navigation bar. | PASS |
| | | Clicking sign out will sign the user out and return them to the home page. | PASS |
| 14 | As an authenticated user, I can maintain my authenticated status until I choose to log out, so that I am not unexpectedly logged out due to expired access tokens. | Users are not unexpectedly signed out after 5 minutes. | PASS |

### EPIC - Focus areas

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 17 | As an authenticated user, I can create focus areas, so that I can set out the different areas in my life that I want to use this app to support with and why each area is important to me. | Clicking the button to add new focus, within the plan page, takes me to the create focus form. | PASS |
| | | Title confirms I am in the correct place to create a new focus. | PASS |
| | | Form has clear labels to aid completion. | PASS |
| | | Errors in form input fields are clearly displayed back to me. | PASS |
| | | Successful completion creates a new focus and takes me to a page where I can add goals and tasks to my focus. | PASS |
| | | At any point I can cancel and return to the plan page. | PASS |
| 18 | As an authenticated user, I can edit a focus area, so that I can make changes should I wish. | When viewing a focus I can click on an edit button. | PASS |
| | | I can view my current focus details in a form. | PASS |
| | | I can edit each of the details. | PASS |
| | | Clicking to save updates my focus details and returns me to the focus view. | PASS |
| | | I can click cancel at any point to return to the focus view without saving. | PASS |
| | | I am informed of any errors in my inputs. | PASS |
| 19 | As an authenticated user, I can delete a focus area, so that I can remove information I no longer need or want. | When viewing a focus area there is a button to delete. | PASS |
| | | On clicking to delete I am presented with a confirmation message. | PASS |
| | | I can then confirm or cancel the delete request. | PASS |
| | | On cancel I am returned to the focus view. | PASS |
| | | On delete, the focus area is deleted and I am returned to the main plan. | PASS |

### EPIC - Goals

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 20 | As an authenticated user, I can create goals that are linked to a focus area, so that I can set myself progression targets that are specific, measurable, achievable, reachable and time-bound, defining the value to be gained in achieving the goal. | When viewing a focus I can click an "Add Goal" button at the bottom of the goal list. | PASS |
| | | Clicking the button brings up a form to create a new task. | PASS |
| | | At any point I can cancel, hiding the form. | PASS |
| | | Submitting the form creates a new goal, with the goal appearing in its view state, as well as being added to the goal list. | PASS |
| | | I am informed of any errors in my input fields when submitting. | PASS |
| 22 | As an authenticated user, I can edit a goal so that I can make changes should I wish. | When viewing a goal I can click on a button to edit. | PASS |
| | | Clicking edit brings up the goal in a form. | PASS |
| | | I can edit each of the details. | PASS |
| | | Clicking to save updates my goal details and returns me to the goal view. | PASS |
| | | I can click cancel at any point to return to the goal view without saving. | PASS |
| | | I am informed of any errors in my inputs. | PASS |
| 23 | As an authenticated user, I can delete a goal, so that I can remove information I no longer need or want. | When viewing a goal there is a button to delete. | PASS |
| | | On clicking to delete I am presented with a confirmation message. | PASS |
| | | I can then confirm or cancel the delete request. | PASS |
| | | On cancel I am returned to the goal view. | PASS |
| | | On delete, the goal is deleted and I am returned to the main focus view with no goal selected. | PASS |

### EPIC - Tasks

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 24 | As an authenticated user, I can create tasks linked directly to a focus area, so that I can set out day to day tasks associated with that area. | At the bottom of the day to day tasks for each focus is a form to create a new day to day task. | PASS |
| | | Submitting the form creates a new day to day task for that focus area with the new task appearing in the list of day to day tasks and the form emptying. | PASS |
| | | At any point I can click to cancel, which empties the form. | PASS |
| | | I am informed of any errors in my input fields when submitting. | PASS |
| 25 | As an authenticated user, I can create tasks linked to a goal, so that I can set out the steps I will need to take to achieve my goal. | At the bottom of the goal section is a form to create a new task. | PASS |
| | | Submitting the form creates a new task for that goal, with the new task appearing in the list of tasks for the goal and the form emptying. | PASS |
| | | At any point I can click to cancel, which empties the form. | PASS |
| | | I am informed of any errors in my input fields when submitting. | PASS |
| 26 | As an authenticated user, I can create unlinked tasks, so that I can include any tasks not directly linked to a set focus area or goal. | At the bottom of the miscellaneous area is a form to create a new miscellaneous task. | PASS |
| | | Submitting the form creates a miscellaneous task with the new task appearing in the list of miscellaneous tasks and the form emptying. | PASS |
| | | At any point I can click to cancel, which empties the form. | PASS |
| | | I am informed of any errors in my input fields when submitting. | PASS |
| 27 | As an authenticated user, I can edit a task, so that I can make changes should I wish. | All tasks viewed in the planning section of the site have three dots next to them. | |
| | | Clicking on the three dots brings up a list of options including edit. | |
| | | Clicking to edit transforms the view of the task into an edit form. | |
| | | I can make changes to my task details. | |
| | | At any point I can click cancel transforming the view back to normal. | |
| | | Clicking submit edits my task and transforms the view back to normal with all changes in place. | |
| 28 | As an authenticated user, I can delete a task, so that I can remove information I no longer need or want. | All tasks viewed in the planning section of the site have three dots next to them. | |
| | | Clicking on the three dots brings up a list of options including delete. | |
| | | On clicking to delete I am presented with a confirmation message. | |
| | | I can then confirm or cancel the delete request. | |
| | | On cancel I am returned to the task view. | |
| | | On delete, the task is deleted and removed from the task list. | |

### EPIC - Plan

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 30 | As an authenticated user, I can view all my focus areas and their nested goals together on one page, so that I can see and manage the bigger picture of everything I have going on. | Title lets me know where I am | |
| | | Clear buttons to take me to "Add focus" and "Rank focus areas" | |
| | | All my focus areas and my miscellaneous area are clearly visible | |
| | | On mobile an accordion makes it possible to see all the focus areas at once, with the option to expand and see more details.| |
| | | Each focus area is displayed with name, why, image and any nested goals. | |
| | | Each nested goal is displayed with name, description, value, deadline and active status. | |
| | | On mobile name and image are always displayed, with further info in expanded view. | |
| | | Each focus area contains a "Go" button to take me to the view for that focus. | |
| 31 | As an authenticated user, I can view all the goals and tasks within a given focus area together, helping me to plan how I wish to move forwards in this area and everything that is need to achieve that progression. | Clear title lets me know where I am. | |
| | | Clicking on the X in the top right takes me back to the main plan page. | |
| | | Information about the Focus is clearly displayed at the top, with options to edit and delete. | |
| | | All goals and day to day tasks linked to the focus are shown with options to add, edit and delete. | |
| | | On desktop, the goal titles are listed with space to expand one of the goals, showing all information and nested tasks. | |
| | | On mobile, day-to-day tasks, goals and their nested tasks are displayed in an accordion. | |
| | | Borders, white spacing and titles clearly separate out the information. | |
| 32 | As an authenticated user, I can view all my miscellaneous tasks together in one place, so that I can plan tasks that don't link to any of my focus areas. | A miscellaneous area is always visible in the main plan with the miscellaneous image, title an explanation of this sections purpose. | |
| | | I can click to go into the miscellaneous area where I can see a list of all miscellaneous tasks. | |
| | | An x in the top right can be clicked to take me back to the main plan page. | |

### EPIC - Informed User

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 33 | As an authenticated user, I receive a success message on creation, editing and deleting, so that I know my action was successful. | | |
| | | | |
| 34 | As an authenticated user, I receive a confirmation message on clicking to delete, so that I am made aware of any linked information that will also be deleted should I proceed and can avoid any accidental deletes. | | |

### EPIC - Take Action

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 36 | As an authenticated user, I can view all active tasks together in a take action page, so that I can plan and organise my day. | | |

| 37 | I can click to reset the Action page, deleting one-off completed tasks and returning everything else to the backlog, so that I can start afresh each day. | | |

### EPIC - Backlog

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 38 | As an authenticated user, I can view all my pending tasks within a backlog list, so that I can easily see everything to be done altogether. | | |

| 40 | As an authenticated user, I can order tasks in the backlog by repeated, focus, deadline, most recent, least recent, day to day or goal, so that I can set up the backlog in a way that works for me. | | |

| 41 | As an authenticated user, I can quickly add new tasks to the backlog without needing to go through the planning page, so that I can quickly and easily add additional tasks. | | |

### EPIC - Today

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 43 | As an authenticated user, I can toggle tasks to work on today moving them into a today list, so that I can prioritise and organise what I want to achieve today. | | |

| 44 | As an authenticated user, I can order tasks in today, so that tasks are displayed in the order I intend to work through them. | | |

### EPIC - Completed

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 45 | As an authenticated user, I can toggle tasks as completed moving them to a completed list, so that I can see exactly what I have achieved. | | |

### Epic - Tracking

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 50 | As an authenticated user, where I have set a deadline, the app calculates how long I have left in easy terms (weeks initially and then days), so that I can make sure I meet my deadlines. | | |

| 51 | As an authenticated user, when my deadlines are near the associated tasks are highlighted, so that my attention is drawn to tasks that I need to prioritise in order to meet my deadlines. | | |

[Return to contents list](#contents)

## Form input testing

| Form | Handles change | Handles errors | Handles submit | Success message |
| --- | --- | --- | --- | --- |
| Signup | PASS | PASS | PASS | PASS |
| Signin | PASS | PASS | PASS | PASS |
| FocusCreate | PASS | PASS | PASS | PASS |
| FocusEdit | PASS | PASS | PASS | PASS |
| GoalCreate | PASS | PASS | PASS | PASS |
| GoalEdit | PASS | PASS | PASS | PASS |
| TaskCreate | PASS | PASS | PASS | PASS |
| ActionTaskCreate | PASS | PASS | PASS | PASS |
| Task Edit| | | | |

[Return to contents list](#contents)

## Accessibility Testing

Chrome's extension [wave](https://wave.webaim.org/) was used to test accessibility along with:

- [WebAim contrast checker](#text-contrast-levels) click to see testing.

- [Lighthouse](#lighthouse) click to see testing.

### Wave testing

Wave testing screenshots are displayed below:

| Route | Specific view | Result | Extra notes |
| --- | --- | --- | --- |
| "/" | Home page for logged out user | | |
| | Home page for logged in user | | |
| "/about" | About page | | |
| "/signup" | Sign up page | No errors | Alert "A nearby image has the same alternative text" caused by the logo being used twice with the same alt reference. |
| "/signin" | Sign in page | | |
| "/plan" | Plan page - mobile | | |
| | Plan page - desktop | | |
| "/miscellaneous" | Miscellaneous page with all tasks in view mode | | |
| | Miscellaneous page with a task in edit mode | | |
| | Miscellaneous page with a task in delete mode | | |
| "/focus/create" | Create new focus page | No errors | |
| "/focus/:id" | Focus page with everything set to view | Form label errors for new task forms - both daytoday and goal | See below for further details |
| | Focus page with focus set to edit | No errors from focus area | |
| | Focus page with focus set to delete | No errors from focus area | |
| | Focus page with a goal set to create | Form label errors for goal create form | See below for further details |
| | Focus page with a goal set to edit | No errors from goal areas | |
| | Focus page with a goal set to delete | No errors from goal area | |
| | Focus page with a task set to edit | | |
| | Focus page with a task set to delete | | |
| "/takeaction" | TakeAction page in mobile | | |
| | TakeAction page in desktop | | |
| unknown route | Page not found page | | |

Note: All pages show an alert linked to the noscript element from index.html with contents: You need to enable JavaScript to run this app.

Form label errors:
TaskCreate and GoalCreate forms within the focus page return missing form labels when wave is run. See [bugs](https://github.com/GeorginaCarlisle/take-control-frontend-app/blob/main/README.md#bugs-and-fixes) for how these errors were tackled. The images below show the errors and also show the generated html that clearly show that input and label are correctly linked. It is also to be noted that no form errors are picked up by lighthouse and so I believe the errors may be inherent to wave and not my code.

![Screenshot showing the wave errors](documentation/testing/wave-errors/wave-form-errors.jpg)
![Screenshot showing the task name input and label html](documentation/testing/wave-errors/name-field-task.jpg)
![Screenshot showing the task deadline input and label html](documentation/testing/wave-errors/deadline-field-task.png)
![Screenshot showing the goal title input and label html](documentation/testing/wave-errors/title-field-goal.png)
![Screenshot showing the goal description input and label html](documentation/testing/wave-errors/description-field-goal.png)
![Screenshot showing the goal criteria input and label html](documentation/testing/wave-errors/criteria-field-goal.png)
![Screenshot showing the goal value input and label html](documentation/testing/wave-errors/value-field-goal.png)
![Screenshot showing the goal achieved by input and label html](documentation/testing/wave-errors/achieved-by-field-goal.png)

### Text contrast levels

#### Header

Contrast levels for links in header:
![Screen shot showing a contrast of 17.36:1](documentation/testing/colour-contrast/header-normal-text.png)

Contrast levels for highlighted links in header:
![Screen shot showing a contrast of 9.75:1](documentation/testing/colour-contrast/header-highlighted-links.png)

Contrast levels for site title in header:
![Screen shot showing a contrast of 4.61:1](documentation/testing/colour-contrast/header-site-title.png)

#### Main page

Contrast levels for page titles:
![Screen shot showing a contrast of 5.51:1](documentation/testing/colour-contrast/main-page-title.png)

#### Inside page container

Contrast levels for normal text in page containers:
![Screen shot showing a contrast of 19.26:1](documentation/testing/colour-contrast/page-container-normal-text.png)

Contrast levels for title text in page containers:
![Screen shot showing a contrast of 10.82:1](documentation/testing/colour-contrast/page-container-title-text.png)

#### Buttons and icons

Contrast levels for buttons:
![Screen shot showing a contrast of 7.54:1](documentation/testing/colour-contrast/button.png)

Contrast levels for buttons on hover:
![Screen shot showing a contrast of 7.54:1](documentation/testing/colour-contrast/button-hover.png)

Contrast levels for clickable icons:
![Screen shot showing a contrast of 6.92:1](documentation/testing/colour-contrast/icon.png)

Contrast levels for clickable icons on hover:
![Screen shot showing a contrast of 10.82:1](documentation/testing/colour-contrast/icon-hover.png)

[Return to contents list](#contents)

## Lighthouse

Chrome developer tools Lighthouse was used to test the performance, accessibility, best practices and SEO of all views. The results are shown below:

| Route | Specific view | Desktop/mobile | Performance | Accessibility | Best Pracices | SEO | Extra notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| "/" | Home page for logged out user | | | | | | |
| | | Mobile | | | | | |
| | Home page for logged in user | | | | | | |
| | | Mobile | | | | | |
| "/about" | About page | | | | | | |
| | | Mobile | | | | | |
| "/signup" | Sign up page | Desktop | 99 | 100 | 96 | 100 | |
| | | Mobile | 94 | 100 | 96 | 100 | |
| "/signin" | Sign in page | | | | | | |
| | | Mobile | | | | | |
| "/plan" | Plan page - mobile | | | | | | |
| | | Mobile | | | | | |
| | Plan page - desktop | | | | | | |
| | | Mobile | | | | | |
| "/miscellaneous" | Miscellaneous page with all tasks in view mode | | | | | | |
| | | Mobile | | | | | |
| | Miscellaneous page with a task in edit mode | | | | | | |
| | | Mobile | | | | | |
| | Miscellaneous page with a task in delete mode | | | | | | |
| | | Mobile | | | | | |
| "/focus/create" | Create new focus page | Desktop | 99 | 100 | 78 | 100 | Third party cookies affecting best practices result. |
| | | Mobile | 90 | 100 | 78 | 100 | Third party cookies affecting best practices result. |
| "/focus/:id" | Desktop | Focus page with everything set to view | 79 | 100 | 78 | 100 | Third party cookies affecting best practices result. |
| | | Mobile | 66 | 100 | 78 | 100 | Third party cookies affecting best practices result. |
| "/takeaction" | TakeAction page in mobile | | | | | | |
| | | Mobile | | | | | |
| | TakeAction page in desktop | | | | | | |
| | | Mobile | | | | | |
| unknown route | Page not found page | | | | | | |
| | | Mobile | | | | | |

Note: Only the views as first generated via a url route can be tested through lighthouse.

[Return to contents list](#contents)

## Responsive Testing

The platform has been fully tested across a range of screen sizes, from 350px upto 1920px. The results of this are shown below:

| Route | Specific view | Mobile | Tablet | Laptop | Large Desktop |
| --- | --- | --- | --- | --- | --- |
| "/" | Home page for logged out user | | | | |
| | Home page for logged in user | | | | |
| "/about" | About page | | | | |
| "/signup" | Sign up page | | | | |
| "/signin" | Sign in page | | | | |
| "/plan" | Plan page - mobile | | | | |
| | Plan page - desktop | | | | |
| "/miscellaneous" | Miscellaneous page with all tasks in view mode | | | | |
| | Miscellaneous page with a task in edit mode | | | | |
| | Miscellaneous page with a task in delete mode | | | | |
| "/focus/create" | Create new focus page | | | | |
| "/focus/:id" | Focus page in mobile with everything set to view | | | | |
| | Focus page in mobile with focus set to edit | | | | |
| | Focus page in mobile with focus set to delete | | | | |
| | Focus page in mobile with a goal set to edit | | | | |
| | Focus page in mobile with a goal set to delete | | | | |
| | Focus page in mobile with a task set to edit | | | | |
| | Focus page in mobile with a task set to delete | | | | |
| | Focus page in desktop with everything set to view | | | | |
| | Focus page in desktop with focus set to edit | | | | |
| | Focus page in desktop with focus set to delete | | | | |
| | Focus page in desktop with a goal set to edit | | | | |
| | Focus page in desktop with a goal set to delete | | | | |
| | Focus page in desktop with a task set to edit | | | | |
| | Focus page in desktop with a task set to delete | | | | |
| "/takeaction" | TakeAction page in mobile | | | | |
| | TakeAction page in desktop | | | | |
| unknown route | Page not found page | | | | |

[Return to contents list](#contents)

## Compatibility Testing

This project was built and test along the way predominantly in a Chrome browser. Once the platform was completed and deployed testing was also carried out in the following browsers:

| Route | Specific view | Chrome | Safari | Firefox | Edge |
| --- | --- | --- | --- | --- | --- |
| "/" | Home page for logged out user | | | | |
| | Home page for logged in user | | | | |
| "/about" | About page | | | | |
| "/signup" | Sign up page | | | | |
| "/signin" | Sign in page | | | | |
| "/plan" | Plan page - mobile | | | | |
| | Plan page - desktop | | | | |
| "/miscellaneous" | Miscellaneous page with all tasks in view mode | | | | |
| | Miscellaneous page with a task in edit mode | | | | |
| | Miscellaneous page with a task in delete mode | | | | |
| "/focus/create" | Create new focus page | | | | |
| "/focus/:id" | Focus page in mobile with everything set to view | | | | |
| | Focus page in mobile with focus set to edit | | | | |
| | Focus page in mobile with focus set to delete | | | | |
| | Focus page in mobile with a goal set to edit | | | | |
| | Focus page in mobile with a goal set to delete | | | | |
| | Focus page in mobile with a task set to edit | | | | |
| | Focus page in mobile with a task set to delete | | | | |
| | Focus page in desktop with everything set to view | | | | |
| | Focus page in desktop with focus set to edit | | | | |
| | Focus page in desktop with focus set to delete | | | | |
| | Focus page in desktop with a goal set to edit | | | | |
| | Focus page in desktop with a goal set to delete | | | | |
| | Focus page in desktop with a task set to edit | | | | |
| | Focus page in desktop with a task set to delete | | | | |
| "/takeaction" | TakeAction page in mobile | | | | |
| | TakeAction page in desktop | | | | |
| unknown route | Page not found page | | | | |

[Return to contents list](#contents)
