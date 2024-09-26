---
title: Reducing forced workbook reloads in multi-user Excel sessions
date: 2024-07-25
author: 
  display_name: Microsoft
description: C++, Various Internal Debugging & Session Investigation Tools
---
Completed: 2024-07-25 | Employer: Microsoft

---

In the summer of 2024 I worked with the Excel Coauthoring team at Microsoft as a Software Engineering Intern.
My work focused on reducing forced workbook reloads in multi-user Excel sessions. One of the ways that
forced workbook reloads could happen was when a user sent a change that wasn't compatible with what
a different user currently had on their screen. When this occurred, the entirety of the workbook would
be forced to reload to resolve the conflict, which could be a very slow an obnoxous process for large workbooks.

By the end of my internship, this feature was ready to start rolling out, and initial indications during limited
testing showed that workbook reloads were significantly reduced. I also gained experience working with internal
telemetry tools and writing queries (Kusto and KQL), as well as internal debugging and session investigation tools.
