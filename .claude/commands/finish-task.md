# Finish Task

Complete the current TaskMaster task and prepare for the next one.

## Arguments
- `$ARGUMENTS` - Task ID (optional, infers from current branch if not provided)

## Steps

1. **Identify the task**: If `$ARGUMENTS` is provided, use that task ID. Otherwise, extract the task ID from the current git branch name (e.g., `task-11-foo` → task ID `11`).

2. **Mark task as done**: Use `mcp-cli call task-master-ai/set_task_status` to set status to "done".

3. **Show completion summary**: Display:
   - The completed task ID and title
   - Current branch name
   - Suggest: "Run `/start-task` to begin the next task, or `git checkout main` to return to main branch"

4. **Show next task**: Briefly show what the next available task is using `mcp-cli call task-master-ai/next_task`.

## Example Output

```
Task 11 completed: Set up Tailwind design tokens and configuration

Current branch: task-11-set-up-tailwind-design-tokens

Next available task:
  Task 12: Implement Lucide React icons and replace custom SVGs

Run `/start-task` to begin the next task.
```
