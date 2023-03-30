---
title: Code Snippets
date: 2022-06-15
author: 
  display_name: Personal Project
description: VueJS, Nginx, NodeJS, ExpressJS, Google Cloud
---
Completed: 2022-06-15 | Personal Project

---

After Windy City Lab switched over to using Discord for internal communication, we encountered a problem when sharing code: discord has a 2000 character limit for messages unless you subscribe to their Nitro plan. This meant that if you wanted to share a large code snippet, you had to either break it up into multiple messages, or upload it as a file. Neither of these options were ideal, so I decided to make a web app to solve this problem.

The app simply gives you a code editor to paste your code into, and when you hit "save" gives you a short link that you can share to anyone. When someone clicks that link, they get a read-only version of your code displayed nicely on their screen, with syntax highlighting and line numbers, as well as easy options to copy the entirety of your code to their clipboard.

If you'd like to try it out, go to [code.toddr.org](https://code.toddr.org) and paste in some code, and hit "Copy" in the top right corner.