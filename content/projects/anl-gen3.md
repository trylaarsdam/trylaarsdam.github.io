---
title: ANL Gen3 Soil Sensors
date: 2022-03-01
author: 
  display_name: Windy City Lab/Argonne National Laboratory
description: C++, STM32 MCUs, Particle MCUs, PCB Design, KiCad, Onshape, Google Cloud, NodeJS, ExpressJS
---
Completed: 2022-03-01 | Client: Argonne National Laboratory | Employer: Windy City Lab

---

{{< imagewithtext img="/assets/anl-gen3.png" >}}

I worked on this project at [Windy City Lab](https://thewcl.com) as a full time intern there. This project included a lot of different 
components, from PCB design (including RF filtering and amplification) to 3d enclosure modeling to API work in Node.JS. The premise of the project
was that Argonne National Laboratory along with the University of Chicago wanted to have a fleet of 150 soil sensors (motes) buried underground for
4 years on battery, wirelessly transmitting the data they read from their various sensors to the cloud. 

For the PCB design, I used KiCad to create schematics and PCB layouts for both our custom breakout board for the STM32WL (a microcontroller that we chose for being able to transmit on both LoRa and Sigfox), and the motherboard, which held 2 of those breakout boards (one for LoRa, one for Sigfox - due to limitations of the base firmware written by ST at the time, the microcontroller was only able to do one communication protocol at a time)). I worked with Field Application Engineers from ST to design these boards so that they would work correctly with the ST MCUs we were using (a huge thank you to Antonio and Alec for their instrumental help), and that the RF transmissions would have the lowest noise and highest power legally possible.

For the enclosure that contained the actual PCBs and batteries, I used KiCad to design a 3d printed device that allowed us to store 3 triple AA battery packs for a total of 9000mAh of battery capacity if required to meet the 4 year goal, and an easy to use snap-on mount for the motherboard. A screwless mount for the motherboard and batteries was crucial, since I would likely be the one assembling the devices, and 150 units * 4 screws * 5 seconds per screw adds up. For the external waterproof shell that housed the 3d printed portion, we used a 3in PVC pipe. It was readily available, and easily sealable with end caps and PVC glue. 

<!-- You can view and experience a Gen 3 mote in your space by visiting my [AR/interactive 3D model demo](https://toddr.org/demos/anl-ar). -->