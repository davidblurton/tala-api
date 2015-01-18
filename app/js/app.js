var viewModel = {
  words: ko.observableArray([]),
  count: ko.observable(),

  query: ko.observable(''),

  search: function(value) {
    var self = this;
    self.words([]);
    self.count('');

    if(!value) {
      return;
    }

    $.getJSON("/api/" + value + "?lang=en", function(data) {
      self.count(data.count);
      self.words(data.results);
    });
  }
};

viewModel.query.subscribe(viewModel.search.bind(viewModel));

ko.applyBindings(viewModel);
