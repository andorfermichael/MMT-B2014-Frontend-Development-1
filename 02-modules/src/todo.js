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

var todoTemplate = Handlebars.compile($('#todo-template').html());
var footerTemplate = Handlebars.compile($('#footer-template').html());
var $todoApp = $('#todoapp');
var $header = $todoApp.find('#header');
var $main = $todoApp.find('#main');
var $footer = $todoApp.find('#footer');
var $newTodo = $header.find('#new-todo');
var $toggleAll = $main.find('#toggle-all');
var $todoList = $main.find('#todo-list');
var $count = $footer.find('#todo-count');
var $clearBtn = $footer.find('#clear-completed');

var todos = store('todos-jquery');

export function init() {

    //cacheElements();
    bindEvents();

    new Router({
        '/:filter': function (filter) {
            //filter = filter;
            render(filter);
        }.bind(this)
    }).init('/all');
}

/*export function cacheElements() {
    var todoTemplate = Handlebars.compile($('#todo-template').html());
    var footerTemplate = Handlebars.compile($('#footer-template').html());
    var $todoApp = $('#todoapp');
    var $header = $todoApp.find('#header');
    var $main = $todoApp.find('#main');
    var $footer = $todoApp.find('#footer');
    var $newTodo = $header.find('#new-todo');
    var $toggleAll = $main.find('#toggle-all');
    var $todoList = $main.find('#todo-list');
    var $count = $footer.find('#todo-count');
    var $clearBtn = $footer.find('#clear-completed');
}*/

var list = $todoList;

export function bindEvents() {

    $newTodo.on('keyup', create.bind(this));
    $toggleAll.on('change', toggleAll.bind(this));
    $footer.on('click', '#clear-completed', destroyCompleted.bind(this));
    list.on('change', '.toggle', toggle.bind(this));
    list.on('dblclick', 'label', edit.bind(this));
    list.on('keyup', '.edit', editKeyup.bind(this));
    list.on('focusout', '.edit', update.bind(this));
    list.on('click', '.destroy', destroy.bind(this));
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
    var todos = getActiveTodos();
    filter = 'all';
    render();
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
        this.render();
        return;
    }

    var i = this.indexFromEl(el);

    if (val) {
        todos[i].title = val;
    } else {
        todos.splice(i, 1);
    }

    this.render();
}

export function destroy(e) {
    todos.splice(indexFromEl(e.target), 1);
    render();
}