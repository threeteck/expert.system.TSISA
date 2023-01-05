from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from common import get_db
from crud_models.variable_models import VariableDefinitionCreate, VariableDefinitionDTO
from models import VariableDefinition

router = APIRouter(tags=["variables"])


@router.get("/", response_model=List[VariableDefinitionDTO])
def get_variables(db: Session = Depends(get_db)):
    variables = db.query(VariableDefinition).all()
    response = [VariableDefinitionDTO.from_orm(variable) for variable in variables]
    return response


@router.get("/{variable_id}", response_model=VariableDefinitionDTO)
def get_variable(variable_id: int, db: Session = Depends(get_db)):
    return VariableDefinitionDTO.from_orm(db.query(VariableDefinition)
                                          .filter(VariableDefinition.id == variable_id)
                                          .first())


@router.post("/")
def create_variable(variable: VariableDefinitionCreate, db: Session = Depends(get_db)):
    db_variable = VariableDefinition(**variable.dict())
    db.add(db_variable)
    db.commit()
    db.refresh(db_variable)
    return db_variable
