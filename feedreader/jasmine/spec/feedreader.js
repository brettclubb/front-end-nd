$(function () {
    /*----- RSS FEEDS -----*/
    describe('RSS Feeds', function () {

        // Check for at least one feed
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Insure each feed has a url
        it('has defined non-empty url', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        // Insure each feed has a name
        it('has defined non-empty name', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /*----- THE MENU -----*/
    describe('The Menu', function () {

        // Check that the menu is hidden
        it('is hidden by default', function () {
            // The presence of the menu-hidden class hides the menu
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Validate clicking the menu icon toggles visibility
        it('visibility changes on click', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /*----- INITIAL ENTRIES -----*/
    describe('Initial Entries', function () {

        // Asynchronously load a feed
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Check that the page shows an entry
        it('has an entry', function () {
            expect($('.feed').has('.entry').length > 0).toBe(true);
        });
    });

    /*----- NEW FEED SELECTION -----*/
    describe('New Feed Selection', function () {

        let feed1, feed2;

        // Asynchronously load 2 feeds
        beforeEach(function (done) {
            // Load feed1 with callback function
            loadFeed(0, function () {
                // Store content of feed1
                feed1 = $('.feed').html();

                // Load feed2 with callback
                loadFeed(1, function () {
                    // Store content of feed2
                    feed2 = $('.feed').html();

                    // Complete async
                    done();
                });
            });
        });

        // Insure the feed refreshes on new selection
        it('loads new feed', function () {
            expect(feed2).not.toBe(feed1);
        });
    });
}());
