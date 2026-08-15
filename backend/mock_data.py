from typing import Dict, Any, List

DEMO_CASES: Dict[str, Dict[str, Any]] = {
    "scholarship-misinformation": {
        "id": "analysis_demo_1",
        "title": "Rs 50,000 National Digital Scholarship WhatsApp Claim",
        "content_type": "text",
        "raw_content": "Urgent: Ministry of Education is offering a free scholarship of Rs 50,000 to all students who click this link and share with 10 WhatsApp groups before midnight! Apply now: bit.ly/free-edu-scholarship-2026",
        "verdict": "Likely False",
        "confidence": 0.94,
        "summary": "This claim mimics government welfare schemes to harvest personal data and drive viral link shares via WhatsApp. No official notification exists.",
        "extracted_claims": [
            "Ministry of Education launched a direct Rs 50,000 scholarship for all applicants.",
            "Eligibility requires sharing the link to 10 WhatsApp groups.",
            "The link provided is an official portal with a midnight deadline."
        ],
        "evidence_cards": [
            {
                "title": "Official Portal Verification (National Scholarship Portal)",
                "source_name": "Ministry of Education / NSP",
                "source_type": "Government Repository",
                "published_date": "Updated August 2026",
                "relevance": "Direct Domain Check",
                "summary": "All legitimate central schemes are registered exclusively via scholarships.gov.in. No scheme requires social media forwarding.",
                "url": "https://scholarships.gov.in",
                "is_demo": True
            },
            {
                "title": "Fact Check: Phishing Pattern Analysis",
                "source_name": "PIB Fact Check Archive",
                "source_type": "Fact-Check Bureau",
                "published_date": "March 2026",
                "relevance": "Scam Pattern Match",
                "summary": "Identified recurring chain message scheme designed to deploy adware and harvest mobile numbers.",
                "url": "https://pib.gov.in/factcheck",
                "is_demo": True
            }
        ],
        "missing_context": [
            "Official schemes require verification via Aadhaar/DigiLocker, income certificates, and institutional enrollment.",
            "Government announcements are hosted on .gov.in or .nic.in domains, never URL shorteners like bit.ly."
        ],
        "manipulation_techniques": [
            {
                "technique": "Artificial Urgency ('Midnight Deadline')",
                "description": "Induces panic and swift compliance so the user does not take time to verify.",
                "severity": "High"
            },
            {
                "technique": "Pyramid Forwarding Barrier",
                "description": "Demanding shares to 10 groups turns victims into unwitting distributors of the scam.",
                "severity": "High"
            }
        ],
        "ai_media_forensics": None,
        "uncertainty_notes": "Synthesized against the official scholarship directory. High confidence due to matching verified scam signatures.",
        "media_literacy_concept": "Fabricated Authority & Urgent Phishing",
        "concept_explanation": "Scammers exploit trust in public institutions alongside manufactured urgency to stop your critical filters from kicking in.",
        "verification_questions": [
            "Does the domain end in an official Top-Level Domain (e.g., .gov.in)?",
            "Why would a legitimate institution require forwarding to personal chat groups?",
            "Can this notice be found on the institution's official press feed?"
        ],
        "related_challenge_id": "challenge_phishing_1"
    },
    "old-news-breaking": {
        "id": "analysis_demo_2",
        "title": "Old Cyclonic Storm Footage Shared as 'Live Disaster'",
        "content_type": "url",
        "raw_content": "BREAKING: Severe coastal flooding destroys highway bridges this afternoon. State of emergency declared! https://socialfeed.news/live/coast-alert",
        "verdict": "Misleading",
        "confidence": 0.89,
        "summary": "The footage in question is authentic disaster documentation, but it occurred in October 2020 during Cyclone Amphan, not today.",
        "extracted_claims": [
            "Highway bridges were destroyed this afternoon.",
            "Current coastal emergency in effect based on attached clip."
        ],
        "evidence_cards": [
            {
                "title": "Historical Weather Archive & Reverse Video Index",
                "source_name": "Disaster Response Registry",
                "source_type": "Meteorological Archive",
                "published_date": "October 2020",
                "relevance": "Exact Video Match",
                "summary": "Identical footage recorded during the 2020 cyclone event near coastal highway NH-16.",
                "url": "https://ndma.gov.in/archive",
                "is_demo": True
            }
        ],
        "missing_context": [
            "Current regional weather is clear with no cyclone warning active.",
            "Recycling dramatic disaster imagery during monsoon season is a frequent tactic for engagement bait."
        ],
        "manipulation_techniques": [
            {
                "technique": "Decontextualized Media (Out of Time)",
                "description": "Using real historical events to describe current situations to spark sensational engagement.",
                "severity": "High"
            }
        ],
        "ai_media_forensics": None,
        "uncertainty_notes": "Visual match confirmed via historical video hashes.",
        "media_literacy_concept": "Decontextualization",
        "concept_explanation": "Real footage or authentic photos become misinformation the moment their original time, place, or context is severed.",
        "verification_questions": [
            "Have you performed a reverse image/video search to check the original upload date?",
            "Are official meteorological bureaus reporting a comparable active emergency?"
        ],
        "related_challenge_id": "challenge_context_1"
    },
    "misleading-statistic": {
        "id": "analysis_demo_3",
        "title": "94% Surge in Youth Unemployment in Just 30 Days",
        "content_type": "text",
        "raw_content": "Shocking report shows youth unemployment jumped by a massive 94% this month alone. The economic system is facing total collapse!",
        "verdict": "Misleading",
        "confidence": 0.85,
        "summary": "The statistic relies on a relative percentage increase of a micro-sample rather than an absolute percentage of the workforce.",
        "extracted_claims": [
            "Youth unemployment increased by 94% in a single month.",
            "The overall labor market contracted by nearly double."
        ],
        "evidence_cards": [
            {
                "title": "Monthly Labor Force Survey Data",
                "source_name": "Bureau of Economic Statistics",
                "source_type": "Statistical Bureau",
                "published_date": "July 2026",
                "relevance": "Primary Dataset",
                "summary": "Unemployment in the subgroup shifted from 1.1% to 2.1% in a regional trial of 500 respondents (a relative change of ~90%, but an absolute delta of only 1 percentage point).",
                "url": "https://stats.gov.in/labor",
                "is_demo": True
            }
        ],
        "missing_context": [
            "Relative percentage changes sound twice as dramatic when the baseline figure is minuscule.",
            "Sample size was limited to a single sub-district test cohort, not the national economy."
        ],
        "manipulation_techniques": [
            {
                "technique": "Relative vs Absolute Framing Trick",
                "description": "Highlighting large percentage ratios while concealing small base values to trigger alarm.",
                "severity": "Medium"
            }
        ],
        "ai_media_forensics": None,
        "uncertainty_notes": "Math verified against baseline demographic reports.",
        "media_literacy_concept": "Statistical Framing Bias",
        "concept_explanation": "Numbers do not lie, but how they are framed can create an entirely false narrative without changing a single digit.",
        "verification_questions": [
            "What was the original baseline number before the increase?",
            "What was the sample size and sample demographic?"
        ],
        "related_challenge_id": "challenge_stats_1"
    },
    "ai-generated-image": {
        "id": "analysis_demo_4",
        "title": "Photo of Ancient 400-Year-Old Glass Palace Discovered Underwater",
        "content_type": "image",
        "raw_content": "Uploaded file: sunken_crystal_palace_expedition.png",
        "verdict": "Likely False",
        "confidence": 0.96,
        "summary": "Synthetic image generated with generative diffusion tools. Visual artifacts indicate procedural AI synthesis.",
        "extracted_claims": [
            "An intact 400-year-old ornate glass palace was discovered intact on the Mediterranean seafloor.",
            "Image is documentary photographic evidence from a deep-sea submersible."
        ],
        "evidence_cards": [
            {
                "title": "Underwater Archeology Global Registry",
                "source_name": "Oceanic Heritage Council",
                "source_type": "Academic Foundation",
                "published_date": "2026",
                "relevance": "Expedition Search",
                "summary": "No oceanographic exploration team or marine archeology journal has documented or claimed such a structure.",
                "is_demo": True
            }
        ],
        "missing_context": [
            "Glass and delicate architectural spires cannot withstand 400 years of underwater hydrostatic pressure and coral colonization.",
            "No accredited research team or submarine vehicle is credited."
        ],
        "manipulation_techniques": [
            {
                "technique": "Photorealistic Generative Synthesis",
                "description": "Creating non-existent architectural phenomena to fuel viral curiosity loops.",
                "severity": "High"
            }
        ],
        "ai_media_forensics": "Diffusion artifact analysis indicates inconsistent light refraction index across water-glass boundaries, asymmetric arch geometry, and unnatural depth-of-field bloom typical of generative diffusion models.",
        "uncertainty_notes": "High certainty regarding synthetic origins due to geometrical anomalies and structural physical impossibilities.",
        "media_literacy_concept": "Synthetic & AI-Generated Media",
        "concept_explanation": "Generative models produce imagery that looks aesthetically plausible at a glance, but fails physical logic and anatomical or architectural consistency upon close inspection.",
        "verification_questions": [
            "Are there unnatural symmetry breaks or impossible physical dynamics?",
            "Is the discovery corroborated by reputable science journals (e.g., Nature, National Geographic)?"
        ],
        "related_challenge_id": "challenge_ai_1"
    },
    "sensational-health-claim": {
        "id": "analysis_demo_5",
        "title": "Boiling Papaya Leaf Tea Cures Any Viral Fever in 3 Hours",
        "content_type": "text",
        "raw_content": "Doctors are furious! Drinking one cup of boiled papaya leaves and raw ginger eliminates all viral infections and dengue fever within 3 hours. Big pharma does not want you to know!",
        "verdict": "Likely False",
        "confidence": 0.92,
        "summary": "Dangerous medical misinformation. While some herbal compounds undergo pharmacological study, no beverage instantly eradicates viral pathologies in 3 hours.",
        "extracted_claims": [
            "Boiled papaya leaf and ginger completely cures all viral fever within 3 hours.",
            "Medical institutions are suppressing this secret cure."
        ],
        "evidence_cards": [
            {
                "title": "Clinical Guidance on Viral Illness & Thrombocytopenia",
                "source_name": "World Health Organization Clinical Portal",
                "source_type": "Medical Health Authority",
                "published_date": "2025/2026 Update",
                "relevance": "Direct Health Fact Sheet",
                "summary": "Viral infections require proper medical diagnosis, hydration, and monitoring. Delaying medical care for severe viral infections based on home remedies can be fatal.",
                "url": "https://who.int/emergencies/dengue",
                "is_demo": True
            }
        ],
        "missing_context": [
            "Platelet counts and viral load require clinical monitoring.",
            "Consuming excessive raw herbal extracts can cause gastrointestinal distress and interact negatively with medications."
        ],
        "manipulation_techniques": [
            {
                "technique": "Conspiracy Framing ('Doctors do not want you to know')",
                "description": "Discredits legitimate medical science by fabricating an adversarial conspiracy.",
                "severity": "High"
            },
            {
                "technique": "Miracle Cure Hyperbole",
                "description": "Promises instant, consequence-free outcomes for complex biological ailments.",
                "severity": "High"
            }
        ],
        "ai_media_forensics": None,
        "uncertainty_notes": "Clinical guidance from accredited global health authorities directly refutes instant-cure claims.",
        "media_literacy_concept": "Conspiracy & Miracle Health Framing",
        "concept_explanation": "Health misinformation often pairs an easy home cure with a conspiracy narrative to make the claim feel like an exclusive secret.",
        "verification_questions": [
            "Does the claim propose a universal 'instant cure' for complex medical conditions?",
            "Is it trying to erode your trust in established healthcare professionals?"
        ],
        "related_challenge_id": "challenge_health_1"
    }
}

