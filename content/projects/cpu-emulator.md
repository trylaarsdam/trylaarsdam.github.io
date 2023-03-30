---
title: CPU Emulator
date: 2020-07-20
author: 
  display_name: Windy City Lab
---
Completed: 2020-07-20 | Employer: Windy City Lab

---

{{< imagewithtext img="/assets/cpu.jpg" >}}

Capable of powering 32 physical and unlimited virtual CPU components, and creating a network-based 8 or 16 bit CPU. Using a combination of custom PCBs and breadboards as well as the Emulator, you can create your own custom CPU right on your desk.

The emulator supports up to 32 hardware components that interface with a Particle microcontroller over a custom PCB. Components can be built by hand on a breadboard, or made on custom PCBs.

Unlimited virtual components are emulated according to the user's specifications. They can communicate OTA with hardware components on your desk, and read values from the entire network of your CPU.

A V2 version branded as NAND7400 is coming soon at [nand7400.com](https://nand7400.com). This version features hardware RAM support (before RAM was emulated using a microcontroller), as well as new PCB designs and an iOS app to control the entire system.

## Making this project

The CPU Emualtor is really more than just an emulator. It's an entire suite of tools that can be used to create partially emulated and partially DIY CPUs. The emulator itself is a python app with a simple Electron frontend. Users can define their own instruction set, architecture, CPU components, microcode, and more. All of this is done in a few easy to edit JSON files. 

While the CPU can emulate the entirety of a program, it can also link to a custom PCB with a Particle Photon on it to allow a user to build some of the components of their CPU on a breadboard on their desk. When physical components are present, the Emulator does not emulate those components, and instead simulates the inputs of other components to the physical componets, and then reads the outputs of the physical components and integrates them into the emulated system. 

Basically, if you've made a mistake in your hardware design, or have tweaked it to do something a little different, that will be reflected on your computer screen.

Overall, this project probably took 4 months to create. 