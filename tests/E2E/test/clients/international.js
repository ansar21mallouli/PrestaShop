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

  clearAddressFormat(selector, value) {
    return this.client
      .execute(function (element, value) {
        let addressFormatValue = document.getElementById(element).textContent;
        let editedAddressFormat = addressFormatValue.replace(addressFormatValue.substring(0, addressFormatValue.indexOf(value)), '');
        document.getElementById(element).value = editedAddressFormat;
      }, selector, value)
  }

}

module.exports = International;
