import $ from 'jquery'

import Handlebars from 'handlebars'

import * as Keyboard from './keyboard';

import * as Util from './util';

Handlebars.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});

let todos = Util.store('todos-jquery');

const todoTemplate = Handlebars.compile($('#todo-template').html());
const footerTemplate = Handlebars.compile($('#footer-template').html());
const $todoApp = $('#todoapp');
const $header = $todoApp.find('#header');
const $main = $todoApp.find('#main');
const $footer = $todoApp.find('#footer');
const $newTodo = $header.find('#new-todo');
const $toggleAll = $main.find('#toggle-all');
const $todoList = $main.find('#todo-list');
const list = $todoList;

export function init() {
    $newTodo.on('keyup', function(e) {
        const $input = $(e.target);
        const val = $input.val().trim();

        if (e.which !== Keyboard.ENTER_KEY || !val) {
            return;
        }

        todos.push({
            id: Util.uuid(),
            title: val,
            completed: false
        });

        $input.val('');

        render();
    });

    $toggleAll.on('change', function(e){
            const isChecked = $(e.target).prop('checked');

            todos.forEach(function (todo) {
                todo.completed = isChecked;
            });

            render();
        }
    );

    $footer.on('click', '#clear-completed', function(){
        todos = getActiveTodos();
        const filter = 'all';
        render(filter);
    });

    list.on('change', '.toggle', toggle);

    list.on('dblclick', 'label', function(e){
        const $input = $(e.target).closest('li').addClass('editing').find('.edit');
        $input.val($input.val()).focus();
    });

    list.on('keyup', '.edit', function(e){
        if (e.which === Keyboard.ENTER_KEY) {
            e.target.blur();
        }

        if (e.which === Keyboard.ESCAPE_KEY) {
            $(e.target).data('abort', true).blur();
        }
    });

    list.on('focusout', '.edit', function(e){
        const el = e.target;
        const $el = $(el);
        const val = $el.val().trim();

        if ($el.data('abort')) {
            $el.data('abort', false);
            render();
            return;
        }

        const i = indexFromEl(el);

        if (val) {
            todos[i].title = val;
        } else {
            todos.splice(i, 1);
        }

        render();
    });

    list.on('click', '.destroy', function(e){
        todos.splice(indexFromEl(e.target), 1);
        render();
    });

    new Router({
        '/:filter': function (filter) {
            render(filter);
        }
    }).init('/all');
}

export function render(filter) {
    const todos = getFilteredTodos(filter);
    $todoList.html(todoTemplate(todos));
    $main.toggle(todos.length > 0);
    $toggleAll.prop('checked', getActiveTodos().length === 0);

    const todoCount = todos.length;
    const activeTodoCount = getActiveTodos().length;
    const template = footerTemplate({
        activeTodoCount: activeTodoCount,
        activeTodoWord: Util.pluralize(activeTodoCount, 'item'),
        completedTodos: todoCount - activeTodoCount,
        filter: filter
    });

    $footer.toggle(todoCount > 0).html(template);

    $newTodo.focus();
    Util.store('todos-jquery', todos);
}

export function getActiveTodos() {
    return todos.filter(function (todo) {
        return !todo.completed;
    });
}

export function getCompletedTodos() {
    return todos.filter(function (todo) {
        return todo.completed;
    });
}

export function getFilteredTodos(filter) {
    if (filter === 'active') {
        return getActiveTodos();
    }

    if (filter === 'completed') {
        return getCompletedTodos();
    }

    return todos;
}

// accepts an element from inside the `.item` div and
// returns the corresponding index in the `todos` array
export function indexFromEl(el) {
    const id = $(el).closest('li').data('id');
    let i = todos.length;

    while (i--) {
        if (todos[i].id === id) {
            return i;
        }
    }
}

export function toggle(e) {
    const i = indexFromEl(e.target);
    todos[i].completed = !todos[i].completed;
    render();
}


init();