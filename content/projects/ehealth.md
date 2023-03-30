---
title: eHealth Platform
date: 2022-07-01
author: 
  display_name: Windy City Lab/Mayo Clinic
description: NodeJS, Google Cloud, ExpressJS, VueJS, Nginx, Grafana, InfluxDB, Prometheus, Windows Apps
---
Completed: 2022-07-01 | Client: Mayo Clinic | Employer: Windy City Lab

---

{{< imagewithtext img="/assets/ehealth.png" >}}

The EHealth system was part of a contract for [Mayo Clinic's BNEL](https://www.mayo.edu/research/labs/bioelectronics-neurophysiology-engineering/overview) (Bioelectronics Neurophysiology and Engineering) laboratory. Their focus is on patients with chronic epilepsy and seizures and using brain implants
to try and detect and disrupt these events preemptively.

WCL was originally only responsible for building an iOS and watchOS app for EHealth, however this transformed into a whole suite of tools that I was a part of building. This included export scripts to retreive patient data from our databases and return it in local JSON formats as well as recorded audio and video files that would be encrypted to protect patient privacy and then stored. I also worked on a desktop application for Windows that monitored various local databases running on devices that patients carried with them at all times, and that then streamed that data to the cloud and our services where it could be displayed to doctors mere minutes after the data was collected.

*In the summer of 2023, I'm going to be working with the the BNEL lab as an intern to continue working on this project, and I'm looking forward to seeing how we can move forward with the entire system (which has now been rebranded to Brainrise).*

I also worked on an API for this system which allowed the developers at Mayo working on their own parts of the project to access data stored on our servers, as well as allowing some of our own systems to get patient information and store data where using native SDKs for Firebase wasn't an option.

The really cool part of this project in my opinion was graphing all of this data. The researchers at Mayo really wanted a performant, easy to use (not just by developers, but for doctors as well) website that would display all sorts of vital signs and readings like EEG, ECG, heart rate, step counts, oxygen saturation levels, and statuses for the various physical devices in the system. When tasked with making this, I originally made a completely custom graphing dashboard using ApexCharts and Vue2. However after running into some tricky performance issues, I found Grafana, an easy to use and setup graphing application that would easily allow doctors to make their own custom charts and alerts for whatever they wanted to see for each patient.

But we also needed to store the data somewhere that we wanted to graph. For the rest of this project we were using Google's Firestore as well as a whole host of other GCP tools like VMs, cloud storage, and cloud functions. However for some of the data that we were injesting which being mainly EEG data, could come in constantly at over 2000 samples/sec/patient, we needed something with more performance and the ability to easily downsample data for graphing. For this we ended up using InfluxDB2, a time series database that ended up being more than capable of handling our multi-billion sample dataset. 