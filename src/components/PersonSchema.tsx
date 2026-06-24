import React, { useEffect } from 'react';
import { personalInfo } from '../data';

export default function PersonSchema() {
  useEffect(() => {
    // Generate structured data
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": personalInfo.name,
      "jobTitle": "AWS Certified Solutions Architect & DevOps Professional",
      "url": "https://harshupadhayay.neovara.uk",
      "email": personalInfo.contact.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tokyo",
        "addressCountry": "Japan"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Indian Institute of Information Technology (IIIT), Nagpur"
      },
      "sameAs": [
        personalInfo.social.linkedin.url,
        personalInfo.social.github.url,
        personalInfo.social.leetcode.url
      ],
      "knowsAbout": [
        "Cloud Architecture",
        "Amazon Web Services (AWS)",
        "DevOps",
        "Site Reliability Engineering (SRE)",
        "Distributed Systems",
        "System Design",
        "High-throughput Data Extraction",
        "Serverless Computing",
        "Go (Golang)",
        "Python",
        "Redis",
        "Infrastructure as Code (IaC)",
        "AWS CDK",
        "Docker",
        "Kubernetes"
      ]
    };

    // Create script element
    const scriptId = 'jsonld-person-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.text = JSON.stringify(schema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
