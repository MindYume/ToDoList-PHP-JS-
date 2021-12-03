<?php
    // Подключение к базе данных
    // Database connection
    $db = mysqli_connect('localhost', 'root', '', 'todolist');

    if (isset($_POST['task_new_name'])) {
        $task_new_name = $_POST['task_new_name'];
        $task_id = $_POST['task_id'];
        
        if(strlen($task_new_name) <= 0){
            mysqli_query($db, "DELETE FROM tasks WHERE id = '$task_id'");
            echo "0";
        } else {
            mysqli_query($db, "UPDATE tasks SET name = '$task_new_name' WHERE id = '$task_id'");
        }

        if(isset($_POST['task_check'])) {
            mysqli_query($db, "UPDATE tasks SET is_done = 1 WHERE id = '$task_id'");
        }
        else {
            mysqli_query($db, "UPDATE tasks SET is_done = 0 WHERE id = '$task_id'");
        }
    }
?>