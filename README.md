# Leads management

## Api overview

### Leads and services

- get all: `/api/leads/admin/:adminId`
- post, update, delete: `/api/leads/:id/admin/:adminId`

### Projects

- get all: `/api/projects/lead/:leadId`
- post, update, delete: `/api/projects/:id/lead/:leadId`

All api needs to have following flow:

- leads: verify admin -> response
- service: verify admin -> verify purchase -> response
- projects: verify admin -> verify purchase -> response

All api are designed in similar pattern.

## Frontend overview

- redux
  -slice for admin

  - redux api for admin, leads, service and projects
  - middleware: logout when token expires

- components

  - common components

- features

  - make files and folders as per features

- layout

  - mainlayout -> no login layout
  - dashboardlayout -> login layout

- pages

  - pages as per routes

- utils

  - commonly used local functions like date formating and date manipulating

- routing done from CustomeRoutes.jsx
