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
      return promise.get("/api/" + word.toLowerCase() + "?lang=en");
    });

    promise.join(promises).then(function(data) {

      var results = data.map(function(d) {
        return JSON.parse(d[1]);
      });

      self.words(results);
    });
  }
};

viewModel.query.subscribe(viewModel.search.bind(viewModel));

ko.applyBindings(viewModel);
