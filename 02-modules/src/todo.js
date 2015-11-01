import $ from 'jquery'

import Handlebars from 'handlebars'

import {
    ENTER_KEY,
    ESCAPE_KEY
} from './keyboard'

import * from './util' as util;

Handlebars.registerHelper('eq', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});

let todos = store('todos-jquery');

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
        var $input = $(e.target);
        var val = $input.val().trim();

        if (e.which !== ENTER_KEY || !val) {
            return;
        }

        todos.push({
            id: uuid(),
            title: val,
            completed: false
        });

        $input.val('');

        render();
    });

    $toggleAll.on('change', function(e){
            var isChecked = $(e.target).prop('checked');

            todos.forEach(function (todo) {
                todo.completed = isChecked;
            });

            render();
        }
    );

    $footer.on('click', '#clear-completed', function(){
        todos = getActiveTodos();
        var filter = 'all';
        render(filter);
    });

    list.on('change', '.toggle', toggle);

    list.on('dblclick', 'label', function(e){
        var $input = $(e.target).closest('li').addClass('editing').find('.edit');
        $input.val($input.val()).focus();
    });

    list.on('keyup', '.edit', function(e){
        if (e.which === ENTER_KEY) {
            e.target.blur();
        }

        if (e.which === ESCAPE_KEY) {
            $(e.target).data('abort', true).blur();
        }
    });

    list.on('focusout', '.edit', function(e){
        var el = e.target;
        var $el = $(el);
        var val = $el.val().trim();

        if ($el.data('abort')) {
            $el.data('abort', false);
            render();
            return;
        }

        var i = indexFromEl(el);

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
    var todos = getFilteredTodos(filter);
    $todoList.html(todoTemplate(todos));
    $main.toggle(todos.length > 0);
    $toggleAll.prop('checked', getActiveTodos().length === 0);

    var todoCount = todos.length;
    var activeTodoCount = getActiveTodos().length;
    var template = footerTemplate({
        activeTodoCount: activeTodoCount,
        activeTodoWord: pluralize(activeTodoCount, 'item'),
        completedTodos: todoCount - activeTodoCount,
        filter: filter
    });

    $footer.toggle(todoCount > 0).html(template);

    $newTodo.focus();
    store('todos-jquery', todos);
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
    var id = $(el).closest('li').data('id');
    var i = todos.length;

    while (i--) {
        if (todos[i].id === id) {
            return i;
        }
    }
}

export function toggle(e) {
    var i = indexFromEl(e.target);
    todos[i].completed = !todos[i].completed;
    render();
}