CHALLENGES: List[Dict[str, Any]] = [
    {
        "id": "challenge_phishing_1",
        "title": "The Suspicious Admission Scheme",
        "category": "Source & URL Verification",
        "scenario": "You receive a forwarded WhatsApp message from a family group regarding an urgent exam waiver.",
        "suspicious_message": "URGENT: Government announces 100% tuition refund for college students affected by recent rain delays. Enter your Aadhaar number, phone number, and bank details at http://gov-refund-schemes.xyz/claim immediately. Only 400 slots left!",
        "question": "What is the most effective and safe first step to verify this message?",
        "options": [
            {
                "id": "opt_1",
                "text": "Immediately fill out the form so you do not miss out on one of the 400 available slots.",
                "is_correct": False,
                "explanation": "Acting under urgency is exactly what scammers count on to extract sensitive data."
            },
            {
                "id": "opt_2",
                "text": "Check the domain extension: government portals in India operate on official '.gov.in' domains, and verify directly on the official Ministry of Education portal without clicking the link.",
                "is_correct": True,
                "explanation": "Spotting unauthorized top-level domains (.xyz vs .gov.in) and searching the official agency homepage independently is the golden rule of source verification."
            },
            {
                "id": "opt_3",
                "text": "Forward it to 5 other friends to see if any of them have received the money yet.",
                "is_correct": False,
                "explanation": "Forwarding unverified links amplifies potential malware and scam distribution."
            },
            {
                "id": "opt_4",
                "text": "Reply to the link creator asking for their government employee identity card.",
                "is_correct": False,
                "explanation": "Scammers easily forge fake ID cards or badges to keep the illusion alive."
            }
        ],
        "xp_reward": 50,
        "concept_tag": "Source Verification"
    },
    {
        "id": "challenge_context_1",
        "title": "The Out-of-Context Video Clip",
        "category": "Context & Provenance",
        "scenario": "A 10-second video clip goes viral on social media showing crowds running in panic, captioned 'Riot in Central Station right now!'",
        "suspicious_message": "BREAKING: Chaos erupts at Central Station today! Everyone evacuate the area immediately!",
        "question": "What is your best immediate action before reposting or alerting others?",
        "options": [
            {
                "id": "opt_a",
                "text": "Take a keyframe screenshot and run a Reverse Image Search to check if the video is from an older incident or movie set.",
                "is_correct": True,
                "explanation": "A reverse image search on video keyframes quickly reveals the original publication date and source context."
            },
            {
                "id": "opt_b",
                "text": "Retweet with the caption 'Is this real?' to crowdsource answers.",
                "is_correct": False,
                "explanation": "Retweeting without verification spreads fear and fuels the algorithmic amplification of false claims."
            },
            {
                "id": "opt_c",
                "text": "Assume it must be real because video footage cannot be faked or repurposed.",
                "is_correct": False,
                "explanation": "Authentic video clips are frequently reposted with false timestamps and locations."
            }
        ],
        "xp_reward": 50,
        "concept_tag": "Decontextualization"
    },
    {
        "id": "challenge_stats_1",
        "title": "The Sensational Growth Graph",
        "category": "Statistical Literacy",
        "scenario": "A news card claims a new beverage causes an '800% increase in productivity' based on a company-sponsored chart.",
        "suspicious_message": "Graph showing a bar jumping from 1 task to 9 tasks completed in 1 hour among 4 paid student interns.",
        "question": "What critical statistical flaw is present in this claim?",
        "options": [
            {
                "id": "opt_stat_1",
                "text": "Small sample size with high bias and lack of a randomized control group.",
                "is_correct": True,
                "explanation": "A tiny sample (4 people) funded by the product vendor without a placebo control cannot support generalized claims."
            },
            {
                "id": "opt_stat_2",
                "text": "The graph uses the color red instead of standard neutral blue.",
                "is_correct": False,
                "explanation": "Color choice might be provocative, but the fundamental flaw is methodological and mathematical."
            },
            {
                "id": "opt_stat_3",
                "text": "Productivity cannot be measured using tasks per hour.",
                "is_correct": False,
                "explanation": "While metric choice matters, the lack of sample rigor and baseline comparison is the core misleading factor."
            }
        ],
        "xp_reward": 50,
        "concept_tag": "Statistical Literacy"
    },
    {
        "id": "challenge_ai_1",
        "title": "Spotting Generative Visuals",
        "category": "AI Media Literacy",
        "scenario": "A viral photo depicts an astonishing discovery of a perfectly preserved crystal chariot found in a newly uncovered cave.",
        "suspicious_message": "Archaeologists are stunned! Look at the crystal chariot uncovered yesterday in deep mountain caves!",
        "question": "Which visual clue strongly suggests synthetic (AI) generation?",
        "options": [
            {
                "id": "opt_ai_1",
                "text": "Inconsistent lighting reflections, warped spokes on the wheels, and nonsensical background textures without archeological gear.",
                "is_correct": True,
                "explanation": "AI models often struggle with complex geometric symmetry, physically accurate refraction, and plausible tool marks in realistic contexts."
            },
            {
                "id": "opt_ai_2",
                "text": "The photograph is high resolution.",
                "is_correct": False,
                "explanation": "High resolution does not signify AI origin; modern cameras produce crisp photos every day."
            },
            {
                "id": "opt_ai_3",
                "text": "The photo was taken inside a cave.",
                "is_correct": False,
                "explanation": "Legitimate spelunking and archaeology photography is common; examine structural and physical details instead."
            }
        ],
        "xp_reward": 50,
        "concept_tag": "AI Content Awareness"
    },
    {
        "id": "challenge_health_1",
        "title": "The Instant Health Remedy",
        "category": "Emotional Manipulation",
        "scenario": "An audio recording on social media claims drinking hot salt water with lemon every 30 minutes prevents viral infections completely.",
        "suspicious_message": "Audio clip: 'A top anonymous military doctor reveals the single cure they are keeping from public hospitals...'",
        "question": "What is the primary red flag in this message?",
        "options": [
            {
                "id": "opt_h_1",
                "text": "Anonymous authority figure + universal cure-all claim + conspiracy angle against standard healthcare.",
                "is_correct": True,
                "explanation": "Citing anonymous experts and claiming simple kitchen items replace evidence-based medical diagnostics are classic signatures of health misinformation."
            },
            {
                "id": "opt_h_2",
                "text": "The clip is shared as an audio file instead of a PDF.",
                "is_correct": False,
                "explanation": "The format is irrelevant; the logical fallacy and medical unreliability of the claim are the core concerns."
            },
            {
                "id": "opt_h_3",
                "text": "Lemons contain vitamin C.",
                "is_correct": False,
                "explanation": "While lemon has nutrients, claiming it reliably cures serious infections is false."
            }
        ],
        "xp_reward": 50,
        "concept_tag": "Health Literacy"
    }
]

