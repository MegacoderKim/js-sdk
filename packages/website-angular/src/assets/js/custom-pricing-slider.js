$("#flat-slider")
    .slider({
      min: 0,
      max: 100,
      range: "min",
      value: 20
    })
    .slider("pips", {
      first: "pip",
      last: "pip"
    })
    .on("slidechange", function( e, ui ) {
      var value = ui.value;
      var numberActionsValue = value * 100;
      var monthlyPriceValue = numberActionsValue * 1.2;
      var numberOfEngineers = monthlyPriceValue / 4800;
      showNumberOfEngineers(numberOfEngineers);
      $("#number-actions").text(numberActionsValue.toLocaleString());
      $("#monthly-price").text("$" + monthlyPriceValue.toLocaleString());
    });

function getEngineerLabel(numberEngineers, numb) {
  var engineerLabel = numb <= 1 ? " engineer" : " engineers";
  return "Cost &cong; " + numberEngineers + " " + engineerLabel;
}

function showNumberOfEngineers(numberOfEngineers) {
  var fillEngineerWidth = (1 / 6) * numberOfEngineers * 100;
  $(".engineers-container").width(fillEngineerWidth + '%');
  if (numberOfEngineers < 0.25) {
    $(".engineer-label").html(getEngineerLabel("0", 0));
  } else if (numberOfEngineers >= 0.25 && numberOfEngineers < 0.5) {
    $(".engineer-label").html(getEngineerLabel("&frac14;", 0.25));
  } else if (numberOfEngineers >= 0.5 && numberOfEngineers < 0.75) {
    $(".engineer-label").html(getEngineerLabel("&frac12;", 0.5));
  } else if (numberOfEngineers >= 0.75 && numberOfEngineers < 1) {
    $(".engineer-label").html(getEngineerLabel("&frac34;", 0.75));
  } else if (numberOfEngineers >= 1 && numberOfEngineers < 1.25) {
    $(".engineer-label").html(getEngineerLabel("1", 1));
  } else if (numberOfEngineers >= 1.25 && numberOfEngineers < 1.5) {
    $(".engineer-label").html(getEngineerLabel("1&frac14;", 1.25));
  } else if (numberOfEngineers >= 1.5 && numberOfEngineers < 1.75) {
    $(".engineer-label").html(getEngineerLabel("1&frac12;", 1.5));
  } else if (numberOfEngineers >= 1.75 && numberOfEngineers < 2) {
    $(".engineer-label").html(getEngineerLabel("1&frac34;", 1.75));
  } else if (numberOfEngineers >= 2 && numberOfEngineers < 2.25) {
    $(".engineer-label").html(getEngineerLabel("2", 2));
  } else if (numberOfEngineers >= 2.25 && numberOfEngineers < 2.5) {
    $(".engineer-label").html(getEngineerLabel("2&frac14;", 2.25));
  } else if (numberOfEngineers >= 2.5) {
    $(".engineer-label").html(getEngineerLabel("2&frac12;", 2.5));
  }
}