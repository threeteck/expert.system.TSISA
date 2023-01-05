from pydantic import BaseModel


class DiagnosisCreate(BaseModel):
    name: str
    description: str
    recommended_treatment: str


class DiagnosisDTO(BaseModel):
    id: int
    name: str
    description: str
    recommended_treatment: str

    @classmethod
    def from_orm(cls, diagnosis):
        diagnosis_dto = DiagnosisDTO(
            id=diagnosis.id,
            name=diagnosis.name,
            description=diagnosis.description,
            recommended_treatment=diagnosis.recommended_treatment,
        )
        return diagnosis_dto


class   EntryDiagnosisDTO(BaseModel):
    id: int
    name: str
    description: str
    recommended_treatment: str
    explanation: str

    @classmethod
    def from_orm(cls, entry_diagnosis):
        entry_diagnosis_dto = EntryDiagnosisDTO(
            id=entry_diagnosis.id,
            name=entry_diagnosis.diagnosis.name,
            description=entry_diagnosis.diagnosis.description,
            recommended_treatment=entry_diagnosis.diagnosis.recommended_treatment,
            explanation=entry_diagnosis.explanation,
        )
        return entry_diagnosis_dto
