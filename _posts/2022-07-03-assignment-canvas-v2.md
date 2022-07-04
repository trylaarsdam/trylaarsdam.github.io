---
title: Assignment Canvas (v2)
layout: post
post-image: "https://www.american.edu/library/technology/canvas/images/canvas_logo.jpg"
description: Tapping directly into the Canvas API, Assignment Canvas organizes all your announcements and assignments from all your courses into one central location. No more clicking through a dozen courses to find all your homework.
tags:
- web
---

This is a version 2 of the old Assignment Canvas I built back in 2021 ([learn more about that here](https://toddr.org/projects/assignment-canvas)). This new and improved version adds a bunch of stuff the old one didn't have, like viewing assignments in detail, external linking to Canvas, an easier setup process, and a new responsive UI. 

Assignment Canvas v2 ([trylaarsdam/assignment-canvas](https://github.com/trylaarsdam/assignment-canvas))is built using VueJS 2 on the frontend, and an ExpressJS API for the backend. I went with Vue due to some earlier experience I had with it from my work at [Windy City Lab](https://thewcl.com), and really loved how it managed state and routing. The new frontend is much prettier than the old one which was built using vanilla HTML and no UI framework whatsoever, and is now (mostly) compliant with Material Design.

The Express backend ([trylaarsdam/canvasApiInterface](https://github.com/trylaarsdam/canvasapiinterface)) is what actually reads the database to retreive user keys and such to access Canvas. I decided that it would be easiest and most secure if the frontend didn't need to access Canvas directly, and I could abstract that away underneath my own API which would be fine tuned for what I needed it to do. 

Overall the initial development time of this project took around 1-2 months of on and off work, but Assignment Canvas will continue to be developed on throughout my 4 years at George Fox University. 
