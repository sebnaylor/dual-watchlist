# Start Task

Start working on a TaskMaster task by creating a dedicated branch.

## Arguments
- `$ARGUMENTS` - Task ID (optional, defaults to next available task)

## Steps

1. **Get the task**: If a task ID is provided in `$ARGUMENTS`, fetch that task using `mcp-cli call task-master-ai/get_task`. Otherwise, get the next available task using `mcp-cli call task-master-ai/next_task`.

2. **Generate branch name**: Create a branch name using this format:
   - `task-{id}-{slugified-title}`
   - Slugify the title: lowercase, replace spaces with hyphens, remove special characters, truncate to 50 chars
   - Example: Task 11 "Set up Tailwind design tokens" → `task-11-set-up-tailwind-design-tokens`

3. **Create and checkout branch**: Run `git checkout -b {branch-name}` to create the new branch.

4. **Set task status**: Mark the task as "in-progress" using `mcp-cli call task-master-ai/set_task_status`.

5. **Output summary**: Tell the user:
   - The branch name that was created
   - The task ID and title
   - A brief summary of what the task involves

## Example Output

```
Created branch: task-11-set-up-tailwind-design-tokens

Task 11: Set up Tailwind design tokens and configuration
Status: in-progress

Summary: Create design tokens in tailwind.config.js for colors, spacing, and sizing.
```
