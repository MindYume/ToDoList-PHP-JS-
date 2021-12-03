<?php
    // Подключение к базе данных
    // Database connection
    $db = mysqli_connect('localhost', 'root', '', 'todolist');

    $tasks = mysqli_query($db, "SELECT * FROM tasks");
    $tasks_arr = array();
    while ($Task_get = mysqli_fetch_assoc($tasks)) {
        $tasks_arr[] = $Task_get;
    }

    echo json_encode($tasks_arr);

?>