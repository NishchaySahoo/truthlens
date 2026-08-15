from pydantic import BaseModel, Field
from typing import List, Optional

class EvidenceCard(BaseModel):
    title: str
    source_name: str
    source_type: str
    published_date: str
    relevance: str
    summary: str
    url: Optional[str] = None
    is_demo: bool = True

class ManipulationDetail(BaseModel):
    technique: str
    description: str
    severity: str

class AnalysisRequest(BaseModel):
    content_type: str = Field(default="text", description="text | url | image | demo")
    raw_content: Optional[str] = None
    demo_id: Optional[str] = None

class AnalysisResponse(BaseModel):
    id: str
    title: str
    timestamp: str
    content_type: str
    raw_content: str
    verdict: str
    confidence: float
    summary: str
    extracted_claims: List[str]
    evidence_cards: List[EvidenceCard]
    missing_context: List[str]
    manipulation_techniques: List[ManipulationDetail]
    ai_media_forensics: Optional[str] = None
    uncertainty_notes: str
    media_literacy_concept: str
    concept_explanation: str
    verification_questions: List[str]
    related_challenge_id: Optional[str] = None

class ChallengeOption(BaseModel):
    id: str
    text: str
    is_correct: bool
    explanation: str

class Challenge(BaseModel):
    id: str
    title: str
    category: str
    scenario: str
    suspicious_message: str
    question: str
    options: List[ChallengeOption]
    xp_reward: int = 50
    concept_tag: str

class ChallengeSubmission(BaseModel):
    selected_option_id: str

class ChallengeResult(BaseModel):
    is_correct: bool
    selected_option_id: str
    correct_option_id: str
    explanation: str
    xp_awarded: int
    new_total_xp: int
    streak: int

class Lesson(BaseModel):
    id: str
    title: str
    category: str
    read_time: str
    overview: str
    key_takeaways: List[str]
    pro_tips: List[str]

class UserProgress(BaseModel):
    total_xp: int
    streak_days: int
    analyses_count: int
    challenges_completed: int
    lessons_completed: int
    skills: dict[str, int]
    badges: List[dict]
