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
| Accordion.module.css | | |
| ActionTask.module.css | | |
| Button.module.css | | |
| Cards.module.css | | |
| FocusCreate.module.css | | |
| FocusDesktop.module.css | | |
| FocusMobile.module.css | | |
| FocusView.module.css | | |
| Footer.module.css | | |
| Form.module.css | | |
| Goal.module.css | | |
| GoalCreate.module.css | | |
| Miscellaneous.module.css | | |
| NavBar.module.css | | |
| Page.module.css | | |
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

#### Epic - Navigation

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 4 | As a user, a clear navigation bar is present throughout the site, so that I can navigate easily between different sections of the application. | | |

| 5 | As a user, the navigation bar contains links which are specific to whether I am logged in or logged out, so that all available links are relevant and accessible to me. | | |

| 6 | As a user, navigation between different sections of the website is seamless without un-necessary page refreshing, so that I can navigate quickly around the site. | | |

| 7 | As an authorised user, all sub pages include an x that will return me to my previous page on clicking, so that I can easily check things out and then return to where I was. | | |

| 8 | As an authorised user, clicking on a task within the ‘take action’ page will take me to the ‘plan’ page where that task is located. | | |

#### Epic - Authentication

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 9 | As a new user, I can easily set up an account, so that I can quickly get stuck into exploring and using the application. | | |

| 10 | As a signed-up user, I can use my username and password to sign in to my account, so that my account remains secure and only I can login. | | |

| 11 | As a signed-up user, I am the only one who can access my data, so that it remains safe and secure. | | |

| 13 | As an authenticated user, I can easily logout of my account, so that I can keep my account secure. | | |

| 14 | As an authenticated user, I can maintain my authenticated status until I choose to log out, so that I am not unexpectedly logged out due to expired access tokens. | | |

#### EPIC - Focus areas

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 17 | As an authenticated user, I can create focus areas, so that I can set out the different areas in my life that I want to use this app to support with and why each area is important to me. | | |

| 18 | As an authenticated user, I can edit a focus area, so that I can make changes should I wish. | | |

| 19 | As an authenticated user, I can delete a focus area, so that I can remove information I no longer need or want. | | |

#### EPIC - Goals

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 20 | As an authenticated user, I can create goals that are linked to a focus area, so that I can set myself progression targets that are specific, measurable, achievable, reachable and time-bound, defining the value to be gained in achieving the goal. | | |

| 22 | As an authenticated user, I can edit a goal so that I can make changes should I wish. | | |

| 23 | As an authenticated user, I can delete a goal, so that I can remove information I no longer need or want. | | |

#### EPIC - Tasks

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 24 | As an authenticated user, I can create tasks linked directly to a focus area, so that I can set out day to day tasks associated with that area. | | |

| 25 | As an authenticated user, I can create tasks linked to a goal, so that I can set out the steps I will need to take to achieve my goal. | | |

| 26 | As an authenticated user, I can create unlinked tasks, so that I can include any tasks not directly linked to a set focus area or goal. | | |

| 27 | As an authenticated user, I can edit a task, so that I can make changes should I wish. | | |

| 28 | As an authenticated user, I can delete a task, so that I can remove information I no longer need or want. | | |

#### EPIC - Plan

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 30 | As an authenticated user, I can view all my focus areas and their nested goals together on one page, so that I can see and manage the bigger picture of everything I have going on. | | |

| 31 | As an authenticated user, I can view all the goals and tasks within a given focus area together, helping me to plan how I wish to move forwards in this area and everything that is need to achieve that progression. | | |

| 32 | As an authenticated user, I can view all my miscellaneous tasks together in one place, so that I can plan tasks that don't link to any of my focus areas. | | |

#### EPIC - Informed User

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 33 | As an authenticated user, I receive a success message on creation, editing and deleting, so that I know my action was successful. | | |

| 34 | As an authenticated user, I receive a confirmation message on clicking to delete, so that I am made aware of any linked information that will also be deleted should I proceed and can avoid any accidental deletes. | | |

#### EPIC - Take Action

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 36 | As an authenticated user, I can view all active tasks together in a take action page, so that I can plan and organise my day. | | |

| 37 | I can click to reset the Action page, deleting one-off completed tasks and returning everything else to the backlog, so that I can start afresh each day. | | |

#### EPIC - Backlog

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 38 | As an authenticated user, I can view all my pending tasks within a backlog list, so that I can easily see everything to be done altogether. | | |

| 40 | As an authenticated user, I can order tasks in the backlog by repeated, focus, deadline, most recent, least recent, day to day or goal, so that I can set up the backlog in a way that works for me. | | |

| 41 | As an authenticated user, I can quickly add new tasks to the backlog without needing to go through the planning page, so that I can quickly and easily add additional tasks. | | |

#### EPIC - Today

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 43 | As an authenticated user, I can toggle tasks to work on today moving them into a today list, so that I can prioritise and organise what I want to achieve today. | | |

| 44 | As an authenticated user, I can order tasks in today, so that tasks are displayed in the order I intend to work through them. | | |

#### EPIC - Completed

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 45 | As an authenticated user, I can toggle tasks as completed moving them to a completed list, so that I can see exactly what I have achieved. | | |

#### Epic - Tracking

