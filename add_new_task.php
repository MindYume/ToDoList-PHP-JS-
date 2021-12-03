<?php
    // Подключение к базе данных
    // Database connection
    $db = mysqli_connect('localhost', 'root', '', 'todolist');
    
    if (empty($_POST['task']) == false) {
        $task_name = $_POST['task'];
        mysqli_query($db, "INSERT INTO tasks (name) VALUES ('$task_name')");

        $id_max = mysqli_query($db, "SELECT * FROM tasks ORDER BY id DESC LIMIT 1");
        echo json_encode(mysqli_fetch_assoc($id_max));
    }
?>
