(() => {

    angular.module('rummy')
        .directive('ryTabs', RyTabs)
    
    function RyTabs() {
        return {
            templateUrl: '/components/tabs/tabs.html',
            restrict: 'EA',
            controller: () => {
                $('ul.tabs').tabs();
                const play = $('#play-tab'),
                    trend = $('#trend-tab'),
                    settings = $('#settings-tab');
                location.hash = '#/';

                play.click((e) => {
                    tabNav({templateUrl: '/components/play/play.html', path: 'play', script: '/components/play/play.js'});
                });

                trend.click((e) => {
                    tabNav({templateUrl: '/components/trend/trend.html', path: 'trend'});
                });

                settings.click((e) => {
                    tabNav({templateUrl: '/components/settings/settings.html', path: 'settings'});
                });
                play.click();
            }
        }
    }
    var templateCache = {};
    var tabNav = (pageObj) => {
        const locationHash = '#/' + pageObj.path;
        if(location.hash !== locationHash) {
            location.hash = locationHash;
            const pageEl = $('#' + pageObj.path);

            if(templateCache[pageObj.path]) {
                pageEl.html(templateCache[pageObj.path]);
                if (pageObj.script) {
                    setTimeout(() => {
                        $.getScript(pageObj.script);
                    }, 1);
                }
            } else {
                $.get(pageObj.templateUrl).done((data) => {
                    templateCache[pageObj.path] = data;
                    pageEl.html(data);
                });
                if (pageObj.script) {
                    setTimeout(() => {
                        $.getScript(pageObj.script);
                    }, 1);
                }
            }
        }
    }
})();