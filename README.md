# CaseTracker

[SEI34 Project 4] CaseTracker is a case management application that tracks the progress and timeliness of completion of each purchase.

## Description

CaseTracker aims to replace the manual data entry method for tracking the progress and timeliness of purchases handled by individual staff in a procurement department. It provides a personalised dashboard to help staff prioritize the cases they have on hand, and tracks the dates of completion of various milestones against the planned timeline. Supervisors and management will also have a personalised dashboard to show cases pending their actions/reviews, and also an overview of the load for staff reporting to them.

## TechStack

Frontend:

- React
- CSS: Bootstrap
  Backend:
- Django (planned)
  Database:
- Postgresql

## Wireframes

Refer to [Miro] (https://miro.com/app/board/uXjVOKoFmwg=/)

## Database ER Diagram
Refer to [LucidApp] (https://lucid.app/lucidchart/cc261d49-24dc-445e-af47-8e9dd54714ea/edit?page=0_0&invitationId=inv_ed2d97c1-486e-4ff0-b842-687b4563ffee#)

## User Stories

**User groups**

1. Staffer
2. Manager
3. DeputyDirector
4. Director
5. Admin

**Landing Page**

1. Registered user should be able to log into his/her account.
2. Registered user should see his/her personalised dashboard after log in.
3. Non-registered user should be able to sign up for an account.
4. Non-registered user should see his/her dashboard after sign up.
5. Stretch goal: Non-registered user should be able to log in via demo account.

**Sidebar**

1. Logged in user should be able to see the sidebar on the left side of the screen.
2. Sidebar should provide navigation to dashboard, all cases, profile, and signout.

**Dashboard**

1. User should be able to see his/her name.
2. User should be able to see the number of cases due in the next 1 month, 2 months and 3 months.
3. User should be able to see a one-row summary of all the cases managed by him/her, sorted by planned completion date of the current milestone. The one row summary should display title, current milestone, planned completion date, and a "completed" button to move the case to the next milestone, and an "expand" button to see more details of the case.
4. Upon clicking the "expand" button, User should see all the milestones, and planned completion date, and the actual completed dates for the milestones that have been completed.
5. Upon clicking the "expand" button, User should able to be able to see and add notes for the case. User should be able to edit notes added by him/her.
6. Upon clicking the "expand" button, User should be able to see a edit button. The edit button should allow the User to edit the title, planned dates and completed dates, and the reporting chain for the case.
7. User should see a button to add a new case.

**Domain**

1. User should be able to see a one-row summary of all the cases belonging to his/her domain.
2. Upon clicking the expand button, User should be able to see all the milestones, and planned compltion date, and the actual completed dates for the milestones that have been completed.
3. User should be able to search for cases by title, staffer, milestone, value, and current user.

**New Case**

1. User should be able to create new case.
