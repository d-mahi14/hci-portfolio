/**
 * PROFILE DATA STORE
 * Sourced strictly from /contents/profile.json and /contents/MahiResume (13).pdf
 * No invented facts, metrics, or credentials.
 * 
 * [HCI - Nielsen #2: Match between system and the real world]
 * Information architecture reflects real-world engineering concepts and actual project milestones.
 */

const PROFILE_DATA = {
  personal: {
    name: "Mahi Desai",
    role: "Computer Engineering Student",
    institution: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    tagline: "Building intelligent systems, from DNA embeddings to job-matching platforms.",
    subtitle: "Computer Engineering student | Deep Learning, Generative AI & Full-Stack Development",
    bio: "I'm Mahi Desai, a third-year Computer Engineering student at VJTI, Mumbai, focused on Artificial Intelligence, Machine Learning, and Full-Stack Development. I like turning messy, real-world problems into working systems, whether that's clustering 20,000+ DNA sequences to discover new species, matching candidates to jobs with LLMs, or generating handwriting with GANs. I'm an active member of ProjectX and a Hacktoberfest SuperContributor, where I've learned the value of collaboration and open source. I'm currently looking for internships and research opportunities where I can build AI-powered products and keep growing as an engineer.",
    email: "desaihmahi@gmail.com",
    location: "Mumbai, India",
    avatar: "contents/photo.jpg",
    resumeUrl: "Mahi_Desai_Resume.pdf",
    resumeFileSize: "154 KB",
    social: {
      github: "https://github.com/d-mahi14",
      linkedin: "https://www.linkedin.com/in/mahi-desai-0aa456380/",
      email: "mailto:desaihmahi@gmail.com"
    }
  },

  skills: {
    languages: ["C++", "Python", "JavaScript", "SQL", "HTML/CSS"],
    frameworks: ["React.js", "Node.js", "PyTorch", "TensorFlow"],
    developerTools: ["Git", "GitHub", "VS Code", "Google Colab", "Kaggle", "Jupyter Notebook", "Postman"],
    coreFocus: ["Deep Learning", "Generative AI", "Representation Learning", "Full-Stack Web APIs"]
  },

  education: [
    {
      institution: "Veermata Jijabai Technological Institute (VJTI), Matunga",
      degree: "Third Year B.Tech in Computer Engineering",
      score: "CGPA: 8.49",
      period: "Aug. 2024 - Present",
      status: "In Progress",
      highlights: [
        "Specialization in Artificial Intelligence, Deep Learning, and Systems Engineering",
        "Active member of campus technical and leadership initiatives"
      ]
    },
    {
      institution: "Prakash College of Commerce and Science",
      degree: "Higher Secondary Certificate (HSC) & Competitive Entrance Exams",
      score: "HSC: 88.83% | MHT-CET: 99.95 %ile | JEE Main: 98.84 %ile",
      period: "Aug. 2022 - May. 2024",
      status: "Completed",
      highlights: [
        "MHT-CET Top 0.05% Percentile rank in state-wide engineering entrance",
        "JEE Main Top 1.16% Percentile rank nationwide"
      ]
    }
  ],

  coursework: [
    "Data Structures and Algorithms",
    "Linear Algebra",
    "Discrete Mathematics",
    "Artificial Intelligence",
    "Software Engineering",
    "Operating Systems",
    "Object Oriented Programming",
    "Database Management System",
    "Machine Learning"
  ],

    certifications: [
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "AWS Training & Certification",
      date: "Sep. 2026",
      topics: "Core AWS services, cloud security, architecture, pricing, and cloud concepts",
      certificateUrl: "https://drive.google.com/file/d/1q45Fu52F-SsG8PN8n-scOBRR_DdpBPPi/view"
    },
    {
      title: "Generative and Agentic AI",
      issuer: "Specialized Coursework",
      date: "Apr. 2026",
      topics: "LLMs, RAG, AI agents, multimodal AI, and responsible AI",
      certificateUrl: "https://www.coursera.org/account/accomplishments/verify/87BG52WF37FA"
    },
    {
      title: "Neural Networks and Deep Learning",
      issuer: "DeepLearning.AI / Coursera",
      date: "Nov. 2025",
      topics: "Architectures, forward/backward propagation, and gradient optimization",
      certificateUrl: "https://www.coursera.org/account/accomplishments/verify/TMGWV8XV2G40"
    },
    {
      title: "Improving Deep Neural Networks",
      issuer: "DeepLearning.AI / Coursera",
      date: "Nov. 2025",
      topics: "Hyperparameter tuning, regularization, dropout, optimization, and batch normalization",
      certificateUrl: "https://www.coursera.org/account/accomplishments/verify/3ZC5KN01B2ND"
    }
  ],

  experience: [
    {
      role: "Core Member",
      organization: "Project X, VJTI",
      type: "Technical Club & Open Source",
      period: "Jul. 2025 - Present",
      description: "Student-led technical club at VJTI focused on peer learning, engineering mentorship, and systems development.",
      achievements: [
        "Earned Hacktoberfest SuperContributor badge for impactful open-source contributions",
        "Contributed actively to open-source software and peer code reviews"
      ]
    },
    {
      role: "Department Coordinator",
      organization: "E-Cell, VJTI",
      type: "Leadership & Creative Strategy",
      period: "Sep. 2024 - Sep. 2025",
      description: "Supported the entrepreneurship cell design team in conceptualizing high-impact visual content and brand communication.",
      achievements: [
        "Supported the design team in creating impactful visual content and event materials",
        "Fostered problem-solving, innovation, and collaboration within the cross-functional team"
      ]
    }
  ],

    projects: [
    {
      id: "joblink",
      highlightMetric: "85–99% Match Confidence Score • 14+ REST Endpoints with Supabase RLS",
      title: "JobLink: AI-Powered Job Matching Platform",
      category: "Full-Stack",
      period: "Dec. 2025 - Feb. 2026",
      technologies: ["React.js", "Node.js", "Groq LLM", "Supabase", "PostgreSQL", "JWT", "REST API"],
      image: "contents/projects/joblink/job.jpg",
      screenshotFolder: "contents/projects/joblink/",
      github: "https://github.com/d-mahi14/JobLink-Inheritance", // <-- [REPLACE HERE] e.g. https://github.com/d-mahi14/joblink-ai
      live: null,
      summary: "Full-stack job matching platform with AI-driven resume analysis using Groq LLM, sorting candidates by skill embeddings with 85–99% confidence scores.",
      description: "Built a full-stack job matching platform with AI-driven resume analysis using Groq LLM, extracting 5+ contact fields and 6 skill categories, storing structured data across 4 Supabase PostgreSQL tables with RLS policies. Implemented a RESTful API with 14+ endpoints across 4 route modules (auth, resumes, jobs, applications) featuring JWT-based authentication and role-based access control for 2 user types (candidate/company). Engineered an AI match scoring pipeline cross-referencing parsed resume embeddings against job requirements, surfacing matched/missing skills with 85–99% confidence scores, sorting N applicants by match score to reduce manual screening effort.",
      architecture: "React.js client communicates with a modular Node.js REST API across 4 route modules (auth, resumes, jobs, applications). JWT-based stateless authentication pairs with PostgreSQL Row Level Security (RLS) in Supabase. AI match-scoring utilizes Groq LLM for real-time inference.",
      metrics: [
        { label: "Confidence Score", value: "85–99%" },
        { label: "REST API Endpoints", value: "14+ Endpoints" },
        { label: "Database Tables", value: "4 Supabase (RLS)" },
        { label: "Inference Engine", value: "Groq LLM" }
      ],
      deliverables: [
        "AI-driven resume parsing with Groq LLM extracting 5+ contact fields and 6 skill categories.",
        "RESTful API with 14+ endpoints and RBAC for candidate and company user roles.",
        "AI match scoring pipeline sorting N applicants by match confidence (85–99%)."
      ]
    },
    {
      id: "edna",
      highlightMetric: "87.5% Dimensionality Reduction (256-dim to 32-dim Latent Space)",
      title: "Assessing Biodiversity from eDNA Datasets",
      category: "AI/ML",
      period: "Aug. 2025 - Nov. 2025",
      technologies: ["Python", "TensorFlow", "HDBSCAN", "NumPy", "UMAP", "Flask", "VAE"],
      image: "contents/projects/edna/eDNA.jpg",
      screenshotFolder: "contents/projects/edna/",
      github: "https://github.com/d-mahi14/eDNA-project", // <-- [REPLACE HERE] e.g. https://github.com/d-mahi14/eDNA-biodiversity
      live: null,
      summary: "De novo taxonomic identification pipeline analyzing 20,000+ eDNA sequences using Variational Autoencoders and HDBSCAN clustering.",
      description: "Engineered an AI-driven eDNA analysis pipeline processing 20,000+ DNA sequences, compressing 256-dim k-mer vectors into 32-dim VAE embeddings — an 87.5% dimensionality reduction — eliminating dependence on reference databases. Applied HDBSCAN clustering on VAE embeddings for de novo taxonomic identification, delineating 8+ known species clusters and flagging ~20% of clusters as novel OTUs, with confidence scores of 85–99%. Deployed a Flask REST API with end-to-end pipeline integration, serving UMAP 2D visualizations and 4 biodiversity indices (Shannon, Simpson, Pielou, Richness) across 2 endpoints.",
      architecture: "Raw eDNA -> 256-dim k-mer frequency vectorization -> Symmetrical VAE Encoder (compressed to 32-dim latent space) -> HDBSCAN clustering -> Flask REST API delivering UMAP 2D projections and 4 biodiversity indices.",
      metrics: [
        { label: "Sequences Processed", value: "20,000+ DNA" },
        { label: "Dimensionality Reduction", value: "87.5% (256-dim to 32-dim)" },
        { label: "Species Clusters", value: "8+ Known Species" },
        { label: "Novel OTUs Identified", value: "~20% (85-99% Conf.)" }
      ],
      deliverables: [
        "Compressed 256-dim k-mer vectors to 32-dim VAE embeddings (87.5% reduction).",
        "De novo clustering delineating 8+ known species and ~20% novel OTUs via HDBSCAN.",
        "Flask API serving UMAP projections and 4 ecological indices across 2 endpoints."
      ]
    },
    {
      id: "text-to-handwriting",
      highlightMetric: "1,539 Pages / 657 Writers Synthesized • 0.0132 Word Recogniser Loss",
      title: "Text-to-Handwriting via Conditional GANs",
      category: "Deep Learning",
      period: "Jul. 2025 - Oct. 2025",
      technologies: ["Python", "PyTorch", "cGAN", "IAM Dataset", "Computer Vision"],
      image: "contents/projects/text-to-handwriting/tth.jpg",
      screenshotFolder: "contents/projects/text-to-handwriting/",
      github: "https://github.com/hredayshah2507/Text-To-Handwriting", // <-- [REPLACE HERE] e.g. https://github.com/d-mahi14/text-to-handwriting-cGAN
      live: null,
      summary: "Modular Conditional GAN with decoupled Content and Style Encoders for personalized handwriting synthesis on the IAM benchmark.",
      description: "Designed and engineered a modular Conditional GAN (cGAN) architecture with distinct Content Encoder and Style Encoder to achieve decoupled, fine-grained control over generated handwriting style and textual content. Trained a PyTorch model using adversarial, reconstruction and auxiliary objectives; final losses were: Discriminator ≈ 0.2328; Generator ≈ 12.3285; Writer Classifier (style) ≈ 0.0159; Word Recogniser ≈ 0.0132. Utilized the IAM Word Dataset derived from (1,539 pages across 657 writers) to synthesize open-vocabulary handwritten images, producing high-fidelity, user-specified handwriting styles across diverse writers.",
      architecture: "Modular cGAN comprising a lexical Content Encoder and an idiosyncratic Style Encoder, feeding a Generator trained against a Discriminator, Writer Classifier (style), and Word Recogniser (content CTC loss).",
      metrics: [
        { label: "Dataset Scope", value: "1,539 Pages / 657 Writers" },
        { label: "Discriminator Loss", value: "≈ 0.2328" },
        { label: "Generator Loss", value: "≈ 12.3285" },
        { label: "Writer Classifier Loss", value: "≈ 0.0159" },
        { label: "Word Recogniser Loss", value: "≈ 0.0132" }
      ],
      deliverables: [
        "Decoupled Content and Style Encoders for fine-grained style manipulation.",
        "PyTorch training pipeline balancing adversarial, L1 reconstruction, and dual auxiliary objectives.",
        "Open-vocabulary handwriting synthesis trained on the IAM Word Dataset."
      ]
    }
  ],

  blogPosts: [
    {
      id: "edna-vae-clustering",
      title: "De Novo Species Clustering with VAE & HDBSCAN on eDNA Datasets",
      date: "Nov 2025",
      tags: ["AI/ML", "Bioinformatics", "TensorFlow", "Dimensionality Reduction"],
      readTime: "5 min read",
      excerpt: "How unsupervised Variational Autoencoders achieved an 87.5% dimensionality reduction on 20,000+ eDNA sequences, uncovering novel taxonomic clusters without reference genomes.",
      content: `
        <p>Environmental DNA (eDNA) monitoring enables researchers to detect biodiversity from genetic fragments shed into air, soil, or water. However, traditional taxonomic classification relies heavily on curated reference libraries like NCBI GenBank. When analyzing poorly characterized microbial or marine samples, reference-based methods fail.</p>
        
        <h4>1. K-mer Frequency Vectorization</h4>
        <p>To eliminate reference database dependence, 20,000+ raw eDNA sequences were converted into 256-dimensional k-mer frequency vectors. This captures intrinsic oligonucleotide composition regardless of sequence origin.</p>
        
        <h4>2. 87.5% Dimensionality Reduction via VAE</h4>
        <p>We trained an unsupervised Variational Autoencoder (VAE) in TensorFlow to compress the high-dimensional 256-dim k-mer vectors down into a smooth, continuous 32-dimensional latent bottleneck representation—an <strong>87.5% reduction in dimensionality</strong>.</p>
        
        <h4>3. De Novo Taxonomic Identification with HDBSCAN</h4>
        <p>Applying HDBSCAN on the 32-dimensional latent embeddings isolated dense clusters corresponding to natural species boundaries without requiring pre-labeled training data:</p>
        <ul>
          <li>Delineated <strong>8+ known species clusters</strong> matching physical benchmark samples.</li>
          <li>Flagged approximately <strong>20% of clusters as novel Operational Taxonomic Units (OTUs)</strong>, with confidence scores between <strong>85% and 99%</strong>.</li>
        </ul>
        
        <h4>4. Flask API & Biodiversity Metrics</h4>
        <p>The pipeline was integrated into a Flask REST API serving 2 endpoints: one calculating 4 standard biodiversity indices (Shannon diversity, Simpson diversity, Pielou evenness, and Species Richness) and another delivering 2D UMAP projections for real-time visualization.</p>
      `
    },
    {
      id: "cgan-handwriting-synthesis",
      title: "Decoupling Style and Content in Conditional GANs for Handwriting Synthesis",
      date: "Oct 2025",
      tags: ["Deep Learning", "Generative AI", "PyTorch", "Computer Vision"],
      readTime: "6 min read",
      excerpt: "Architecting a modular cGAN with dual encoders to independently control textual content and writer calligraphic styles on the IAM benchmark.",
      content: `
        <p>Synthesizing personalized handwriting requires disentangling what is written (typographic content) from how it is written (author style: stroke slant, pen pressure, curvature, and spacing).</p>
        
        <h4>1. Dual-Encoder Architecture</h4>
        <p>Rather than entangling style and text in a monolithic generator, we engineered a modular cGAN with distinct representations:</p>
        <ul>
          <li><strong>Content Encoder:</strong> Transforms text strings into normalized glyph feature maps.</li>
          <li><strong>Style Encoder:</strong> Extracts idiosyncratic writer dynamics from sample image patches.</li>
        </ul>
        
        <h4>2. Balanced Multi-Objective Training</h4>
        <p>Trained in PyTorch across 1,539 pages from 657 human writers in the IAM Word Dataset, the model balanced adversarial objectives with domain-specific auxiliary penalties. Final converged losses recorded:</p>
        <ul>
          <li><strong>Discriminator Loss:</strong> ≈ 0.2328</li>
          <li><strong>Generator Loss:</strong> ≈ 12.3285</li>
          <li><strong>Writer Classifier Loss (Style):</strong> ≈ 0.0159</li>
          <li><strong>Word Recogniser Loss (Content):</strong> ≈ 0.0132</li>
        </ul>
        
        <h4>3. Synthesis Capability</h4>
        <p>The decoupled latent space enables open-vocabulary synthesis: arbitrary new words can be rendered in the authentic handwriting signature of any enrolled author.</p>
      `
    },
    {
      id: "joblink-llm-parsing",
      title: "Architecting an AI-Driven Job Matching Platform with Groq LLM & Supabase RLS",
      date: "Feb 2026",
      tags: ["Full-Stack", "Groq LLM", "Node.js", "PostgreSQL", "Supabase"],
      readTime: "5 min read",
      excerpt: "Designing a high-throughput resume parsing and vector candidate matching backend with 14+ REST endpoints, JWT authentication, and enterprise-grade Row-Level Security.",
      content: `
        <p>Modern applicant tracking systems (ATS) often suffer from rigid keyword matching that penalizes qualified applicants. JobLink pairs ultra-low-latency Groq LLM inference with relational PostgreSQL security to match candidates based on true semantic capability.</p>
        
        <h4>1. High-Precision Resume Extraction</h4>
        <p>Using Groq LLM, candidate resumes are parsed into structured schemas in real time, accurately extracting <strong>5+ contact fields</strong> and categorizing skills into <strong>6 distinct technical categories</strong>.</p>
        
        <h4>2. Secure Multi-Tenant Architecture</h4>
        <p>The backend is structured into a RESTful API with <strong>14+ endpoints</strong> spanning 4 route modules (auth, resumes, jobs, applications). Candidate and company data is partitioned across 4 Supabase PostgreSQL tables fortified with PostgreSQL Row Level Security (RLS) policies and JWT authentication.</p>
        
        <h4>3. Embedding-Based Match Scoring</h4>
        <p>Parsed candidate profiles are evaluated against job requirements, computing skill overlap and semantic compatibility. The system surfaces matched and missing skills with calibrated <strong>85–99% confidence scores</strong>, ordering candidate lists to drastically reduce manual screening effort.</p>
      `
    }
  ]
};

Object.freeze(PROFILE_DATA);
