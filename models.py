from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from common import Base, engine


class VariableDefinition(Base):
    __tablename__ = 'variable_definitions'

    id = Column(String, primary_key=True)
    name = Column(String)
    description = Column(String)
    type = Column(String)
    is_multiple = Column(Boolean)
    options = Column(String)


class VariableValue(Base):
    __tablename__ = 'variable_values'

    id = Column(Integer, primary_key=True)
    entry_id = Column(Integer, ForeignKey('entries.id'))
    entry = relationship("Entry", back_populates="variable_values")
    variable_definition_id = Column(String, ForeignKey('variable_definitions.id'))
    variable_definition = relationship("VariableDefinition")
    value = Column(String)


class Diagnosis(Base):
    __tablename__ = 'diagnoses'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    recommended_treatment = Column(String)


class EntryDiagnosis(Base):
    __tablename__ = 'entry_diagnoses'

    id = Column(Integer, primary_key=True)
    entry_id = Column(Integer, ForeignKey('entries.id'))
    entry = relationship("Entry", back_populates="entry_diagnoses")
    diagnosis_id = Column(Integer, ForeignKey('diagnoses.id'))
    diagnosis = relationship("Diagnosis")
    explanation = Column(String)


class Entry(Base):
    __tablename__ = 'entries'

    id = Column(Integer, primary_key=True)
    patient_name = Column(String)
    status = Column(String)
    variable_values = relationship("VariableValue", back_populates="entry")
    entry_diagnoses = relationship("EntryDiagnosis", back_populates="entry")


class Rule(Base):
    __tablename__ = 'rules'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    explanation = Column(String)
    condition = Column(String)
    diagnosis_id = Column(Integer, ForeignKey('diagnoses.id'))
    diagnosis = relationship("Diagnosis")


# Clear the database
# Base.metadata.drop_all(engine)
# Create the database
Base.metadata.create_all(engine)
