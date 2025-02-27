const header = {
  homepage: "",
  title: "AT",
};

const about = {
  name: "Akash Thirumuruganantham",
  role: "Full Stack Developer",
  description:
    "Experienced Full-Stack Developer with a proven track record of designing and implementing robust applications. Specialized in React,Flutter, NodeJs, MongoDb, ExpressJs,(MERN stack) NextJS, SQL, I excel in optimizing performance and delivering scalable solutions. Proficient in Agile methodologies, project leadership, codebase refactoring, and implementing CI/CD pipelines. Strong problem-solving and communication skills contribute to successful project outcomes.",
  resume:
    "https://drive.google.com/file/d/1axWbdj17I0pcwZeNbDZuh9wSkGUPqi0v/view?usp=drive_link",
  social: {
    linkedin: "https://www.linkedin.com/in/akash-thirumuruganantham/",
    github: "https://github.com/Akash-2204",
  },
  createdBy: "Created by Akash Thirumuruganantham",
};

const projects = [
  {
    name: "Portfolio Website",
    description:
      "A futuristic, interactive portfolio showcasing skills, projects, and experience with smooth animations, 3D elements, and a responsive design. Features a dynamic timeline, scroll-based transitions, and a real-time email contact form integrated with EmailJS.",
    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Three.js",
      "Framer Motion",
      "SCSS",
      "MUI",
      "EmailJS",
    ],
  },
  {
    name: "Health Metrics Dashboard",
    description:
      "Designed and developed a scalable health metrics dashboard using React, Node.js, and MongoDB, delivering real-time analytics for healthcare providers. Integrated MongoDB with WebSocket for real-time updates, reducing latency by 25% and improving decision-making with up-to-the-minute insights.",
    stack: ["React", "Node.js", "MongoDB", "WebSocket"],
  },
  {
    name: "GitHub Repository Analytics and Forecasting with LLMs",
    description:
      "Designed and implemented a system leveraging GitHub API, TensorFlow LSTM, and LangChain to enable semantic search, forecast repository metrics, and identify similar issues. Utilized vector embeddings in Elasticsearch for high-accuracy matching.",
    stack: [
      "OpenAPI",
      "GitHub API",
      "TensorFlow",
      "LangChain",
      "Elasticsearch",
    ],
  },
  {
    name: "Queue Management System",
    description:
      "Crafted to enhance patient waiting experiences in healthcare environments, including clinics, hospitals, and medical centers, this solution reduces wait times, boosts patient satisfaction, and optimizes operational efficiency by leveraging React, Node.js, and AWS services to manage patient queues seamlessly and efficiently.",
    stack: ["TypeScript", "React", "Node.js", "AWS"],
  },
  {
    name: "Patient Connect Chat",
    description:
      "This project aims to develop a real-time chat application tailored for healthcare, utilizing React for the frontend, Node.js for the backend, and AWS services for deployment, scalability, and reliability. The application will enable patients and healthcare professionals to create accounts, join chat rooms, and exchange messages in real-time.",
    stack: ["TypeScript", "React", "Node.js", "AWS"],
  },
  {
    name: "Anomaly-Driven-Video-Summarization",
    description:
      "A real-time surveillance system that enhances anomaly detection by analyzing video footage, identifying unusual activities, and summarizing critical events to improve security monitoring and data retrieval efficiency.",
    stack: ["Python", "TensorFlow", "OpenCV", "NumPy", "3D ResNet"],
  },
  {
    name: "Sensor Data Collection using an Autonomous Drone",
    description:
      "Designed an autonomous UAV with a 1.5km range and 4-hour flight time. Executed data collection missions gathering temperature and pressure data at diverse locations using preloaded GPS coordinates.",
    stack: ["Arduino", "Python"],
  },
  {
    name: "UHF RFID Laundry Tracking System",
    description:
      "Developed a resilient solution for tracking diverse garments within the pharmaceutical industry. Designed a custom RFID transmitter/receiver system affixed to garments, enabling efficient bulk scanning and streamlined data storage. Winners of Smart India Hackathon 2019 Hardware Edition.",
    stack: ["Arduino", "Python", "RFID", "C++"],
  },
  {
    name: "Resource Allocation using Power Domain Non-Orthogonal Multiple Access",
    description:
      "Implemented strategies to enhance the efficiency of Non-Orthogonal Multiple Access (NOMA), thereby establishing a more stable communication framework.",
    stack: ["Matlab"],
  },
];

