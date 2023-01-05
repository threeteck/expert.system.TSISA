from pydantic import BaseModel


class RuleCreate(BaseModel):
    name: str
    description: str
    explanation: str
    condition: str
    diagnosis_id: int


class RuleDTO(BaseModel):
    id: int
    name: str
    description: str
    explanation: str
    condition: str
    diagnosis_name: str

    @classmethod
    def from_orm(cls, rule):
        rule_dto = RuleDTO(
            id=rule.id,
            name=rule.name,
            description=rule.description,
            explanation=rule.explanation,
            condition=rule.condition,
            diagnosis_name=rule.diagnosis.name,
        )
        return rule_dto
