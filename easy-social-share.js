'use strict';

var ess_scripts = document.getElementsByTagName('script');
var easySocialShareScript = ess_scripts[ess_scripts.length - 1];
var easySocialSharePath = easySocialShareScript.substring(0, easySocialShareScript.lastIndexOf('/'));

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
            pageLink = encodeURIComponent($location.absUrl()),
            pageTitle = scope.shareTitle,
            pageTitleUri = encodeURIComponent(pageTitle),
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
                            theLink = 'http://twitter.com/intent/tweet?text=' + pageTitleUri + '%20' + pageLink;
                        break;
                        case 'facebook':
                            theLink = 'http://facebook.com/sharer.php?u=' + pageLink;
                        break;
                        case 'linkedin':
                            theLink = 'http://www.linkedin.com/shareArticle?mini=true&url=' + pageLink + '&title=' + pageTitleUri;
                        break;
                        case 'google-plus':
                            theLink = 'https://plus.google.com/share?url=' + pageLink;
                        break;
                        case 'reddit':
                            theLink = 'http://reddit.com/submit?url=' + pageLink  + '&title=' + pageTitleUri;
                        break;
                    }

                    if (sites.indexOf(key) > -1) {
                        shareLinks.push({network: key, url: theLink});
                    }
            });
            scope.shareLinks = shareLinks; 

        }
    };
}]);
