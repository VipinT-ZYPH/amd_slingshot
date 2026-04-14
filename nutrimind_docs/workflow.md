# Workflow

## Primary Flow
1. User enters food details
2. Input is sanitized
3. Prompt is generated
4. AI/mocked response is returned
5. UI renders insights

## Output Structure
- Calories (estimate)
- Health rating
- Issues detected
- Suggestions

## Fallback Flow
- If AI fails:
  - Return predefined response
  - Display “Using default insights”

## Performance Rules
- Response < 2s
- No blocking UI
- Show loading state