const experiences = [
  {
    type: "school",
    role: "Master's in Computer Science",
    company: "Illinois Institute of Technology",
    duration: "Aug 2023 - May 2025",
    location: "Chicago, IL, USA",
    description: [
      "Gained expertise in Mobile Application Development, focusing on cross-platform app development using Flutter and React Native.",
      "Developed a strong foundation in Machine Learning, working with supervised and unsupervised algorithms, deep learning models, and real-world datasets.",
      "Enhanced problem-solving skills through Data Structures and Algorithms, implementing optimized solutions for complex computational problems.",
      "Explored distributed computing and cloud technologies, leveraging AWS, GCP, and Azure for scalable application development.",
      "Engaged in hands-on projects involving AI, full-stack development, and system design, applying knowledge to build real-world applications.",
    ],
    stack: [
      "Mobile Application Development",
      "Machine Learning",
      "Data Structures and Algorithms",
    ],
  },
  {
    type: "work",
    role: "Fullstack Developer",
    company: "Vitasoft Technologies",
    duration: "Jun 2021 - Jul 2023",
    location: "Chennai, India",
    description: [
      "Led a team of 6 in the design and development of a scalable SaaS-based patient navigation portal using React (Next.js), React Native, GraphQL, TypeScript, and Python, achieving a 60% increase in user satisfaction and 40% faster load times.",
      "Developed reusable, responsive UI components using React (Next.js), Storybook, and Figma, while collaborating with cross-functional teams to implement interactive and responsive designs, enhancing user experience across diverse devices.",
      "Designed and deployed scalable solutions using AWS services (Lambda, S3, CloudFront, Route 53), implementing secure API integrations and data encryption to ensure performance, availability, and regulatory compliance across distributed systems.",
      "Designed and implemented microservices architecture with Node.js, gRPC, and Kafka for seamless communication and real-time data streaming, optimizing RESTful APIs with Redis and MongoDB, achieving a 50% improvement in query efficiency.",
      "Enhanced frontend performance with Webpack, Babel, code-splitting, lazy loading, and caching, and improved backend by designing RESTful APIs with Redis and MongoDB, achieving a 40% reduction in load times and 50% faster query responses.",
      "Implemented robust testing frameworks with Jest and Cypress, achieving 95% test coverage and reducing production issues by 30%, while automating CI/CD pipelines using Jenkins, GitHub Actions, and Docker for seamless deployments.",
    ],
    stack: [
      "React (Next.js)",
      "React Native",
      "Node.js",
      "GraphQL",
      "TypeScript",
      "gRPC",
      "Python",
      "AWS",
      "MongoDB",
      "Redis",
      "Jest",
      "Cypress",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    type: "work",
    role: "Software Engineer",
    company: "Mitsogo Inc (Hexnode)",
    duration: "Sep 2020 - May 2021",
    location: "Kochi, India",
    description: [
      "Redesigned Hexnode’s backend architecture using Python and Django, developing RESTful APIs and improving database queries, which resulted in a 40% improvement in performance and response times.",
      "Developed scalable frontend applications using React integrated with Django APIs, improving UI responsiveness by 35%.",
      "Enhanced data retrieval and processing efficiency by leveraging data structures and algorithms, reducing query times by 25%.",
    ],
    stack: ["Python", "Django", "React", "REST APIs", "SQL", "MongoDB"],
  },
  {
    type: "work",
    role: "Software Engineer Intern",
    company: "LTIMindtree",
    duration: "Apr 2019 - May 2019",
    location: "Chennai, India",
    description: [
      "Developed a Logistics Employee Tracking System using Python and Google Maps API, enhancing real-time tracking accuracy by 30% to improve operational efficiency and resource allocation.",
      "Optimized backend data processing pipelines using OOP principles and efficient algorithms, reducing response times by 20%.",
    ],
    stack: ["Python", "Google Maps API", "OOPs"],
  },
  {
    type: "school",
    role: "B.Tech in Electronics and Communication",
    company: "Amrita Vishwa Vidyapeetham",
    duration: "Jul 2016 - Aug 2020",
    location: "Coimbatore, India",
    description: [
      "Developed a strong foundation in core electronics and communication engineering, including embedded systems, VLSI design, and signal processing.",
      "Acquired proficiency in Python programming, applying it to data analysis, automation, and hardware interfacing.",
      "Enhanced problem-solving abilities through Data Structures and Algorithms, implementing optimized solutions for computational problems.",
      "Gained expertise in Object-Oriented Programming (OOPs), focusing on software design principles and modular development.",
      "Worked on hands-on projects integrating IoT, microcontrollers, and AI-driven applications, bridging hardware and software capabilities.",
      "Explored networking concepts, wireless communication, and digital signal processing, applying them in real-world scenarios.",
    ],
    stack: ["Python", "Data Structures and Algorithm", "OOPs"],
  },
];

const skills = {
  "Programming Languages": [
    "Python",
    "JavaScript",
    "TypeScript",
    "Dart",
    "C C++",
    "Java",
    "SQL",
    "JSON",
    "YAML",
  ],
  Frontend: [
    "React.js",
    "Next.js",
    "Redux",
    "JQuery",
    "HTML",
    "CSS",
    "SCSS",
    "Flutter",
  ],
  Backend: [
    "Node.js",
    "NestJS",
    "ExpressJS",
    "RestAPI",
    "GraphQL",
    "gRPC",
    "Redis",
    "Protocol Buffers",
  ],
  Database: [
    "MongoDB",
    "MySQL",
    "Redis",
    "SQLite",
    "NoSQL",
    "GraphQL",
    "Kafka",
  ],
  Cloud: [
    "AWS EC2",
    "S3",
    "RDS",
    "Lambda",
    "API Gateway",
    "Elastic Beanstalk",
    "IAM",
    "CloudWatch",
    "AWS CloudFormation",
    "Google Cloud",
    "Azure",
  ],
  "DevOps and Testing": [
    "Jenkins",
    "Docker",
    "CI CD",
    "Microservice Architecture",
    "Jest",
    "Cypress",
    "GitHub",
    "ELK Stack",
    "Shell scripting",
    "Git",
  ],
};

const contact = {
  email: "athiru0499@gmail.com",
};

export { header, about, experiences, projects, skills, contact };
