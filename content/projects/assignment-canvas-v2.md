---
title: Assignment Canvas v2
date: 2022-07-03
author: 
  display_name: Personal Project
description: VueJS, Nginx, NodeJS, ExpressJS, Google Cloud
---
Completed: 2022-07-03 | Personal Project

---

{{< imagewithtext img="/assets/assignment-canvas-v2.png" >}}

<!-- {{< imagewithtext img="/assets/assignment-canvas-v2-app.jpg" >}} -->

This is a version 2 of the old Assignment Canvas I built back in 2021 ([learn more about that here](/projects/assignment-canvas-v1)). This new and improved version adds a bunch of stuff the old one didn't have, like viewing assignments in detail, external linking to Canvas, an easier setup process, and a new responsive UI. You can give it a try at [canvas.toddr.org](https://canvas.toddr.org)

I also made an Android app using Kotlin and Jetpack Compose that interacts with the Assignment Canvas API to let you view your account and feed from your phone. You can find it [for free on the play store](https://play.google.com/store/apps/details?id=com.trylaarsdam.assignmentcanvas). 

Assignment Canvas v2 ([trylaarsdam/assignment-canvas](https://github.com/trylaarsdam/assignment-canvas)) is built using VueJS 2 on the frontend, and an ExpressJS API for the backend. I went with Vue due to some earlier experience I had with it from my work at [Windy City Lab](https://thewcl.com), and really loved how it managed state and routing. The new frontend is much prettier than the old one which was built using vanilla HTML and no UI framework whatsoever, and is now (mostly) compliant with Material Design.

The Express backend ([trylaarsdam/canvasApiInterface](https://github.com/trylaarsdam/canvasapiinterface)) is what actually reads the database to retreive user keys and such to access Canvas. I decided that it would be easiest and most secure if the frontend didn't need to access Canvas directly, and I could abstract that away underneath my own API which would be fine tuned for what I needed it to do. 

Overall the initial development time of this project took around 1-2 months of on and off work, but Assignment Canvas will (probably) continue to be developed on throughout my 4 years at George Fox University. 
