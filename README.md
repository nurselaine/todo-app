# To Do List Manager

  Project Goal: Implement use context API to create a task management tool & Utilize Mantine for styling and visual components

  This app will securely manage a to do list and persist tasks within a database. Secure routes will be used to provide users with role based access control. This application utilizes functional components, setting delivered to application using Context, use login & permissions delivered to the Context, local storage for login and user preferences. Axios will be used for API requests and developed using TDD & CI/CD. This app is also deployed to a cloud provider

## Author: Elaine Huynh

## Start Instructions
  - npm i uuid @mantine/core @mantine/hooks @emotion/react axios

## Phases

  Phase 1: Application Setup
    Basic To Do List Management, using Hooks
    - Refactor To Do Application built by another team
      - modularize the application and utilize Mantine API to style application
  Phase 2: Persistence
    Implement a custom Form Hook
    Implement a custom Ajax Hook
    Connect to a live API for storing To Do Items
  Phase 3: Settings and Global Context
    Implement user settings for displaying items
  Phase 4: Authorization
    Require a login to access the list
    Restrict access to adding, editing, deleting to certain user types

