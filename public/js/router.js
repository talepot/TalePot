!function ($) {



    window.router = Backbone.Router.extend({
        initialize: function () {
            this.rootView = new window.views.rootView();
            $(document.body).html(this.rootView.render().el);
        },
        routes: {
            '': 'home',
            'about': 'about',
            '*url': 'notfound'
        },
        home: function () {
            this.rootView.setPage('homePageView');
        },
        about: function () {
            this.rootView.setPage('aboutPageView');
        },
        notfound: function (url) {
            console.log(url + ' not found.');
        }
    });

    $(document).ready(function () {
        $(document).on('click', 'a', function (e) {
            e.preventDefault();

            var href = $(e.currentTarget).attr('href');
            if (href != '#') {
                window.tpRouter.navigate(href, { trigger: true });
            }
        });

        // No escape - firefox closes sockets on escape
        $(window).on('keydown', function (e) { (e.keyCode == 27 && e.preventDefault()) });


        window.socket = io.connect('http://localhost:8080');

        window.tpRouter = new window.router;
        Backbone.history.start({ pushState: true });

    });
} (jQuery);

