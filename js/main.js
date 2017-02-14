(function() {
    "use strict";
    $(document).ready(() => {
        const toDoList = function() {

            function bindEvents() {
                checkMark();
                deleteItem();
                editItems();
                allItems();
                clearItems();
                activeItems();
                completeItems();
            }

            function checkMark() {
                $('.items').on('click', '.check', function() {
                    event.preventDefault();
                    $('.items li:hover').toggleClass('completed');
                     itemCount();
                });
            }

            function deleteItem() {
                $('.items').on('click', '.delete', function() {
                    event.preventDefault();
                    $('.items li:hover').remove();
                    itemCount();
                });
            }

            function editItems() {
                $('.items').on('click', function() {
                    $('p').attr('contenteditable', true);
                });
            }

            function allItems() {
                $('button').filter('.show-all').on('click', function() {
                    $('.items li').removeClass('hide');
                    $(this).parents('li').addClass('active');
                    itemCount();
                });
            }

            function clearItems() {
                $('button').filter('.clear').on('click', function() {
                    $('.items li.completed').remove();
                    itemCount();
                });
            }

            function activeItems() {
                $('button').filter('.show-active').on('click', function() {
                    $('.items li').removeClass('hide'); // reset
                    $('.items li.completed').addClass('hide');
                    itemCount();
                });
            }

            function completeItems() {
                $('button').filter('.show-completed').on('click', function() {
                    $('.items li').addClass('hide');
                    $('.items li.completed').removeClass('hide');
                    itemCount();
                });
            }

            function getFormData() {
                $('form').on('submit', function() {
                    event.preventDefault();
                    let newTask = $('.new-todo').val();
                    console.log(newTask);
                    this.reset();
                    buildTemplate(newTask);
                    itemCount();
                });
            }

            function buildTemplate(item) {
                const source = $('#to-do-list').html();
                const template = Handlebars.compile(source);
                const context = {
                    task: item
                };
                const html = template(context);
                displayItems(html);
                $('li').removeClass('hide');
            }

            function displayItems(items) {
                $('.items').prepend(items);
            }

            function itemCount() {
                let count = $('.list-item').not('.completed').length;
                console.log(count);
                $('.incomplete-items').text(count);
            }

            function init() {
                getFormData();
                displayItems();
                bindEvents();
            }

            return {
                init: init
            };
        };
        const todo = toDoList();
        todo.init();
    });
})();
