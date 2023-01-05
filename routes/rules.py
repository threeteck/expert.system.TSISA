from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from common import get_db
from crud_models.diagnosis_models import DiagnosisCreate, DiagnosisDTO
from crud_models.rules_models import RuleDTO, RuleCreate
from models import Diagnosis, Rule

router = APIRouter(tags=["rules"])


@router.get("/", response_model=List[RuleDTO])
def get_rules(db: Session = Depends(get_db)):
    rules = db.query(Rule).join(Rule.diagnosis).all()
    response = [RuleDTO.from_orm(rule) for rule in rules]
    return response


@router.get("/{rule_id}", response_model=RuleDTO)
def get_rule(rule_id: int, db: Session = Depends(get_db)):
    return RuleDTO.from_orm(db.query(Rule)
                            .filter(Rule.id == rule_id)
                            .join(Rule.diagnosis).first())


@router.post("/")
def create_rule(rule: RuleCreate, db: Session = Depends(get_db)):
    db_rule = Rule(**rule.dict())
    db.add(db_rule)
    db.commit()
    db.refresh(db_rule)
    return db_rule
