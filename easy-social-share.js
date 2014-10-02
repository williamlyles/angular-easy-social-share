'use strict'; angular.module('td.easySocialShare', []) .directive('shareLinks', ['$location', function ($location) { return {
        scope: {
            shareLinks: '@',
            shareTitle: '@',
            shareUrl: '@'
        },
        link: function (scope, elem, attrs) {
            var i,
            sites = ['twitter', 'facebook', 'linkedin', 'google-plus', 'reddit'],
            theLink,
            pageTitle = scope.shareTitle,
            shareLinks = [],
            square = '';


            
            scope.pageLink = encodeURIComponent($location.absUrl());
            elem.addClass('td-easy-social-share');
            scope.pageTitleUri = encodeURIComponent(pageTitle);

            // check if square icon specified
            square = (attrs.shareSquare && attrs.shareSquare.toString() === 'true') ? '-square' : '';

            // assign share link for each network
            scope.updateLinks = function(){
                var shareLinks = [];
                var links = scope.shareLinks.toLowerCase().split(',');
                angular.forEach(links, function (key) {
                        key = key.trim();

                        switch (key) {
                            case 'twitter':
                                theLink = { url: 'http://twitter.com/intent/tweet',
                                           options: {'text': scope.shareTitle + '%20' + scope.shareUrl}};
                            break;
                            case 'facebook':
                                theLink = { url:'http://facebook.com/sharer.php',
                                            options:{'u': scope.shareUrl}};
                            break;
                            case 'linkedin':
                                theLink = { url: 'http://www.linkedin.com/shareArticle',
                                            options:{    'mini':'true',
                                                         'url':scope.shareUrl,
                                                         'title':scope.shareTitle}
                                            };
                            break;
                            case 'google-plus':
                                theLink = { url: 'https://plus.google.com/share',
                                            options: {url:scope.shareUrl}};
                            break;
                            case 'reddit':
                                theLink = { url: 'http://reddit.com/submit',
                                            options: {'url':scope.shareUrl, 'title':scope.shareTitle}};
                            break;
                        }

                        if (sites.indexOf(key) > -1) {
                            shareLinks.push({network: key, url: theLink});
                        }
                });
                scope.socialLinks = shareLinks; 
            };

            scope.updateLinks();
            scope.$watch('shareTitle', scope.updateLinks);
        
            scope.buildUrl = function(link){
                var url = link.url.url + '?';
                for(var key in link.url.options){
                    url += key + '=' + encodeURIComponent(link.url.options[key]) + '&';
                }     
                return url;
            };

        },
        template: '<a ng-repeat="link in socialLinks" ng-class="\'fa fa-lg fa-\'+link.network"  target="_blank" ng-href="{{buildUrl(link)}}"></a>'
    };
}]);
