import { Component, OnInit } from '@angular/core';

require('../../assets/js/webflow/webflow.js');

const allOpenings = [
  {
    title: 'Backend Engineer',
    location: 'bangalore',
    description: 'We are looking for a seasoned backend engineer who has built and maintained APIs at scale. Our API is the product, so you will spend significant time in supporting developers using our APIs, besides coding these APIs.',
    responsibilities: [
      "Design elegant APIs and abstractions that can be used by developers directly to build features in their apps",
      "Develop, document and test internal and external APIs",
      "Track performance and reliability of our APIs to meet promised SLA",
      "Work closely with developer customers to improve existing building blocks and add new ones",
      "Create automated feedback mechanisms for the developed APIs",
      "Create and maintain an evolving roadmap for the developed APIs"
    ],
    requirements: [
      "3+ years of experience working on distributed systems and shipping product features on schedule to production",
      "Hands-on experience with web backend stack- framework, API, relational database, cache, queue, unix system, web server, async processing and so on. We use python+django, postgresql, redis, celery, docker",
      "Ability to write clear documentation, step-by-step tutorials and compelling blogs",
      "Ability to plan and work in fast-paced uncertain environment"
    ],
    reveal: false
  },
  {
    title: 'Android Engineer',
    location: 'bangalore',
    description: 'We are looking for an Android developer with strong experience in Android platform to build location aware, highly performant SDKs with low resource footprint that will be used across millions of devices simultaneously, and their integration with HyperTrack’s cloud. You will be working with backend developers and designers to deliver the promise of accurate locations generated reliably with near-zero battery drain. Therefore, commitment to collaborative problem solving, sophisticated design, and creating quality products is essential.',
    responsibilities: [
      "Design, build, and maintain high performance, reusable, and reliable Java code",
      "Optimize the battery, data and resource footprint of the HyperTrack SDK",
      "Design reliable communications over high latency, patchy mobile networks",
      "Control release cycle, testing, automation, continuous delivery and analytics for the SDK"
    ],
    requirements: [
      "4 to 7 years of experience on Android. Bonus point if you have worked on an SDK.",
      "Experience with offline storage, background services, threading, FCM and performance tuning",
      "Knowledge of the open-source Android ecosystem and the common libraries available. Bonus points if you have written open source libraries for Android",
      "Bonus points if you have worked with location or sensors such as gyroscopes and accelerometers",
      "Experience with different versions of Android, and how to deal with different screen sizes",
      "Experience with RESTful APIs to connect applications to backend services",
      "Understanding of Google’s Android design principles and interface guidelines",
    ],
    reveal: false
  },
  {
    title: 'iOS Engineer',
    location: 'bangalore',
    description: 'We are looking for an iOS developer with strong experience in iOS platform and passion for building excellent user experience. You will be working alongside other engineers working on different layers of the stack. Therefore, commitment to collaborative problem solving, sophisticated design, and creating quality products is essential.',
    responsibilities: [
      "Design, build, and maintain high performance, reusable, and reliable Swift code",
      "Design and code for battery efficiency and low data consumptions",
      "Translate designs and wireframes into high quality code",
      "Maintain code quality, organization, automation and continuous delivery",
      "Work closely with customers to fix bugs and improve the user experience",
    ],
    requirements: [
      "2+ years of experience building applications for iPhone or iPad using Objective-C/Swift in a product company",
      "Knowledge of the open-source iOS ecosystem and the common libraries available",
      "Knowledge of iOS SDK performance tools and optimization techniques",
      "Experience with multithreading programming",
      "Experience writing unit tests and testable code",
      "Familiarity with the use of additional sensors, such as gyroscopes, pedometer and accelerometers"
    ],
    reveal: false
  },
  {
    title: 'Devops Engineer',
    location: 'bangalore',
    description: `We are looking for an experienced software engineer with strong background in DevOps and handling traffic & infrastructure at scale. As HyperTrack’s first DevOps hire, you will play a crucial role in guiding our systems development by taking ownership of our infrastructure, championing tools and technologies, refining our deployment practices, adopting frameworks and services needed by current and forward looking features.<br /> Our challenges are unique and the dataset is increasing by the day, so you should be comfortable navigating in uncharted territory and be able to assess different tools, techniques, design paradigms to help shape our architecture. Our APIs are written in Python+Django, deployed through docker containers on AWS ECS and handle millions of hits per day.`,
    responsibilities: [
      "Scale existing backend systems to handle continuously increasing traffic and new product requirements",
      "Collaborate with other developers to understand & setup tooling needed for Continuous Integration/Delivery/Deployment (CI/CD) practices",
      "Build & operate infrastructure to support ML & data science projects",
    ],
    requirements: [
      "5+ years of experience working on distributed systems and shipping high-quality product features on schedule",
      "Intimate knowledge of the whole web stack (front end, APIs, database, networks etc.)",
      "Ability to build highly scalable, robust, and fault-tolerant services and stay up-to-date with the latest architectural trends",
      "Experience with container based deployment, microservices, in-memory caches, relational databases, key-value stores",
      "Hands on experience with cloud infrastructure provisioning, deployment, monitoring (we are on AWS and use ECS, RDS, ELB, EC2, ASG, Elasticache, Elasticsearch, S3, CloudWatch)",
      "Adapt easily to meet the needs of fast growth and rapidly evolving developer needs"
    ],
    reveal: false
  },
  {
    title: 'Frontend Engineer',
    location: 'bangalore',
    description: 'Developers want to use location-based services to build great visual experiences with movement of users. Frontend developers find it challenging to build these visuals. We are looking for you to come and build SDKs for visuals that developers can use to build great experiences. As a UI/UX engineer, you would build visuals that thousands of developers would use to power great experiences for millions of users every day. The work is challenging, fast paced and rapidly evolving. You must have strong analytical skills, an unwavering commitment to quality, a collaborative work ethic, and cutting edge coding skills. You must live and breathe the fundamentals of JavaScript, CSS, and HTML, and command an impressive portfolio of web technologies new and old - all in order to launch innovative features to a global audience.',
    responsibilities: [
      "Lead design thinking and execution at HyperTrack",
      "Develop new customer-facing features",
      "Bring consistency to our UX at all touch points",
      "Optimize applications for maximum speed and scalability",
      "Build developer facing open-source libraries",
    ],
    requirements: [
      "Strong passion to build a world class UI design",
"Strong sense of web design and attuned to the fundamentals of UX",
"Experience with modern JavaScript frameworks (such as Backbone, Angular, React, Vue.js, Ember) and CSS pre-processing frameworks (such as Sass or Less)",
"Experience with web technologies (object-oriented JavaScript, HTML, CSS) and the latest web standards including HTML5 and CSS3",
"Good understanding of reactive programming like RxJS etc.",
"Familiarity with JavaScript module loaders and bundler, such as Webpack",
"Familiarity with ES6 and typescript",
"Proficient understanding of cross-browser compatibility issues and ways to work around such issues",
"Good understanding of browser rendering behavior and performance",
"Ability to write clear documentation, step-by-step tutorials and compelling blogs"
    ],
    reveal: false
  },

   {
    title: 'UI/UX Designer',
    location: 'bangalore',
   description: 'Developers use HyperTrack for the visual experience that we provide. We need your help in hand crafting HyperTrack design systems, and build the most delightful live location experience available.',
     responsibilities: [
    "Explore product concepts to find promising directions that address both human and business needs",
    "Build prototypes to assist in user research, using low- to high-fidelity techniques",
    "Craft complex component-based design systems",
    "Support multiple projects simultaneously while meeting tight deadlines",
    "Partner with front-end engineers on UI implementation",
    "Bring consistency to our UX at all touch points"
   ],
   requirements: [
      "Ability to prototype interactions with Principle",
      "Able to pick up programming languages if needed",
      "Comfortable in working in a 15 person startup",
      "Bonus if you know how to code your designs",
      "4+ years of experience with product design",
      "Experience in UI development for at least 1 platform (such as web, Android, or iOS)",
      "Body of design work demonstrating strong design process, and interaction and visual design skills",
      "Excellent leadership, communication, project management, and organizational skills"
        ],
    reveal: false
  },


  {
    title: 'Head of Design',
    location: 'bangalore',
    description: "HyperTrack exists to help developers build what they can imagine with location. You have the critical role of expanding the world's imagination about what is possible with location, especially involving movement. Nothing spurs the imagination of a location developer more than a stunning visual. We are constantly bringing the real world to life on our user's screens. <br /><br /> It is hard to build stunning visuals with location. It is harder to build primitives that others can use to build stunning visuals with location. You need to bring an insane amount of passion and imagination to make a dent in this universe. <br /><br /> HyperTrack is a playful, young and innovative brand with a hint of rebellion. Everything that we build will speak the design language you invent for us. Furthermore, everything that our customers build with us will spread the language to their users and communities.<br /><br /> You must be creative to the point of being neurotic, biased for action to the point of showing more than talking, and thought leader to the point of being a cult leader. You will get the creative space to express yourself and the resources to live your dream. You must have a proven track record of creating designs for category leading products with a heavy visual aspect, maps/location is a bonus. You must have worked with global teams building a product with a global footprint. We don't care if you use an iPhone or Android, a Mac or Windows (ok that one we do care!), Safari or Chrome. Similarly, we don't want you to care if our users consume your designs through any of these platforms.",
    responsibilities: [
    ],
    requirements: [
    ],
    reveal: false
  },
];

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.less']
})
export class JobsPageComponent implements OnInit {
  images = {
    arrow: require('../../assets/images/arrow.svg')
  };
  jobs = allOpenings;
  constructor() { }

  ngOnInit() {
  }

  onJobRevealToggle(index) {
    this.jobs[index].reveal = !this.jobs[index].reveal;
  }
}