| # | User Story | Acceptance Criteria | Result |
| --- | --- | --- | --- |
| 50 | As an authenticated user, where I have set a deadline, the app calculates how long I have left in easy terms (weeks initially and then days), so that I can make sure I meet my deadlines. | | |

| 51 | As an authenticated user, when my deadlines are near the associated tasks are highlighted, so that my attention is drawn to tasks that I need to prioritise in order to meet my deadlines. | | |

[Return to contents list](#contents)

## Form input testing

| Form | Handles change | Handles errors | Handles submit |
| --- | --- | --- | --- |
| Signup | | | |
| Signin | | | |
| FocusCreate | | | |
| FocusEdit | | | |
| GoalCreate | | | |
| GoalEdit | | | |
| TaskCreate | | | |
| ActionTaskCreate | | | |
| Task Edit| | | |

[Return to contents list](#contents)

## Accessibility Testing

Chrome's extension [wave](https://wave.webaim.org/) was used to test accessibility along with:

- [WebAim contrast checker](#text-contrast-levels) click to see testing.

- [Lighthouse](#lighthouse) click to see testing.

Wave testing screenshots are displayed below:

| Route | Specific view | Result | Extra notes |
| --- | --- | --- | --- |
| "/" | Home page for logged out user | | |
| | Home page for logged in user | | |
| "/about" | About page | | |
| "/signup" | Sign up page | | |
| "/signin" | Sign in page | | |
| "/plan" | Plan page - mobile | | |
| | Plan page - desktop | | |
| "/miscellaneous" | Miscellaneous page with all tasks in view mode | | |
| | Miscellaneous page with a task in edit mode | | |
| | Miscellaneous page with a task in delete mode | | |
| "/focus/create" | Create new focus page | | |
| "/focus/:id" | Focus page in mobile with everything set to view | | |
| | Focus page in mobile with focus set to edit | | |
| | Focus page in mobile with focus set to delete | | |
| | Focus page in mobile with a goal set to edit | | |
| | Focus page in mobile with a goal set to delete | | |
| | Focus page in mobile with a task set to edit | | |
| | Focus page in mobile with a task set to delete | | |
| | Focus page in desktop with everything set to view | | |
| | Focus page in desktop with focus set to edit | | |
| | Focus page in desktop with focus set to delete | | |
| | Focus page in desktop with a goal set to edit | | |
| | Focus page in desktop with a goal set to delete | | |
| | Focus page in desktop with a task set to edit | | |
| | Focus page in desktop with a task set to delete | | |
| "/takeaction" | TakeAction page in mobile | | |
| | TakeAction page in desktop | | |
| unknown route | Page not found page | | |

### Text contrast levels

Contrast levels for main text:
![colour scheme](documentation/planning/colour/normal-text.png)

Contrast levels for logo and section headings:
![colour scheme](documentation/planning/colour/logo-colour.png)

Contrast levels for interactive elements on hover:
![colour scheme](documentation/planning/colour/page-title-colour.png)

Contrast levels for interactive elements:
![colour scheme](documentation/planning/colour/interactive-elements-colour.png)

Contrast levels for the footer:
![colour scheme](documentation/planning/colour/footer.png)

Contrast levels for the alert main text:
![colour scheme](documentation/planning/colour/alert-background.png)

Contrast levels for the alert title:
![colour scheme](documentation/planning/colour/alert-title.png)

[Return to contents list](#contents)

## Lighthouse

Chrome developer tools Lighthouse was used to test the performance, accessibility, best practices and SEO of all views. The results are shown below:

| Route | Specific view | Performance | Accessibility | Best Pracices | SEO | Extra notes |
| --- | --- | --- | --- | --- | --- | --- |
| "/" | Home page for logged out user | | | | | |
| | Home page for logged in user | | | | | |
| "/about" | About page | | | | | |
| "/signup" | Sign up page | | | | | |
| "/signin" | Sign in page | | | | | |
| "/plan" | Plan page - mobile | | | | | |
| | Plan page - desktop | | | | | |
| "/miscellaneous" | Miscellaneous page with all tasks in view mode | | | | | |
| | Miscellaneous page with a task in edit mode | | | | | |
| | Miscellaneous page with a task in delete mode | | | | | |
| "/focus/create" | Create new focus page | | | | | |
| "/focus/:id" | Focus page in mobile with everything set to view | | | | | |
| | Focus page in mobile with focus set to edit | | | | | |
| | Focus page in mobile with focus set to delete | | | | | |
| | Focus page in mobile with a goal set to edit | | | | | |
| | Focus page in mobile with a goal set to delete | | | | | |
| | Focus page in mobile with a task set to edit | | | | | |
| | Focus page in mobile with a task set to delete | | | | | |
| | Focus page in desktop with everything set to view | | | | | |
| | Focus page in desktop with focus set to edit | | | | | |
| | Focus page in desktop with focus set to delete | | | | | |
| | Focus page in desktop with a goal set to edit | | | | | |
| | Focus page in desktop with a goal set to delete | | | | | |
| | Focus page in desktop with a task set to edit | | | | | |
| | Focus page in desktop with a task set to delete | | | | | |
| "/takeaction" | TakeAction page in mobile | | | | | |
| | TakeAction page in desktop | | | | | |
| unknown route | Page not found page | | | | | |

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
