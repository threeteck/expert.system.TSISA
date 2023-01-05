from models import Diagnosis, Entry, EntryDiagnosis, Rule, VariableValue


def create_explanation(variables, rule):
    explanation = '{{Использованые переменные}}:'
    for variable in variables:
        explanation += \
            '{' + variable.variable_definition.name + '}' \
            + f'{variable.variable_definition.description}:'
    explanation += '{{Правило}}:' + rule.condition
    explanation += ':{{Описание}}:' + rule.description
    explanation += ':{{Объяснение}}:' + rule.explanation
    return explanation


def parse_rule(rule: Rule, variables: dict):
    # Parse the rule and return the true or false and all the variables used
    result = False
    variables_used = []
    # Split the rule into conditions by operators "AND" and "OR"
    conjunctions = rule.condition.split(" OR ")
    for conjunct in conjunctions:
        conjunct_result = True
        conditions = conjunct.split(" AND ")
        for condition in conditions:
            # Posible operators: <, >, <=, >=, =, !=, in [value1, value2, ...], not in [value1, value2, ...]
            # Split the conjunct into variable, operator and value
            variable, operator, value = condition.split(" ")
            # Get the variable value
            if variable in variables:
                variable_value = variables[variable].value
            else:
                continue

            # Check the operator
            if operator == "<":
                conjunct_result = conjunct_result and (float(variable_value) < float(value))
            elif operator == ">":
                conjunct_result = conjunct_result and (float(variable_value) > float(value))
            elif operator == "<=":
                conjunct_result = conjunct_result and (float(variable_value) <= float(value))
            elif operator == ">=":
                conjunct_result = conjunct_result and (float(variable_value) >= float(value))
            elif operator == "=":
                conjunct_result = conjunct_result and (variable_value == value)
            elif operator == "!=":
                conjunct_result = conjunct_result and (variable_value != value)
            elif operator == "in":
                variable_values = variable_value.split(",")
                values = value[1:-1].split(",")
                values = [value.strip('\'') for value in values]
                conjunct_result = conjunct_result and len((set(variable_values) & set(values))) > 0
            elif operator == "not in":
                variable_values = variable_value.split(",")
                values = value[1:-1].split(",")
                values = [value.strip('\'') for value in values]
                conjunct_result = conjunct_result and len((set(variable_values) & set(values))) == 0
            else:
                continue

            # Add the variable to the variables_used
            variables_used.append(variables[variable])

        # If the conjunct result is true, the rule result is true
        if conjunct_result:
            result = True
            break

    return result, variables_used


def process_entry(entry: Entry, db):
    # Get all variable values of the entry
    variable_values = db.query(VariableValue).filter(VariableValue.entry_id == entry.id)\
        .join(VariableValue.variable_definition).all()
    # Get all rules
    rules = db.query(Rule).all()
    # Create the entry_diagnoses
    entry_diagnoses = []
    for rule in rules:
        # Create the variables dict
        variables_dict = {}
        for variable in variable_values:
            variables_dict[variable.variable_definition_id] = variable
        # Parse the rule
        result, variables = parse_rule(rule, variables_dict)
        # If the result is true, create the entry_diagnosis
        if result:
            entry_diagnosis = EntryDiagnosis()
            entry_diagnosis.entry = entry
            entry_diagnosis.diagnosis = rule.diagnosis
            entry_diagnosis.explanation = create_explanation(variables, rule)
            entry_diagnoses.append(entry_diagnosis)

    # Add the entry_diagnoses to the entry
    entry.entry_diagnoses = entry_diagnoses
    entry.status = "Completed"
    db.commit()
    db.refresh(entry)

    return entry
