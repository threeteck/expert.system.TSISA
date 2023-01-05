from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from common import get_db
from crud_models.diagnosis_models import EntryDiagnosisDTO
from crud_models.entries_models import EntryCreate, EntryDTO
from crud_models.variable_models import VariableValueCreate, VariableValueDTO
from models import Entry, VariableValue, EntryDiagnosis
from process_entry import process_entry

router = APIRouter(tags=["entries"])


@router.get("/", response_model=List[EntryDTO])
def get_entries(db: Session = Depends(get_db)):
    entries = db.query(Entry).all()
    response = [EntryDTO.from_orm(entry) for entry in entries]
    return response


@router.get("/{entry_id}", response_model=EntryDTO)
def get_entry(entry_id: int, db: Session = Depends(get_db)):
    return EntryDTO.from_orm(db.query(Entry).filter(Entry.id == entry_id).first())


@router.get("/{entry_id}/variable_values", response_model=List[VariableValueDTO])
def get_entry_variable_values(entry_id: int, db: Session = Depends(get_db)):
    variable_values = db.query(VariableValue) \
        .filter(VariableValue.entry_id == entry_id) \
        .join(VariableValue.variable_definition) \
        .all()
    response = [VariableValueDTO.from_orm(variable_value) for variable_value in variable_values]
    return response


@router.get("/{entry_id}/entry_diagnoses", response_model=List[EntryDiagnosisDTO])
def get_entry_entry_diagnoses(entry_id: int, db: Session = Depends(get_db)):
    entry_diagnoses = db.query(EntryDiagnosis) \
        .filter(EntryDiagnosis.entry_id == entry_id) \
        .join(EntryDiagnosis.diagnosis) \
        .all()
    response = [EntryDiagnosisDTO.from_orm(entry_diagnosis) for entry_diagnosis in entry_diagnoses]
    return response


@router.post("/")
def create_entry(entry: EntryCreate, db: Session = Depends(get_db)):
    db_entry = Entry(**entry.dict())
    db_entry.status = "Pending"
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@router.post("/{entry_id}/variable_values")
def create_entry_variable_value(entry_id: int, variable_value: List[VariableValueCreate],
                                db: Session = Depends(get_db)):
    db_entry = db.query(Entry).filter(Entry.id == entry_id).first()
    for variable in variable_value:
        db_variable = VariableValue(**variable.dict())
        db_variable.entry = db_entry
        db.add(db_variable)
    db_entry.status = "Processing"
    db.commit()
    db.refresh(db_entry)

    db_entry = process_entry(db_entry, db)
    return db_entry
