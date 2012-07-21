!function ($) {
    Backbone.View = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'render', 'close');
        },
        close: function () {
            this.unbind();
            this.remove();
        }
    });

    window.views = {};
    window.views.rootView = Backbone.View.extend({
        tagName: 'div',
        className: 'root',
        initialize: function () {
            console.log('rootView init');
            _.bindAll(this, 'render', 'setPage');
        },
        setPage: function (page) {
            if (this.page) {
                this.page.close();
            }

            this.page = new window.views[page]();
            this.$('.content').html(this.page.render().el);
        },
        render: function () {
            this.$el.html('<div class="header"></div><div class="content"></div><div class="footer"></div>')

            // Header
            this.headerView = new window.views.headerView();
            this.$('.header').html(this.headerView.render().el);

            // Footer
            this.footerView = new window.views.footerView();
            this.$('.footer').html(this.footerView.render().el);

            console.log('rootView render');
            return this;
        }
    });

    window.views.headerView = Backbone.View.extend({
        render: function () {
            this.$el.html('<a href="/">Home</a> - <a href="/about">About</a>');
            return this;
        }
    });

    window.views.footerView = Backbone.View.extend({
        render: function () {
            this.$el.html('footer');
            return this;
        }
    });

    window.views.homePageView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'render', 'submit', 'message');
            window.socket.on('read', this.message);
        },
        events: {
            'keydown input': 'submit'
        },
        message: function (data) {
            this.$('.log').append(data + '<br />');
        },
        submit: function (e) {
            if (e.which == 13) {
                var $el = this.$('.send');
                window.socket.emit('write', $el.val());
                this.message($el.val());
                $el.val('');
            }
        },
        render: function () {
            this.$el.html('<div class="log"></div><input class="send" type="text" />');
            return this;
        }
    });

    window.views.aboutPageView = Backbone.View.extend({
        render: function () {
            this.$el.html('about');
            return this;
        }
    });

} (jQuery);