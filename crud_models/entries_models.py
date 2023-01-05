from pydantic import BaseModel


class EntryCreate(BaseModel):
    patient_name: str


class EntryDTO(BaseModel):
    id: int
    patient_name: str
    status: str

    @classmethod
    def from_orm(cls, entry):
        entry_dto = EntryDTO(
            id=entry.id,
            patient_name=entry.patient_name,
            status=entry.status,
        )
        return entry_dto
