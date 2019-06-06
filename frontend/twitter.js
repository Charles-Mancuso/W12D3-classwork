const FollowToggle = require('./follow_toggle.js');

$(function() {
    $buttons = $(".follow-toggle");
    $buttons.each(function(i, button) {
        new FollowToggle(button);
    })
})


