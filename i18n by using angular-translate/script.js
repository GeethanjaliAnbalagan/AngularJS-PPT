var i18nApp = angular.module("i18nApp", ['pascalprecht.translate']);

i18nApp.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'nav.button.home': 'Home',
    'nav.button.about': 'About Us',
    'nav.button.contact': 'Contact',
    'option.choose.lang': 'Choose language',
    'app.title.i18n.application': 'i18n Application'
  });

  $translateProvider.translations('tr', {
    'nav.button.home': 'Anasayfa',
    'nav.button.about': 'Hakkkımızda',
    'nav.button.contact': 'İletişim',
    'option.choose.lang': 'Dil seçiniz',
    'app.title.i18n.application': 'i18n Uygulaması'
  });

  $translateProvider.use("en");

}]);


i18nApp.controller('NavCtrl', ['$translate', '$scope', function ($translate, $scope) {
  $scope.items = [{
    'url': '/home',
    'text': 'nav.button.home'
  },
    {
      'url': '/about',
      'text': 'nav.button.about'
    },
    {
      'url': '/contact',
      'text': 'nav.button.contact'
    }];

  $scope.languageOptions = [
    {
      'lang': 'en',
      'text': 'English',
      'icon': 'images/english.jpg'
    },
    {
      'lang': 'tr',
      'text': 'Türkçe',
      'icon': 'images/turkish.jpg'
    }
  ];

  $scope.chooseLang = 'option.choose.lang';

  $scope.appTitle = 'app.title.i18n.application';

  $scope.toggleLang = function (lang) {
    $translate.use(lang);
  };

}]);