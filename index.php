<!DOCTYPE html>
<html>
    <head>
        <title>To Do List PHP/JS</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
        <script type="text/javascript" src="tasks_list.js"></script>
    </head>
    <body>
        <div class="heading">
            <h2>To Do List (PHP/JS)</h2>
        </div>
        <div class="Paper">
            <form id="add_new_task" class="input_form">
                <input type="text" name="task" class="task_input">
                <button type="submit" name="submit" class="add_btn">Add Task</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="tasks_list">
                </tbody>
            </table>
        </div>
    </body>
</html>