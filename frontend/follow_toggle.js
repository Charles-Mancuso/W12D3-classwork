const apiUtil = require('./api_util.js');

const FollowToggle = function(el) {
    this.$el = $(el);
    this.userId = this.$el.data('userId');
    this.followState = this.$el.attr('data-initial-follow-state');  //call data?
    this.render(); 
    this.$el.on("click", this.handleClick.bind(this));
}

FollowToggle.prototype.render = function() {
    switch (this.followState) {
        case 'followed':
            this.$el.prop('disabled', false);
            this.$el.html('Unfollow!');
            break;
        case 'unfollowed':
            this.$el.prop('disabled', false);
            this.$el.html('Follow!');
            break;
        case 'following':
            this.$el.prop('disabled', true);
            this.$el.html('Following...');
            break;
        case 'unfollowing':
            this.$el.prop('disabled', true);
            this.$el.html('Unfollowing...');
            break;
    }
    // if (this.followState === "unfollowed") {
    //     this.$el.text('Follow!');
    // } else {
    //     this.$el.text('Unfollow!');
    // }
}

FollowToggle.prototype.handleClick = function (event) {
    event.preventDefault();  //this.$el
    if (this.followState === "unfollowed") {
        this.followState = 'following';
        this.render();
        apiUtil.followUser(this.userId).then(() => {
            this.followState = "followed";
            this.render(), null});
        } else {
        this.followState = 'unfollowing';
        this.render();
        apiUtil.unfollowUser(this.userId).then(() => {
            this.followState = "unfollowed";
            this.render(), null});
    }
}


module.exports = FollowToggle;
