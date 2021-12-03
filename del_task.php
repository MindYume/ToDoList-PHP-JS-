<?php
    // Подключение к базе данных
    // Database connection
    $db = mysqli_connect('localhost', 'root', '', 'todolist');

    if (isset($_GET['del_task'])) {
        $task_id = $_GET['del_task'];
        mysqli_query($db, "DELETE FROM tasks WHERE id = '$task_id'");
    }
?>