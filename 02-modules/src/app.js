/*global jQuery, Handlebars, Router */

import {
    ENTER_KEY,
    ESCAPE_KEY
} from './keyboard'

import $ from 'jquery'

import Handlebars from 'handlebars'

import {
    uuid,
    pluralize,
    store
} from './util'

import {
    init,
    cacheElements,
    bindEvents,
    render,
    renderFooter,
    toggleAll,
    getActiveTodos,
    getCompletedTodos,
    getFilteredTodos,
    destroyCompleted,
    indexFromEl,
    create,
    toggle,
    edit,
    editKeyup,
    update,
    destroy
} from './application'


init();




