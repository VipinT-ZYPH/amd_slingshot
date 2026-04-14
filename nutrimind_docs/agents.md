# Agents

## 1. Input Agent
- Captures user input
- Cleans text
- Validates empty input

## 2. Insight Agent
- Generates prompt
- Calls AI/mock function
- Structures response

## 3. UI Agent
- Displays results
- Handles loading states
- Renders components

## Rules
- No agent overlaps responsibility
- Keep functions modular
- Avoid redundant processing
- Fail gracefully

## Data Flow
User Input → Input Agent → Insight Agent → UI Agent
