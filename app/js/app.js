var viewModel = {
  words: ko.observableArray([]),
  count: ko.observable(),

  query: ko.observable(''),

  search: function(value) {
    var self = this;
    self.words([]);

    var promises = value.split(' ').filter(function(x) {
      return x;
    }).map(function(word) {
      return Q($.getJSON("/api/" + word.toLowerCase() + "?lang=en"));
    });

    Q.all(promises).then(function(results) {
      self.words(results);
    });
  }
};

viewModel.query.subscribe(viewModel.search.bind(viewModel));

ko.applyBindings(viewModel);
