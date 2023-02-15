---
title: Launch Chicago LMS
layout: post
post-image: "https://toddr.org/assets/images/launch-chicago.png"
description: A custom learning management system (LMS) for Launch Chicago - a Chicago based non-profit seeking to expose underrepresented kids in Chicago's neighborhoods to computer science.
tags:
- web
- mobile
---

This project was for an initiative of Windy City Lab called Launch Chicago. Launch wanted a learning management system (LMS) to facilitate their hybrid approach to teaching Swift, app development, and computer science, but nothing available on the market was really a good fit for the coding focued classwork.

I worked on this app for a few months, first designing the data structures to store course content, user data, and results in, and then adding in both student and teacher/administrator UIs. This was all done with the intent of making either an iPad app or a MacOS application. To ensure that we wouldn't have to rewrite a lot of the codebase, we utilized Apple's Catalyst software to be able to build both an iPadOS and MacOS app from the same codebase. While that technology is imperfect, it still was far faster than writing two completely unique UIs. 

The project expanded when we wanted to embed videos in the app. An easy solution would have just been to upload them to YouTube and embed them in either a Youtube web player or in SwiftUI's built in video player, but we also wanted to keep videos private and accessible only to those within the launch program, as well as track how much of a video each user has watched to make sure students were still engaged. The solution we came up with was a ReactJS and ExpressJS app which served a React web UI with a video player made with VideoJS. The VideoJS player reports user watchtime back to the API made using Express, and that data is stored in the central database for all of Launch which then through the Launch app teachers can access to see their student's data.

Overall this app was my first real foray into both SwiftUI and React. Over time I have shifted from developing web apps in React to Vue, as I find it more intuitive for how I code, but I have really liked SwiftUI ever since I started this project.
