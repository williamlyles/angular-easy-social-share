'use strict';

angular.module('td.easySocialShare', [])
.directive('shareLinks', ['$location', function ($location) {
    return {
        scope: {
            shareLinks: '@',
            shareTitle: '@'
        },
        link: function (scope, elem, attrs) {
            var i,
            sites = ['twitter', 'facebook', 'linkedin', 'google-plus', 'reddit'],
            theLink,
            links = scope.shareLinks.toLowerCase().split(','),
            scope.pageLink = encodeURIComponent($location.absUrl()),
            pageTitle = scope.shareTitle,
            scope.pageTitleUri = encodeURIComponent(pageTitle),
            shareLinks = [],
            square = '';

            elem.addClass('td-easy-social-share');

            // check if square icon specified
            square = (attrs.shareSquare && attrs.shareSquare.toString() === 'true') ? '-square' : '';

            // assign share link for each network
            angular.forEach(links, function (key) {
                    key = key.trim();

                    switch (key) {
                        case 'twitter':
                            theLink = { url: 'http://twitter.com/intent/tweet',
l                                       options: {'text': scope.pageTitleUri + '%20' + pageLink}};
                        break;
                        case 'facebook':
                            theLink = { url:'http://facebook.com/sharer.php',
                                        options:{'u': pageLink}};
                        break;
                        case 'linkedin':
                            theLink = { url: 'http://www.linkedin.com/shareArticle',
                                        options:{    'mini':'true',
                                                     'url':'pageLink',
                                                     'title':scope.pageTitleUri}
                                        };
                        break;
                        case 'google-plus':
                            theLink = { url: 'https://plus.google.com/share',
                                        options: {url:pageLink}};
                        break;
                        case 'reddit':
                            theLink = { url: 'http://reddit.com/submit',
                                        options: {'url':pageLink, 'title':scope.pageTitleUri}};
                        break;
                    }

                    if (sites.indexOf(key) > -1) {
                        shareLinks.push({network: key, url: theLink});
                    }
            });
            scope.shareLinks = shareLinks; 
        
            scope.buildUrl = function(link){
                var url = link.url + '?';
                for(var key in link.options){
                    url += key + '=' + link.options[key] + '&';
                }                
                return url;
            }

        },
        template: '<a ng-repeat="link in shareLinks" ng-class="fa fa-{{link.network}} fa-lg" target="_blank" ng-href="{{buildUrl(link)}}"></a>'
    };
}]);
