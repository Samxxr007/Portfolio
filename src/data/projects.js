export const categories = ["All", "AI & Machine Learning", "Full Stack & Web", "Systems & DevOps"];

export const projects = [
    {
        id: "indiax",
        number: "01",
        title: "IndiaX — Farm Chemical Intelligence",
        subtitle: "Unified Traceability & PHI Compliance Engine",
        category: "AI & Machine Learning",
        status: "SIH 2026 Prototype",
        metric: "7 ML Models • 100% PHI Precision",
        featured: true,
        tagline: "Connecting crop pesticides, livestock antimicrobials, and regulatory compliance through trained ML inference.",
        description: "SIH 2026 unified farm-level chemical intelligence and cross-domain traceability platform connecting crop pesticides, livestock antimicrobials, and regulatory compliance with 7 trained Scikit-Learn/XGBoost models.",
        architecture: "React & TypeScript Frontend → FastAPI Gateway → Scikit-Learn/XGBoost Inference Engine → Prisma ORM & PostgreSQL DB",
        highlights: [
            "7 Trained ML Classification Models for PHI Compliance",
            "Cross-domain chemical traceability (Crops & Livestock)",
            "Automated regulatory threshold violation alerts"
        ],
        tags: ["React", "TypeScript", "FastAPI", "Python ML", "Prisma", "PostgreSQL"],
        github: "https://github.com/Samxxr007/IndiaX-Unified-Farm-Chemical-Intelligence-Traceability-Platform",
        deploy: "https://frontend-ten-mauve-81.vercel.app/"
    },
    {
        id: "roadguard",
        number: "02",
        title: "RoadGuard AI",
        subtitle: "Real-Time Spatial CCTV Road Damage Detection",
        category: "AI & Machine Learning",
        status: "Real-Time AI",
        metric: "YOLOv11 • <45ms CCTV GIS Tracking",
        featured: true,
        tagline: "Sub-45ms computer vision pipeline identifying road surface hazards from municipal video feeds with GIS geotagging.",
        description: "Intelligent Smart City road surface damage detection and predictive maintenance planning system utilizing municipal CCTV video streams, YOLOv11 Computer Vision, and interactive Leaflet GIS mapping.",
        architecture: "Municipal CCTV Feed → OpenCV Frame Extraction → YOLOv11 Damage Detector (<45ms) → FastAPI GIS Spatial Service → Leaflet UI",
        highlights: [
            "Sub-45ms real-time inference on 1080p CCTV feeds",
            "Automatic pothole severity classification & GIS geotagging",
            "Predictive repair route scheduling for municipal squads"
        ],
        tags: ["React 19", "FastAPI", "YOLOv11", "OpenCV", "PostgreSQL", "Leaflet"],
        github: "https://github.com/Samxxr007/RoadGuard-AI"
    },
    {
        id: "fishconnect",
        number: "03",
        title: "FishConnect AI",
        subtitle: "Marine Demand Forecasting & Fair Auction Platform",
        category: "AI & Machine Learning",
        status: "Live Production",
        metric: "AI Demand Forecast • Direct Marketplace",
        featured: true,
        tagline: "Direct B2B auction platform eliminating middlemen for coastal fishing communities with oceanographic demand intelligence.",
        description: "Mobile-first Next.js 14 application for coastal Indian fishermen in Tamil Nadu & Kerala featuring AI-powered marine demand forecasting, real-time ocean data, and direct bulk buyer matchmaking.",
        architecture: "Next.js 14 App Router → AI Time-Series Forecaster → Real-Time Oceanography API → Direct Bulk Buyer Match Engine",
        highlights: [
            "AI Marine catch demand forecasting charts via Recharts",
            "Direct B2B fisherman-to-buyer bulk auction engine",
            "Zero middleman fair-price realization for coastal communities"
        ],
        tags: ["Next.js 14", "AI", "TypeScript", "Recharts", "Tailwind CSS"],
        github: "https://github.com/Samxxr007/Fish-Connect",
        deploy: "https://fish-connect.vercel.app/"
    },
    {
        id: "autoship",
        number: "04",
        title: "AutoShip Pipeline",
        subtitle: "Automated Multi-Stage Container CI/CD Engine",
        category: "Systems & DevOps",
        status: "CI/CD Ecosystem",
        metric: "100% Automated Build & Deploy",
        featured: true,
        tagline: "Automated microservice containerization, testing matrix, and zero-downtime deployment pipeline.",
        description: "Production-grade CI/CD ecosystem designed for automated containerization, unit testing, and continuous deployment of Next.js microservices using Docker and GitHub Actions workflows.",
        architecture: "Git Push → GitHub Actions Matrix Test → Docker Multi-Stage Image Build → Container Registry → Automated Production Deploy",
        highlights: [
            "Multi-stage Docker builds reducing image footprint by 65%",
            "Automated test runner with zero-downtime container rollout",
            "GitHub Actions workflow pipeline with instant rollback triggers"
        ],
        tags: ["DevOps", "Docker", "CI/CD", "Next.js", "GitHub Actions"],
        github: "https://github.com/Samxxr007/Autoship-Pipeline-Automation"
    },
    {
        id: "shopsphere",
        number: "05",
        title: "ShopSphere Forensic Mirror",
        category: "AI & Machine Learning",
        status: "HackHustle AI",
        metric: "Visual DNA • Zero Return Fraud",
        description: "Edge AI and Cloud Forensic DNA verification pipeline engineered to eliminate return fraud through automated image tampering checks and serialized visual authentication.",
        architecture: "Product Packing Camera → Edge Feature Hash Extractor → Cloud Visual DNA Matcher → Serialized Return Verification",
        highlights: [
            "Visual fingerprinting matching items at packing vs. return",
            "Image manipulation & tampering detection at pixel level",
            "Engineered for high-volume retail supply chains"
        ],
        tags: ["Edge AI", "TypeScript", "React", "Python", "Computer Vision"],
        github: "https://github.com/Samxxr007/Fraud-Mirror-App-HackHustle"
    },
    {
        id: "crowdrisk",
        number: "06",
        title: "Smart Crowd Risk Analysis",
        category: "AI & Machine Learning",
        status: "Surveillance AI",
        metric: "OpenCV • Real-Time Stampede Prediction",
        description: "AI surveillance platform for high-density public venues providing real-time crowd density analysis, motion intelligence, and stampede risk prediction using OpenCV and FastAPI.",
        architecture: "RTSP Video Stream → Optical Flow & Density Estimator → Risk Threshold Matrix → FastAPI Alert Dispatcher",
        highlights: [
            "Optical flow tracking identifying sudden panic surges",
            "Real-time density heatmaps of high-risk bottleneck zones",
            "Sub-second alert dispatch to venue operations"
        ],
        tags: ["Computer Vision", "FastAPI", "OpenCV", "Next.js 14", "Python"],
        github: "https://github.com/Samxxr007/Stampede-Alert-System-Using-CV"
    },
    {
        id: "luminary",
        number: "07",
        title: "Luminary Studio",
        category: "Full Stack & Web",
        status: "Luxury Showcase",
        metric: "60 FPS Framer Motion • Editorial UI",
        description: "Premium luxury-minimalist digital agency homepage demonstrating editorial UI design, smooth micro-interactions, responsive ergonomics, and high-performance React features.",
        architecture: "Next.js 14 → Tailwind CSS Layout Engine → Framer Motion Spring Animations → Vercel Edge CDN",
        highlights: [
            "Silky smooth 60 FPS viewport transitions",
            "Editorial typographic hierarchy & dynamic cursors",
            "Full mobile and tablet gesture optimization"
        ],
        tags: ["Next.js 14", "Framer Motion", "UI/UX", "Tailwind CSS"],
        github: "https://github.com/Samxxr007/Design-Agency-Home-Page",
        deploy: "https://design-agency-home-page.vercel.app"
    },
    {
        id: "droneswarm",
        number: "08",
        title: "DroneSwarm Pathfinder",
        category: "Systems & DevOps",
        status: "DAA Capstone",
        metric: "Convex Hull & Closest Pair O(n log n)",
        description: "Algorithmic capstone web application applying Convex Hull and Closest-Pair algorithms for collision-free drone swarm geometric formation and dynamic delivery route planning.",
        architecture: "Geometric Coordinate Plane → Graham Scan Convex Hull Engine → Divide & Conquer Closest Pair → Interactive Canvas UI",
        highlights: [
            "O(n log n) Graham Scan bounding hull computation",
            "Dynamic obstacle evasion with proximity threshold alerts",
            "Real-time interactive canvas vector rendering"
        ],
        tags: ["Algorithms", "TypeScript", "React", "Tailwind CSS", "DAA"],
        github: "https://github.com/Samxxr007/Drone-Swarm-Path-Finder-Project"
    },
    {
        id: "skybrisk",
        number: "09",
        title: "Skybrisk ERP App",
        category: "Full Stack & Web",
        status: "MERN Stack",
        metric: "Multi-Role RBAC • Inventory Workflow",
        description: "Comprehensive enterprise business ERP management system built with role-based access control, secure authentication, and inventory order workflow tracking.",
        architecture: "React Frontend → Express REST API → MongoDB Cluster → JWT Auth & RBAC Middleware",
        highlights: [
            "Granular permission matrix (Admin, Manager, Staff)",
            "Automated stock level calculations and low-inventory alerts",
            "Secure session handling with refresh tokens"
        ],
        tags: ["React", "Node.js", "Express", "MongoDB", "Material-UI"],
        github: "https://github.com/Samxxr007/Skybrisk-ERP-App",
        deploy: "https://skybrisk-erp-app.vercel.app"
    },
    {
        id: "prashikshan",
        number: "10",
        title: "Prashikshan Learning Hub",
        category: "Full Stack & Web",
        status: "LMS Platform",
        metric: "Modular Learning • Real-Time Progress",
        description: "Modern training and learning management platform engineered to streamline course delivery, interactive curriculum paths, and student progress tracking.",
        architecture: "Vite + React UI → Modular Chapter State Machine → Local & Cloud Progress Storage",
        highlights: [
            "Interactive chapter progress persistence",
            "Modular curriculum architecture supporting quizzes and rich media",
            "Fluid lightweight loading built on Vite"
        ],
        tags: ["React", "LMS", "Education", "Vite", "Tailwind CSS"],
        github: "https://github.com/Samxxr007/Prashikshan",
        deploy: "https://prashikshan-ten.vercel.app"
    },
    {
        id: "rmkart",
        number: "11",
        title: "RM-Kart Shopping App",
        category: "Full Stack & Web",
        status: "E-Commerce BFF",
        metric: "BFF Architecture • Custom JWT RBAC",
        description: "Interactive e-commerce marketplace platform built with Backend-for-Frontend (BFF) architecture, custom JWT validation, and multi-tier user authorization.",
        architecture: "React SPA → Dedicated BFF Layer → Product Catalog Microservice → Cart & Checkout Orchestration",
        highlights: [
            "BFF design pattern reducing redundant client API calls by 40%",
            "Stateful shopping cart with local-sync resilience",
            "Secure multi-role buyer/seller dashboards"
        ],
        tags: ["React", "Node.js", "BFF Pattern", "JWT", "E-Commerce"],
        github: "https://github.com/Samxxr007/RM-Kart-Shopping-App",
        deploy: "https://rm-kart-shopping-app.vercel.app"
    },
    {
        id: "cityclean",
        number: "12",
        title: "CityClean360",
        category: "Systems & DevOps",
        status: "IoT Hardware",
        metric: "ESP32 Sensors • Real-Time Dispatch",
        description: "Smart city IoT waste management dashboard integrated with ESP32 microcontrollers for real-time bin level telemetry, fire sensor alerts, and automated truck route dispatch.",
        architecture: "ESP32 Ultrasonic & Gas Sensors → Firebase Realtime DB → React Telemetry Dashboard → Automated Driver Route Trigger",
        highlights: [
            "Live ultrasonic fill-level monitoring with alert thresholds",
            "Integrated flame & smoke sensor triggers for hazard safety",
            "Real-time visual map telemetry for city sanitation fleets"
        ],
        tags: ["React", "IoT", "ESP32", "Firebase", "Dashboard"],
        github: "https://github.com/Samxxr007/Cityclean360"
    }
];
