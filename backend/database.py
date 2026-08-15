import sqlite3
import json
from typing import List, Dict, Any, Optional

DB_FILE = "truthlens.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analyses (
            id TEXT PRIMARY KEY,
            title TEXT,
            timestamp TEXT,
            content_type TEXT,
            raw_content TEXT,
            verdict TEXT,
            confidence REAL,
            summary TEXT,
            extracted_claims TEXT,
            evidence_cards TEXT,
            missing_context TEXT,
            manipulation_techniques TEXT,
            ai_media_forensics TEXT,
            uncertainty_notes TEXT,
            media_literacy_concept TEXT,
            concept_explanation TEXT,
            verification_questions TEXT,
            related_challenge_id TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            total_xp INTEGER DEFAULT 120,
            streak_days INTEGER DEFAULT 3,
            analyses_count INTEGER DEFAULT 1,
            challenges_completed INTEGER DEFAULT 1,
            lessons_completed INTEGER DEFAULT 2,
            skills_json TEXT,
            badges_json TEXT
        )
    ''')
    
    cursor.execute("SELECT id FROM user_progress WHERE id = 1")
    if not cursor.fetchone():
        initial_skills = json.dumps({
            "Source Evaluation": 65,
            "Context Awareness": 50,
            "Manipulation Detection": 70,
            "Evidence Evaluation": 60,
            "AI Content Awareness": 40,
            "Statistical Literacy": 45
        })
        initial_badges = json.dumps([
            {"id": "first_verify", "name": "First Step", "desc": "Completed your first verification analysis", "unlocked": True, "icon": "[1]"},
            {"id": "context_sleuth", "name": "Context Sleuth", "desc": "Uncovered missing context in a viral claim", "unlocked": True, "icon": "[2]"},
            {"id": "phishing_shield", "name": "Scam Shield", "desc": "Identified a deceptive URL and phishing scheme", "unlocked": False, "icon": "[3]"},
            {"id": "ai_spotter", "name": "Pixel Detective", "desc": "Spotted AI artifacts in synthetic media", "unlocked": False, "icon": "[4]"},
            {"id": "streak_master", "name": "Consistency Champion", "desc": "Maintained a 7-day verification streak", "unlocked": False, "icon": "[5]"}
        ])
        cursor.execute('''
            INSERT INTO user_progress (id, total_xp, streak_days, analyses_count, challenges_completed, lessons_completed, skills_json, badges_json)
            VALUES (1, 150, 3, 1, 1, 2, ?, ?)
        ''', (initial_skills, initial_badges))
    
    conn.commit()
    conn.close()

def save_analysis(data: Dict[str, Any]):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO analyses VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
    ''', (
        data["id"],
        data["title"],
        data["timestamp"],
        data["content_type"],
        data["raw_content"],
        data["verdict"],
        data["confidence"],
        data["summary"],
        json.dumps(data["extracted_claims"]),
        json.dumps([c if isinstance(c, dict) else c.dict() for c in data["evidence_cards"]]),
        json.dumps(data["missing_context"]),
        json.dumps([m if isinstance(m, dict) else m.dict() for m in data["manipulation_techniques"]]),
        data.get("ai_media_forensics"),
        data["uncertainty_notes"],
        data["media_literacy_concept"],
        data["concept_explanation"],
        json.dumps(data["verification_questions"]),
        data.get("related_challenge_id")
    ))
    
    cursor.execute("UPDATE user_progress SET analyses_count = analyses_count + 1 WHERE id = 1")
    conn.commit()
    conn.close()

def get_all_analyses() -> List[Dict[str, Any]]:
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM analyses ORDER BY timestamp DESC")
    rows = cursor.fetchall()
    results = []
    for r in rows:
        item = dict(r)
        item["extracted_claims"] = json.loads(item["extracted_claims"])
        item["evidence_cards"] = json.loads(item["evidence_cards"])
        item["missing_context"] = json.loads(item["missing_context"])
        item["manipulation_techniques"] = json.loads(item["manipulation_techniques"])
        item["verification_questions"] = json.loads(item["verification_questions"])
        results.append(item)
    conn.close()
    return results

def get_analysis_by_id(aid: str) -> Optional[Dict[str, Any]]:
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM analyses WHERE id = ?", (aid,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return None
    item = dict(row)
    item["extracted_claims"] = json.loads(item["extracted_claims"])
    item["evidence_cards"] = json.loads(item["evidence_cards"])
    item["missing_context"] = json.loads(item["missing_context"])
    item["manipulation_techniques"] = json.loads(item["manipulation_techniques"])
    item["verification_questions"] = json.loads(item["verification_questions"])
    return item

def get_progress_data() -> Dict[str, Any]:
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_progress WHERE id = 1")
    row = cursor.fetchone()
    conn.close()
    if not row:
        return {}
    return {
        "total_xp": row["total_xp"],
        "streak_days": row["streak_days"],
        "analyses_count": row["analyses_count"],
        "challenges_completed": row["challenges_completed"],
        "lessons_completed": row["lessons_completed"],
        "skills": json.loads(row["skills_json"]),
        "badges": json.loads(row["badges_json"])
    }

def add_xp_and_complete_challenge(xp: int, skill_category: Optional[str] = None) -> Dict[str, Any]:
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_progress WHERE id = 1")
    row = cursor.fetchone()
    if row:
        new_xp = row["total_xp"] + xp
        challenges = row["challenges_completed"] + 1
        skills = json.loads(row["skills_json"])
        if skill_category and skill_category in skills:
            skills[skill_category] = min(100, skills[skill_category] + 8)
        else:
            skills["Evidence Evaluation"] = min(100, skills.get("Evidence Evaluation", 50) + 5)
            
        cursor.execute('''
            UPDATE user_progress 
            SET total_xp = ?, challenges_completed = ?, skills_json = ?
            WHERE id = 1
        ''', (new_xp, challenges, json.dumps(skills)))
        conn.commit()
    conn.close()
    return get_progress_data()
