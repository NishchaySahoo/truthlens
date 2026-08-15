import uuid
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (
    AnalysisRequest, AnalysisResponse, Challenge, 
    ChallengeSubmission, ChallengeResult, Lesson, UserProgress
)
from mock_data import DEMO_CASES, CHALLENGES, LESSONS
from database import (
    init_db, save_analysis, get_all_analyses, 
    get_analysis_by_id, get_progress_data, add_xp_and_complete_challenge
)

app = FastAPI(
    title="TruthLens API",
    description="Media & Information Literacy Verification Platform Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()
    if not get_analysis_by_id("analysis_demo_1"):
        demo1 = dict(DEMO_CASES["scholarship-misinformation"])
        demo1["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M")
        save_analysis(demo1)

@app.get("/")
def root():
    return {
        "product": "TruthLens",
        "tagline": "Don't Just Know. Learn to Verify.",
        "status": "operational",
        "version": "1.0.0"
    }

@app.post("/api/analyze", response_model=AnalysisResponse)
def analyze_content(req: AnalysisRequest):
    timestamp_str = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    if req.demo_id and req.demo_id in DEMO_CASES:
        demo_payload = dict(DEMO_CASES[req.demo_id])
        demo_payload["id"] = "ana_" + str(uuid.uuid4().hex[:8])
        demo_payload["timestamp"] = timestamp_str
        save_analysis(demo_payload)
        return demo_payload

    content_text = req.raw_content or "Unspecified content snippet"
    analysis_id = "ana_" + str(uuid.uuid4().hex[:8])
    
    lower_c = content_text.lower()
    if any(w in lower_c for w in ["scholarship", "money", "free", "rupees", "apply now", "urgent"]):
        matched = dict(DEMO_CASES["scholarship-misinformation"])
    elif any(w in lower_c for w in ["cure", "doctor", "fever", "remedy", "tea", "virus"]):
        matched = dict(DEMO_CASES["sensational-health-claim"])
    elif any(w in lower_c for w in ["percent", "%", "unemployment", "rate", "statistics"]):
        matched = dict(DEMO_CASES["misleading-statistic"])
    elif any(w in lower_c for w in ["breaking", "live", "disaster", "flood", "cyclone"]):
        matched = dict(DEMO_CASES["old-news-breaking"])
    elif req.content_type == "image":
        matched = dict(DEMO_CASES["ai-generated-image"])
    else:
        matched = {
            "id": analysis_id,
            "title": "Analysis of Custom Query: '" + content_text[:40] + "...'",
            "content_type": req.content_type,
            "raw_content": content_text,
            "verdict": "Unverified",
            "confidence": 0.65,
            "summary": "This claim contains specific factual assertions that lack immediate corroboration from recognized primary sources or press releases.",
            "extracted_claims": [
                "Primary assertion: " + content_text[:120],
                "Implicit claim of broad public impact or urgency."
            ],
            "evidence_cards": [
                {
                    "title": "Cross-Reference Against Credible Media Archives",
                    "source_name": "Public News & Journal Index",
                    "source_type": "Fact Registry",
                    "published_date": "Current Period",
                    "relevance": "Index Search",
                    "summary": "No verified press release or institutional bulletin corroborates this statement in its exact formulation.",
                    "url": None,
                    "is_demo": True
                }
            ],
            "missing_context": [
                "Primary source documentation, author credential disclosure, and publication timeline are absent."
            ],
            "manipulation_techniques": [
                {
                    "technique": "Unsubstantiated Generalization",
                    "description": "Presenting assertions without verifiable citations or institutional attribution.",
                    "severity": "Medium"
                }
            ],
            "ai_media_forensics": None,
            "uncertainty_notes": "Analyzed through automated heuristics. Additional investigative steps recommended before drawing definitive conclusions.",
            "media_literacy_concept": "Independent Source Corroboration",
            "concept_explanation": "When an assertion cannot be found on multiple trusted and independent platforms, treat it as unverified hearsay until primary evidence surfaces.",
            "verification_questions": [
                "Who was the original publisher of this assertion?",
                "Can this statement be confirmed by at least two independent credible outlets?"
            ],
            "related_challenge_id": "challenge_phishing_1"
        }
    
    matched["id"] = analysis_id
    matched["raw_content"] = content_text
    matched["timestamp"] = timestamp_str
    save_analysis(matched)
    return matched

@app.get("/api/analyses", response_model=list[AnalysisResponse])
def list_analyses():
    return get_all_analyses()

@app.get("/api/analyses/{analysis_id}", response_model=AnalysisResponse)
def retrieve_analysis(analysis_id: str):
    res = get_analysis_by_id(analysis_id)
    if not res:
        raise HTTPException(status_code=404, detail="Analysis report not found.")
    return res

@app.get("/api/lessons", response_model=list[Lesson])
def list_lessons():
    return LESSONS

@app.get("/api/challenges/daily", response_model=Challenge)
def get_daily_challenge():
    return CHALLENGES[0]

@app.get("/api/challenges/{challenge_id}", response_model=Challenge)
def get_challenge(challenge_id: str):
    for ch in CHALLENGES:
        if ch["id"] == challenge_id:
            return ch
    return CHALLENGES[0]

@app.post("/api/challenges/{challenge_id}/submit", response_model=ChallengeResult)
def submit_challenge(challenge_id: str, sub: ChallengeSubmission):
    target = None
    for ch in CHALLENGES:
        if ch["id"] == challenge_id:
            target = ch
            break
    if not target:
        target = CHALLENGES[0]
    
    selected_opt = None
    correct_opt = None
    for opt in target["options"]:
        if opt["id"] == sub.selected_option_id:
            selected_opt = opt
        if opt["is_correct"]:
            correct_opt = opt
            
    is_correct = selected_opt.get("is_correct", False) if selected_opt else False
    explanation = selected_opt.get("explanation", "") if selected_opt else "No option selected."
    
    xp_to_award = target.get("xp_reward", 50) if is_correct else 15
    prog = add_xp_and_complete_challenge(xp_to_award, target.get("concept_tag"))
    
    return {
        "is_correct": is_correct,
        "selected_option_id": sub.selected_option_id,
        "correct_option_id": correct_opt["id"] if correct_opt else "",
        "explanation": explanation,
        "xp_awarded": xp_to_award,
        "new_total_xp": prog["total_xp"],
        "streak": prog["streak_days"]
    }

@app.get("/api/progress", response_model=UserProgress)
def get_user_progress():
    return get_progress_data()

@app.get("/api/dashboard")
def get_dashboard_view():
    prog = get_progress_data()
    recent = get_all_analyses()[:4]
    daily_ch = CHALLENGES[0]
    return {
        "progress": prog,
        "recent_analyses": recent,
        "daily_challenge": daily_ch,
        "featured_lessons": LESSONS[:3]
    }
