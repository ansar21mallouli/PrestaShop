var CommonClient = require('./common_client');


class International extends CommonClient {

  clickOnAction(actionSelector, groupActionSelector = '', action = 'edit') {
    if (action === 'delete') {
      return this.client
        .waitForExistAndClick(groupActionSelector)
        .waitForExistAndClick(actionSelector)
        .alertAccept();
    }
    else {
      if (action === 'edit') {
        return this.client
          .pause(2000)
          .waitForExistAndClick(actionSelector)
      }
      else {
        return this.client
          .pause(2000)
          .waitForExistAndClick(groupActionSelector)
          .waitForExistAndClick(actionSelector)
      }
    }
  }

  checkCheckboxStatus(selector, checkedValue) {
    return this.client
      .pause(2000)
      .execute(function (selector) {
        return (document.querySelector(selector).checked);
      }, selector)
      .then((status) => {
        expect(status.value).to.equal(checkedValue)
      });
  }
}

module.exports = International;
