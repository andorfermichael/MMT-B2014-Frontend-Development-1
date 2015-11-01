import $ from 'jquery'

import Handlebars from 'handlebars'

import {
    ENTER_KEY,
    ESCAPE_KEY
} from './keyboard'

import {
    uuid,
    pluralize,
    store
} from './util'

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
    $newTodo.on('keyup', create);
    $toggleAll.on('change', toggleAll);
    $footer.on('click', '#clear-completed', destroyCompleted);
    list.on('change', '.toggle', toggle);
    list.on('dblclick', 'label', edit);
    list.on('keyup', '.edit', editKeyup);
    list.on('focusout', '.edit', update);
    list.on('click', '.destroy', destroy);

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
    renderFooter(filter);
    $newTodo.focus();
    store('todos-jquery', todos);
}

export function renderFooter(filter) {
    var todoCount = todos.length;
    var activeTodoCount = getActiveTodos().length;
    var template = footerTemplate({
        activeTodoCount: activeTodoCount,
        activeTodoWord: pluralize(activeTodoCount, 'item'),
        completedTodos: todoCount - activeTodoCount,
        filter: filter
    });

    $footer.toggle(todoCount > 0).html(template);
}

export function toggleAll(e) {
    var isChecked = $(e.target).prop('checked');

    todos.forEach(function (todo) {
        todo.completed = isChecked;
    });

    render();
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

export function destroyCompleted() {
    todos = getActiveTodos();
    var filter = 'all';
    render(filter);
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

export function create(e) {
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
}

export function toggle(e) {
    var i = indexFromEl(e.target);
    todos[i].completed = !todos[i].completed;
    render();
}

export function edit(e) {
    var $input = $(e.target).closest('li').addClass('editing').find('.edit');
    $input.val($input.val()).focus();
}

export function editKeyup(e) {
    if (e.which === ENTER_KEY) {
        e.target.blur();
    }

    if (e.which === ESCAPE_KEY) {
        $(e.target).data('abort', true).blur();
    }
}

export function update(e) {
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
}

export function destroy(e) {
    todos.splice(indexFromEl(e.target), 1);
    render();
}