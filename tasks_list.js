jQuery('document').ready(() => {
    // Загрузить задачи из базы данных через запрос к /load_tasks.php
    // Load tasks from the database via a request to /load_tasks.php
    task_list_set();

    // Если нажата кнопка для добавления новой задачи, то отправить задачу в базу данных и очистить поле ввода
    // If the "Add task" button is clicked, add the task to the database and clear the input field
    jQuery("#add_new_task").submit((e) => {
        e.preventDefault();
        let form_data = jQuery("#add_new_task").serialize();
        
        jQuery.ajax({
            type: 'POST',
            url: '/add_new_task.php',
            dataType: 'html',
            data: form_data,
            success: function(data){
                data_js = JSON.parse(data);
                task_add(data_js.name, data_js.id);
                jQuery("#add_new_task").find("input").blur();
            }
        });

        jQuery("#add_new_task").trigger("reset");
        
    });
});

// Добавить задачу на клиентской части
// Add a task on the client side
function task_add(task_name, task_id, is_done) {
    let checked = ""

    if(is_done == 1) {
        checked = "checked";
    }

    jQuery('#tasks_list').append(
    '<tr id="task_row_'+task_id+'">'+
        '<td class="task">'+
            '<form id="task_form_'+task_id+'">'+
            '<input type="checkbox" name="task_check" id=check_'+task_id+' '+checked+'>'+
                '<input type="text" name="task_new_name" value="'+task_name+'">'+
                '<input type="hidden" name="task_id" value="'+task_id+'">'+
           ' </form>'+
        '</td>'+
        '<td class="delete">'+
            '<button id="del_'+task_id+'">X</button>'+
        '</td>'+
    '</tr>'
    );
    
    // Если клиент нажал на checkbox, то отправить изменения в базу данных
    // If the client clicked on the checkbox, then send the changes to the database
    jQuery("#check_"+task_id).on("click",() => {
        task_edit(task_id);
    });

    // Удалить задачу, если нажата кнопка удаления
    // Delete the task if delete buttin is clicked
    jQuery("#del_"+task_id).on("click",() => {
        task_del(task_id);
    });

    // Если название задачи изменено, то отправить изменения в базу данных
    // If the task name is changed, then send the changes to the database
    jQuery("#task_form_"+task_id).submit((e) => {
        e.preventDefault();
        jQuery("#task_form_"+task_id).find("input").blur();
    });

    jQuery("#task_form_"+task_id).find("input").blur(()=>{
        task_edit(task_id);
    });
}

// Отправить данные о задачи в базу данных
// Send data about the task to the database
function task_edit(task_id) {
    let form_data = jQuery("#task_form_"+task_id).serialize();

    jQuery.ajax({
        type: 'POST',
        url: '/edit_task.php',
        dataType: 'html',
        data: form_data,
        success: function(data){
            if(data == "0"){
                task_del(task_id)
            }
        }
    });
}

// Удалить задачу из базы данных
// Delete the task from the database
function task_del(task_id) {
    jQuery.ajax({
        type: 'GET',
        url: '/del_task.php',
        dataType: 'html',
        data: "del_task="+task_id,
        success: function(data){
            jQuery("#task_row_"+task_id).remove();
        }
    });
}

// Загрузить все задачи из базы данных
// Load all tasks from the database
function task_list_set() {
    jQuery.ajax({
        type: 'GET',
        url: '/load_tasks.php',
        dataType: 'html',
        success: function(data){
            tasks = JSON.parse(data);
            for(var i = 0; i < tasks.length; i++) {
                task_add(tasks[i].name, tasks[i].id, tasks[i].is_done);
            }
        }
    });
}
