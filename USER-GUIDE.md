### Login Page
#### Overview
The Login component provides a user interface and logic for signing into the application. It allows users to input their email and password, validates the credentials, sends a request to the backend API, and upon success, stores user information for session persistence.

#### End User Instructions
1. Open the application.

2. Enter your email and password in the form.

3. Click the Login button.

4. If credentials are valid:
- You’ll see a success notification.
- You’ll be redirected to the dashboard.

5. If credentials are invalid:
- An error message will appear under the title.

### Dashboard Page
#### Overview
The Dashboard page displays a high-level summary of the daycare system. including learners, employees, users, and events. It adapts dynamically to the user’s role (admin or non-admin) and retrieves data from multiple contexts.

#### End User Instructions
1. Login to the system.

2. Navigate to the Dashboard page.

3. As an Admin, you’ll see:
- Total Learners
- Total Employees
- Total Users
- Total Events

4. As a Non-Admin, you’ll see only:
- Total Learners
- Scroll down to view Upcoming Events.
- Events are color-coded for easy identification.

### Learners Page
#### Overview
The Learners page manages the list of children in the system.
It allows you to:
- View all learners with their details
- Add a new learner via a modal form
- View detailed learner info in a modal
- Paginate through learners if the list is long

#### End User Instructions
1. Go to the Learners page from the dashboard.

2. View the list of registered learners.

3. To add a new learner:
- Click Add Child.
- Fill in the form (Name, DOB, Gender, Guardian, Contact Number).
- Click Submit.

4. To view a learner’s profile:
- Click View next to the learner’s row.
- A modal will appear showing detailed information.

5. Use pagination arrows to navigate if there are many learners.

### Employee Page
#### Overview
The Staff page manages employee information for the daycare.
It allows you to:
- View a list of employees with their details
- Add new employees via a modal form
- View detailed information for each employee
- Paginate through employee records

#### End User Instructions
1. Go to the Employees page.

2. View the table of staff members:
- Name
- Department
- Position
- Email
- Start Date
- Address
- Contact Number

3. To add a new employee:
- Click Add Employee
- Fill in all required fields
- Click Submit

4. To view details:
- Click View next to the employee’s row
- A modal will display full details

5. Use pagination arrows < > or page numbers to navigate.

### Users Page
#### Overview
The Users Page allows admins to manage system users such as teachers, staff, and parents.
It provides tools to add new users, view details, and navigate through the user list with pagination.

#### End User Instructions
1. Add a User
- Click the Add User button.
- Fill out the form.
- Submit to save the new user.

2. View User Details
- Locate a user in the list.
- Click View to open the details modal.

3. Navigate Pages
- Use the page controls at the bottom to move between pages.

### Activities Page
#### Overview
The Activities Page helps staff plan, track, and manage daily activities for learners across all groups.
It allows adding new activities, categorizing them, tracking their status, and viewing their details in a simple list format.

#### End User Intructions
1. Add an Activity
- Click the New Activity button.
- Fill out the form.
- Submit to save.

2. View Activities
- Activities appear in a styled list.
- Each item shows time, category, group, and current status.

### Calendar Page
#### Overview
This page allows staff to:
- View events in a calendar grid
- See an upcoming events list
- Add new events
- Identify event types with color codes

#### End User Intructions
1. Viewing Events
- The calendar grid displays days for the current month.
- Today’s date is highlighted for easy reference.
- Events scheduled for each day appear as colored labels.
- Use the Upcoming Events list below the calendar to see upcoming activities at a glance.

2. Navigating the Calendar
- Click the ← button to view the previous month.
- Click Today to quickly return to the current month.
- Click the → button to view the next month.

3. Understanding Event Types
- Each event type has a color code:
- Blue: Meetings & Conferences
- Green: Field Trips
- Yellow: Staff Events
- Purple: Special Celebrations
- Refer to the Event Types legend on the right for details.

4. Adding a New Event
- Fill in the Add New Event form on the right side:
- Enter the event name.
- Select the date.
- Choose the event type.
- Add a description.
- Click Add Event to save.
- The new event will appear immediately on the calendar and in the upcoming events list.