LESSONS: List[Dict[str, Any]] = [
    {
        "id": "lesson_1",
        "title": "Source Evaluation & Domain Sleuthing",
        "category": "Source Evaluation",
        "read_time": "3 min",
        "overview": "Learn how to inspect URLs, verify author credentials, and spot spoofed websites posing as legitimate news or government agencies.",
        "key_takeaways": [
            "Check domain extensions carefully (.gov.in vs .xyz / .top).",
            "Look for an 'About Us' section, verified contact details, and editorial disclosures.",
            "Use the SIFT method: Stop, Investigate the source, Find better coverage, Trace claims to original context."
        ],
        "pro_tips": [
            "Never click a shortened link (e.g., bit.ly, tinyurl) in unverified messages without expanding it first via a link checker.",
            "Search the exact headline in quotes on reputable news aggregators."
        ]
    },
    {
        "id": "lesson_2",
        "title": "The Power of Missing Context",
        "category": "Context Awareness",
        "read_time": "4 min",
        "overview": "Discover how entirely true photographs, videos, and quotes are twisted into misinformation simply by removing when, where, and why they occurred.",
        "key_takeaways": [
            "Authentic media + wrong date/location = potent misinformation.",
            "Quotes taken out of a broader sentence can invert the speaker's true meaning.",
            "Always ask: 'What happened five minutes before and after this clip?'"
        ],
        "pro_tips": [
            "Perform keyframe reverse image searches using Google Images, Yandex, or TinEye.",
            "Check the weather/historical records of the claimed location on that date."
        ]
    },
    {
        "id": "lesson_3",
        "title": "Statistical Deception & Chart Tricks",
        "category": "Statistical Literacy",
        "read_time": "3 min",
        "overview": "Understand how graphs with truncated Y-axes, cherry-picked baselines, and relative percentage exaggerations mislead readers.",
        "key_takeaways": [
            "Watch out for Y-axes that do not start at zero to exaggerate tiny differences.",
            "Differentiate between relative percentage changes and absolute percentage point changes.",
            "Check sample size (N=10 vs N=10,000) and who funded the study."
        ],
        "pro_tips": [
            "A headline that says 'Doubles your risk!' might just mean moving from a 0.01% chance to 0.02%.",
            "Always inspect the baseline dataset and margins of error."
        ]
    },
    {
        "id": "lesson_4",
        "title": "Detecting AI-Generated Media & Deepfakes",
        "category": "AI Content Awareness",
        "read_time": "4 min",
        "overview": "Master visual and auditory forensic basics to spot generative diffusion images, AI voice clones, and synthetic video artifacts.",
        "key_takeaways": [
            "Look for anatomical anomalies: fingers, earlobes, teeth alignment, eye reflections.",
            "Observe background physics: warped straight lines, text that looks like alien glyphs, weird light angles.",
            "Audio deepfakes often lack natural breathing pauses, room reverberation, and pitch variation."
        ],
        "pro_tips": [
            "Zoom in on fine textures like jewelry, eyeglasses frames, and hair strand boundaries.",
            "If an image depicts an extraordinary historic or celebrity event, look for multi-angle press coverage."
        ]
    },
    {
        "id": "lesson_5",
        "title": "Emotional Manipulation & Viral Triggers",
        "category": "Manipulation Detection",
        "read_time": "3 min",
        "overview": "Why high-arousal emotions like outrage, fear, and urgent hope cause humans to share content before critical thinking engages.",
        "key_takeaways": [
            "Misinformation is engineered to bypass intellect by triggering urgent emotional responses.",
            "Headlines with ALL CAPS, excessive exclamation marks, and 'SHARE BEFORE DELETED' are warning signs.",
            "The urge to share immediately is your brain's cue to pause and verify."
        ],
        "pro_tips": [
            "Notice your physical reaction: if a post makes your heart rate jump or blood boil, wait 60 seconds before interacting.",
            "Ask yourself: 'Who benefits if I react emotionally to this?'"
        ]
    },
    {
        "id": "lesson_6",
        "title": "Algorithms & Filter Bubbles",
        "category": "Media Literacy",
        "read_time": "3 min",
        "overview": "How recommendation algorithms reward controversial engagement and trap users in self-reinforcing information bubbles.",
        "key_takeaways": [
            "Social platforms optimize for screen time and engagement, not objective truth.",
            "Seeing the same claim five times on your feed does not mean it is confirmed - it means your algorithm identified an interest.",
            "Actively seek contrary, credible viewpoints to challenge your confirmation bias."
        ],
        "pro_tips": [
            "Regularly clear your search history and browse complex news topics in private/incognito windows.",
            "Follow reputable fact-checking organizations from multiple regions."
        ]
    }
]
