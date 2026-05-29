const image = (fileName) => {
  const folder = /\.(jpe?g)$/i.test(fileName) ? 'optimized/' : ''

  return `/image_resources/${folder}${encodeURIComponent(fileName)}`
}
const doc = (fileName) => `/text_resources/${encodeURIComponent(fileName)}`
export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const projectPath = (title) => `/project/${slugify(title)}`
export const projectAnchor = (title) => `#project-${slugify(title)}`
export const projectRoute = (title) => ({
  path: projectPath(title),
  query: { from: projectAnchor(title) },
})

export const normalizeMediaItem = (item, index = 0, title = 'Project') => {
  if (typeof item === 'string') {
    return {
      type: 'image',
      src: item,
      alt: `${title} image ${index + 1}`,
    }
  }

  return item
}

export const projectMediaItems = (project, key) => {
  const items = project[key] ?? project.media ?? []

  return items.map((item, index) => normalizeMediaItem(item, index, project.title))
}

export const buildProjectMarkdown = (project) => project.markdown ?? project.markdownHtml ?? project.summary ?? ''

export const site = {
  name: 'Todd Rylaarsdam',
  title: 'Audio and Software Engineer',
  intro:
    'Refined production work and thoughtful engineering, presented with a calm, editorial feel.',
  bio:
    'I build software, mix shows, and design technical tools that support live performance. During the day I\'m a software engineer at Microsoft working on Excel, and in my free time I work as a mix engineer, sound designer, and system designer. I\'m passionate about clear, dependable work that supports the creative process without getting in the way.',
  email: 'todd@toddr.org',
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/trylaarsdam',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/trylaarsdam/',
    },
  ],
}

export const heroSlides = [
  {
    image: image('GFU_Hunchback_Wide.jpeg'),
    alt: '',
    label: 'Productions',
    title: 'The Hunchback of Notre Dame',
    description: 'Sound Designer, Mix Engineer, George Fox University Theatre, 2026',
    href: projectPath('The Hunchback of Notre Dame'),
  },
  {
    image: image('comedy_fullstage.jpg'),
    alt: '',
    label: 'Productions',
    title: 'The Comedy of Errors',
    description: 'Sound Designer, Mix Engineer, George Fox University Theatre, 2025',
    href: projectPath('The Comedy of Errors'),
  },
  {
    image: image('adi_final.jpeg'),
    alt: '',
    label: 'Engineering',
    title: 'Automated Target Measurement',
    description: '1 micron-precision automated measurement system built for Analog Devices, 2026',
    href: projectPath('Automated Target Measurement'),
  },
  {
    image: image('footloose2.jpg'),
    alt: '',
    label: 'Productions',
    title: 'Footloose',
    description: 'Sound Designer, Mix Engineer, LED Pixel System Engineer, George Fox University Theatre, 2025',
    href: projectPath('Footloose'),
  },
]

const productionGallery = {
  hunchback: [
    image('GFU_Hunchback_Wide.jpeg'),
    image('GFU_Hunchback_Cover.jpeg'),
    image('GFU_Hunchback_PitSL.jpeg'),
    image('GFU_Hunchback_PitSR.jpeg'),
    image('GFU_Hunchback_Sound.jpeg'),
  ],
  comedy: [image('comedy_of_errors.jpg')],
  anythingGoes: [image('anythinggoes1.jpg'), image('anythinggoes3.jpg')],
  footloose: [image('footloose2.jpg')],
  brightStar: [image('brightstar1.jpg'), image('brightstar2.jpg'), image('brightstar3.jpg')],
  pirates: [image('pirates2.jpg'), image('pirates3.jpg')],
  hidingPlace: [image('20250831_FinalNight-31.jpg'), image('20250831_FinalNight-33.jpg'), image('20250831_FinalNight-48_websize.jpg')],
  senseAndSensibility: [image('2603_Theater_NotreDame_CGL5863.jpg'), image('2603_Theater_NotreDame_GF43728.jpg')],
  playThatGoesWrong: [image('PXL_20250402_185623176.jpg'), image('PXL_20250402_185623176 (1).jpg')],
  pottingShed: [image('mayo2.jpg'), image('mayo3.jpg')],
}

