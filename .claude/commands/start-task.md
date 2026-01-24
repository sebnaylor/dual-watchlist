# Start Task

Start working on a TaskMaster task.

## Arguments
- `$ARGUMENTS` - Task ID (optional, defaults to next available task)

## Steps

1. **Get the task**: If a task ID is provided in `$ARGUMENTS`, fetch that task using `mcp-cli call task-master-ai/get_task`. Otherwise, get the next available task using `mcp-cli call task-master-ai/next_task`.

2. **Set task status**: Mark the task as "in-progress" using `mcp-cli call task-master-ai/set_task_status`.

3. **Implement the task**: Actually complete the work described in the task details.

4. **Output summary**: Tell the user:
   - The task ID and title
   - A brief summary of what the task involves

## Example Output

```
Task 11: Set up Tailwind design tokens and configuration
Status: in-progress

Summary: Create design tokens in tailwind.config.js for colors, spacing, and sizing.
```
