from typing import List

from pydantic import BaseModel


class VariableDefinitionCreate(BaseModel):
    id: str
    name: str
    description: str
    type: str
    is_multiple: bool
    options: str


class VariableValueCreate(BaseModel):
    variable_definition_id: str
    value: str


class VariableDefinitionDTO(BaseModel):
    id: str
    name: str
    description: str
    type: str
    is_multiple: bool
    options: List[str]

    @classmethod
    def from_orm(cls, variable_definition):
        variable_definition_dto = VariableDefinitionDTO(
            id=variable_definition.id,
            name=variable_definition.name,
            description=variable_definition.description,
            type=variable_definition.type,
            is_multiple=variable_definition.is_multiple,
            options=variable_definition.options.split(","),
        )
        return variable_definition_dto


class VariableValueDTO(BaseModel):
    id: int
    variable_definition_name: str
    value: str

    @classmethod
    def from_orm(cls, variable_value):
        variable_value_dto = VariableValueDTO(
            id=variable_value.id,
            variable_definition_name=variable_value.variable_definition.name,
            value=variable_value.value,
        )
        return variable_value_dto
