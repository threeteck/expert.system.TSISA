from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from common import get_db
from crud_models.diagnosis_models import DiagnosisCreate, DiagnosisDTO
from models import Diagnosis

router = APIRouter(tags=["diagnoses"])


@router.get("/", response_model=List[DiagnosisDTO])
def get_diagnosis(db: Session = Depends(get_db)):
    diagnoses = db.query(Diagnosis).all()
    response = [DiagnosisDTO.from_orm(diagnosis) for diagnosis in diagnoses]
    return response


@router.get("/{diagnosis_id}", response_model=DiagnosisDTO)
def get_diagnosis(diagnosis_id: int, db: Session = Depends(get_db)):
    return DiagnosisDTO.from_orm(db.query(Diagnosis).filter(Diagnosis.id == diagnosis_id).first())


@router.post("/")
def create_diagnosis(diagnosis: DiagnosisCreate, db: Session = Depends(get_db)):
    db_diagnosis = Diagnosis(**diagnosis.dict())
    db.add(db_diagnosis)
    db.commit()
    db.refresh(db_diagnosis)
    return db_diagnosis