const engineeringGallery = {
  controller: [image('PXL_20260413_191717257.jpg'), image('PXL_20260413_193231966.jpg'), image('PXL_20260413_193236060.jpg')],
  emulator: [image('cpu1.jpg'), image('cpu2.jpg')],
  seizure: [image('mayo2.jpg'), image('mayo1.jpg'), image('mayo3.jpg')],
  sensors: [image('anl.jpg'), image('anl4.jpg'), image('anl3.jpg')],
  console: [image('mixing1.jpg'), image('mixing2.jpg'), image('mixing3.jpeg')],
  turingGuild: [image('turingguild3-scaled.jpg'), image('turingguild1.jpg'), image('turingguild2.jpg')],
}

// Project authoring:
// - homeImages controls the image grid on the portfolio home page.
// - projectImages controls the image grid under the markdown on the project page.
// - markdown is the freeform body content for the project page.
export const sections = [
  {
    id: 'engineering',
    title: 'Engineering',
    eyebrow: 'Software and embedded systems work',
    // description:
      // 'Projects that focus on reliability, workflow, and user experience in demanding technical environments.',
    projects: [
      {
        id: 'adi-target-measurement-system',
        title: 'Automated Target Measurement',
        year: '2026',
        client: "Analog Devices - Senior Design Capstone Project",
        role: 'Software & Technical Lead, Project Manager',
        summary:
          'A 1 micron-precision automated measurement system built for Analog Devices, designed to improve the efficiency of and decrease costs in their PVD manufacturing process.',
        homeImages: engineeringGallery.adi,
        projectImages: engineeringGallery.adi,
        markdown: `

        `
      },
      {
        id: 'project-universal-mixing-console-controller',
        title: 'Universal Mixing Console Controller',
        year: '2025',
        client: "ENGE420 Capstone Project",
        role: 'Hardware, software, and enclosure design',
        summary:
          'A custom controller compatible with a wide range of digital mixing consoles, featuring 5 motorized faders.',
        homeImages: engineeringGallery.console,
        projectImages: engineeringGallery.console,
        markdown: `
The companion is a device which can interface with a wide variety of sound consoles using OSC over the network. The expander has multiple input surfaces: a set of 5 motorized faders, small OLED screens at the top of each fader which display information about what that fader does (e.g. channel name, physical input location, live audio level for that channel), and a mute/solo button for each channel. The faders are sourced from replacement faders for an X32 console which contain the fader itself as well as an integrated motor. These faders contain a motor to move the fader up and down, and another connection to a slide potentiometer read the position of the fader from. The PCB contains a motor driver for each fader (DRV8871), and the appropriate filters and circuitry to route the fader position signal into an ADC.

The core of a device is a Particle Photon 2, which provides interfaces through its pinout for ethernet, I2C, SPI, and plenty of GPIO to connect to the hardware peripherals. However, it only has 2 analog inputs, so an ADC IC (MCP3008) is required to take the potentiometer inputs from each fader. Power would come from a 12V barrel jack input which is then regulated to the proper voltages for the P2 and other components. The universal aspect of the companion comes from how the expander talks to mixing consoles through a piece of software running on another computer, Mixing Station. Mixing Station can connect to many different types of consoles, and exposes an OSC API which allows the expander to interact with any one of the supported consoles in the same way. 
        `
      },
      {
        id: 'project-8_16bit-distributed-cpu-emulator',
        title: '8-bit Distributed CPU Emulator',
        year: '2020',
        client: "Windy City Lab / Northwestern University",
        role: 'Architecture and emulator design & implementation',
        summary:
          'A cloud-coordinated distributed 8 bit CPU emulator for collaborative CPU building and design in a remote learning environment.',
        homeImages: engineeringGallery.emulator,
        projectImages: engineeringGallery.emulator,
        markdown: `
Capable of coordinating 32 physical and unlimited virtual CPU components, and creating a network-based 8 or 16 bit CPU. Using a combination of custom PCBs and breadboards as well as the software Emulator, you can create your own custom CPU right on your desk.

The emulator supports up to 32 hardware components that interface with a Particle microcontroller over a custom PCB. Components can be built by hand on a breadboard, or made on custom PCBs.

Unlimited virtual components are emulated according to the user’s specifications. They can communicate via the internet with hardware components on your desk, and read values from the entire network of your CPU.
# Making this project
The CPU Emualtor is really more than just an emulator. It’s an entire suite of cross-platform tools that can be used to create partially emulated and partially DIY CPUs. The emulator itself is a python app with a simple Electron frontend. Users can define their own instruction set, architecture, CPU components, microcode, and more. All of this is done in a few easy to edit JSON files.

While the CPU can emulate the entirety of a program, it can also link to a custom PCB with a Particle Photon on it to allow a user to build some of the components of their CPU on a breadboard on their desk. When physical components are present, the Emulator does not emulate those components, and instead simulates the inputs of other components to the physical componets, and then reads the outputs of the physical components and integrates them into the emulated system.

Basically, if you’ve made a mistake in your hardware design, or have tweaked it to do something a little different, that will be reflected on your computer screen.

Overall, this project took 4 months to create.
        `
      },
      {
        id: 'project-embedded-real-time-seizure-detection-and-forecasting',
        title: 'Embedded Real-Time Seizure Detection and Forecasting',
        year: '2023',
        venue: 'Mayo Clinic research',
        client: 'Mayo Clinic',
        role: 'Embedded software intern',
        summary:
          'Internship in neurology at Mayo Clinic focusing on long term, near-real time EEG streaming and processing.',
        homeImages: engineeringGallery.seizure,
        projectImages: engineeringGallery.seizure,
        markdown: `
I spent the summer of 2023 working as an undergraduate intern in neurology at Mayo Clinic. I worked with the Bioengineering Neurophysiology and Engineering Lab (BNEL) to create and deploy an embedded device capable of running seizure detection algorithms in real time. The device was deployed for patient use in the Mayo Clinic Epilepsy Monitoring Unit (EMU) and used to analyze intracranial EEG data being collected in real time from patients.

Picutred above is my demo to the entire staff of the lab I worked with of the working first viable product of this device. The system included playing back EEGs of seizures recorded from actual patients at Mayo through a signal generator, then doing some voltage division to match the voltage levels to those of the brain, and then sending those signals into the electrodes of the brain implant we were using.

The physical device I built allowed multiple different EEG implants to interface with the at-edge Tiny-ML capable microcontroller, enabling 24/7 real-time seizure detection and forecasting for patients with epilepsy, whether they were in the hospital, at home, or off grid and disconnected from the internet.

My responsibilities at Mayo also included maintaining our existing backend infastructure, fixing bugs and adding features to our existing patient and physician-facing software, and creating new interfaces for physicians and research coordinators to view and interact with patient data.`
      },
      {
        id: 'project-argonne-national-lab-gen-3-soil-sensors',
        title: 'Argonne National Lab Gen 3 Soil Sensors',
        year: '2025',
        venue: 'Field sensor system',
        client: 'Argonne National Laboratory',
        role: 'Software, firmware, and RF board design',
        summary:
          'A sensor platform that emphasizes physical robustness, wiring discipline, and maintainable integration.',
        homeImages: engineeringGallery.sensors,
        projectImages: engineeringGallery.sensors,
        markdown: `
I worked on this project at Windy City Lab as a full time intern there. This project included a lot of different components, from PCB design (including RF filtering and amplification) to 3d enclosure modeling to API work in Node.JS. The premise of the project was that Argonne National Laboratory along with the University of Chicago wanted to have a fleet of 150 soil sensors (motes) buried underground for 4 years on battery, wirelessly transmitting the data they read from their various sensors to the cloud.

For the PCB design, I used KiCad to create schematics and PCB layouts for both our custom breakout board for the STM32WL (a microcontroller that we chose for being able to transmit on both LoRa and Sigfox), and the motherboard, which held 2 of those breakout boards (one for LoRa, one for Sigfox - due to limitations of the base firmware written by ST at the time, the microcontroller was only able to do one communication protocol at a time)). I worked with Field Application Engineers from ST to design these boards so that they would work correctly with the ST MCUs we were using (a huge thank you to Antonio and Alec for their instrumental help), and that the RF transmissions would have the lowest noise and highest power legally possible.

For the enclosure that contained the actual PCBs and batteries, I used KiCad to design a 3d printed device that allowed us to store 3 triple AA battery packs for a total of 9000mAh of battery capacity if required to meet the 4 year goal, and an easy to use snap-on mount for the motherboard. A screwless mount for the motherboard and batteries was crucial, since I would likely be the one assembling the devices, and 150 units * 4 screws * 5 seconds per screw adds up. For the external waterproof shell that housed the 3d printed portion, we used a 3in PVC pipe. It was readily available, and easily sealable with end caps and PVC glue.
        `
      },
      {
        id: 'project-turing-guild-learning-management-system',
        title: 'Turing Guild Learning Management System',
        year: '2024',
        client: 'Windy City Lab / Northwestern University',
        role: 'Software Engineering / Project Lead',
        summary:
          'A computer engineering & science focused LMS for high school students, built with an emphasis on easy code submission, instructor feedback, and friendly competition.',
        homeImages: engineeringGallery.turingGuild,
        projectImages: engineeringGallery.turingGuild,
        markdown: `
The Turing Guild is a group focused on teaching and mentoring high schoolers interested in computer science and computer engineering. I was brought on to help build a custom learning management system (LMS) for the group to fit their needs to function both synchronously via in-person courses, and asynchronously via purely online courses for their unique courses that all contain computer hardware that the students build and program themselves.

The LMS supports features like user self-registration, multiple methods of course enrollment (e.g. a course code given by an instructor who has pre-paid for courses or users enrolling and subscribing on their own), video and text-based content viewers, and a custom-built quiz system that both allows for traditional quizzes as well as a friendly cohort-based competition for users taking the course asynchronously.

The system also integrates with Discord, connecting users taking a course with other users in their same cohort, as well as with the instructors of the course. This allows for real-time help and support for users taking the course, as well as for instructors to be able to monitor the progress of their students and provide help when needed.

Turing Guild has been successfully used the primary LMS for multiple courses, including for in-person courses for Northwestern University’s CTD program, the Dubai College, and for multiple online-only cohorts.
        `
      },
    ],
  },
  {
    id: 'productions',
    title: 'Productions',
    eyebrow: 'Sound design, mixing, and theatrical process',
    description:
      'Selected shows and production environments with images, notes, and PDF case studies for each production.',
    projects: [
      {
        id: 'project-the-hunchback-of-notre-dame',
        title: 'The Hunchback of Notre Dame',
        year: '2026',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Sound Designer, Mix Engineer',
        summary:
          '32 body mics, an 11 member pit orchestra, and 14 speakers combined to support the huge scale of this production, all in a 235 seat house.',
        homeImages: productionGallery.hunchback,
        projectImages: productionGallery.hunchback,
        highlights: ['Mix design', 'Pit communication', 'Large ensemble'],
        markdown: `
# Awards
* American College Theatre Festival Region 7 - Meritorious Achievement Award in Sound Design
* George Fox University - Exceptional Student Design Award

# Equipment Highlights
* 31 body mics - 16 channels of EW-DX and 15 channels of ew100 G4
* A&H SQ5 and Qu16 mixers
  * SQ5 used as primary mixer, Qu16 completely automated through QLab and MIDI to send various ensemble & solo actor mixes as needed
* 6x QSC CP12 (Stereo Wide + Stereo Center), 2x QSC KLA 181 Subs, 4x JBL Control 25-T (front fill)
* 11 member pit orchestra - 22 input channels
* 6 musician IEM mixes and onstage/offstage monitoring for cast
* NDI feeds to dressing rooms to minimize backstage crowding
* Analog video monitoring (stage feeds, MD view, scenic automation safety angles) available throughout the venue.

# Creative Team
* Director – Ben Tissell
* Music Director – Wendy Vece
* Choreographer & Associate Director – Dylan Macabitas
* Scenic Designer – Bryan Boyd
* Costume Designer – Laurel Peterson
* Lighting Designer – Kacy Hughson
* Sound Designer – Todd Rylaarsdam
* Properties Artist – Victoria Rhodes
* Hair and Makeup Artist – Paige Hampton
* Dramaturg – Ellie Heerwagen

# System Design & Paperwork
### Mic Plot
<object data="/text_resources/Hunchback-Mic-Plot.pdf" type="application/pdf" width="100%" height="600px">
    <embed src="/text_resources/Hunchback-Mic-Plot.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="/text_resources/Hunchback-Mic-Plot.pdf">Download PDF</a>.</p>
    </embed>
</object>

### Sound System Design

<object data="/text_resources/Hunchback-Sound-System.pdf" type="application/pdf" width="100%" height="600px">
    <embed src="/text_resources/Hunchback-Sound-System.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="/text_resources/Hunchback-Sound-System.pdf">Download PDF</a>.</p>
    </embed>
</object>
`,
      },
      {
        id: 'project-comedy-of-errors',
        title: 'Comedy of Errors',
        year: '2025',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Sound Designer, Mix Engineer',
        summary:
          '',
        homeImages: productionGallery.comedy,
        projectImages: productionGallery.comedy,
      },
      {
        id: 'project-anything-goes',
        title: 'Anything Goes',
        year: '2025',
        venue: 'Broadway Rose Theatre Company',
        client: 'Broadway Rose Theatre Company',
        role: 'Mix Engineer 2',
        summary:
          '',
        homeImages: productionGallery.anythingGoes,
        projectImages: productionGallery.anythingGoes,
      },
      {
        id: 'project-footloose',
        title: 'Footloose',
        year: '2025',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Sound Designer, Mix Engineer, and LED Pixel System Design',
        summary:
          '',
        homeImages: productionGallery.footloose,
        projectImages: productionGallery.footloose,
      },
      {
        id: 'project-bright-star',
        title: 'Bright Star',
        year: '2024',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Sound Designer, Mix Engineer',
        summary:
          '',
        homeImages: productionGallery.brightStar,
        projectImages: productionGallery.brightStar,
      },
      {
        id: 'project-the-pirates-of-penzance',
        title: 'The Pirates of Penzance',
        year: '2024',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Sound Designer, Mix Engineer',
        summary:
          '',
        homeImages: productionGallery.pirates,
        projectImages: productionGallery.pirates,
      },
      {
        id: 'project-the-hiding-place',
        title: 'The Hiding Place',
        year: '2024',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Assistant Sound Designer and Master Sound Technician',
        summary:
          '',
        homeImages: productionGallery.hidingPlace,
        projectImages: productionGallery.hidingPlace,
      },
      {
        id: 'project-sense-and-sensibility',
        title: 'Sense and Sensibility',
        year: '2023',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Mix Engineer',
        summary:
          '',
        homeImages: productionGallery.senseAndSensibility,
        projectImages: productionGallery.senseAndSensibility,
      },
      {
        id: 'project-the-play-that-goes-wrong',
        title: 'The Play That Goes Wrong',
        year: '2023',
        venue: 'George Fox University Theatre',
        client: 'George Fox University Theatre',
        role: 'Assistant Sound Designer',
        summary:
          '',
        homeImages: productionGallery.playThatGoesWrong,
        projectImages: productionGallery.playThatGoesWrong,
      }
    ],
  },
]
