---
title: Assignment Canvas
layout: post
post-image: "https://www.american.edu/library/technology/canvas/images/canvas_logo.jpg"
description: Tapping directly into the Canvas API, Assignment Canvas organizes all your announcements and assignments from all your courses into one central location. No more clicking through a dozen courses to find all your homework.
tags:
- web
- desktop
---

Tapping directly into the Canvas API, Assignment Canvas organizes all your announcements and assignments from all your courses into one central location. No more clicking through a dozen courses to find all your homework. Users simply enter an access token that is authorized to only read data from their account, and they're up and running.

Assignment Canvas was created when my school switched to Canvas as their LMS. While I liked parts of it, Canvas' organization of announcements and assignments was extremely annoying to me. The "feed" option didn't show assignments if they didn't have a due date, and I had to click through every one of my classes to view all their announcements. That's why I made Assignment Canvas - to be a central location for all your assignments and announcements.

## Making this project

Assignment Canvas uses the public Canvas API to fetch all your announcements and assignments from all your courses. It renders this information into a webpage using a framework called Pug, and it is served using Express.JS and Nginx. There's also an API that you could use to fetch that data from Assignment Canvas and then use to make your own UI. Let me know if you want access and I'll send over some documentation.

User profile information (like whether or not they are an Assignment Canvas Administrator, their name, profile picture, etc.) is stored in Google's Firebase Firestore database. Users login using their Google account, so we don't need to manage any passwords or anything like that. None of a user's Canvas data is stored by us. That's both how we keep the privacy of student's education intact, and how the information displayed is always up to date.

Overall, this project took about 2 months of work to create the working site, and I've been updating it on and off for the past few months. Depending on what college I choose to go to has as their LMS, you might see more changes in the future.