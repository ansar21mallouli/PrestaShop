var CommonClient = require('./common_client');
global.checkSettingName = [];
global.settingsSortedTable = [];
global.settingsTable = [];

class Design extends CommonClient {

  getCategoryID(selector, pos) {
    if (global.isVisible) {
      return this.client
        .getText(selector.replace('%ID', pos))
        .then((text) => global.categoryID = text);
    }
    else {
      return this.client
        .getText(selector.replace('%ID', pos - 1))
        .then((text) => global.categoryID = text);
    }
  }

  showSelect(value) {
    return this.client
      .execute(function () {
        document.querySelector('#hook_module_form > div > div:nth-child(2) > div > select').style = "";
      })
      .selectByVisibleText(Positions.module_list, value)
  }


  clickOnAction(actionSelector, groupActionSelector = '', action = 'edit', confirmAlert = false) {
    if (action === 'delete') {
      if (confirmAlert) {
        return this.client
          .waitForExistAndClick(groupActionSelector)
          .waitForExistAndClick(actionSelector)
          .alertAccept()
      }
      else {
        return this.client
          .waitForExistAndClick(groupActionSelector)
          .waitForExistAndClick(actionSelector)
          .alertDismiss()
      }
    }
    else {
      if (action === 'selectAll' || action === 'unselectAll' || action === 'unhook') {
        return this.client
          .pause(2000)
          .waitForExistAndClick(groupActionSelector)
          .waitForExistAndClick(actionSelector)
      }
      else {
        return this.client
          .pause(2000)
          .waitForExistAndClick(actionSelector)
      }
    }
  }

  checkStatus(selector, checkedValue) {
    return this.client
      .pause(2000)
      .execute(function (selector) {
        return (document.querySelector(selector).checked);
      }, selector)
      .then((status) => {
        expect(status.value).to.equal(checkedValue)
      });
  }

  checkImageSize(selector, width, height, pause = 0) {
    return this.client
      .pause(pause)
      .waitForExist(selector, 9000)
      .then(() => this.client.getElementSize(selector, 'width'))
      .then((text) => expect(text.toString()).to.equal(width))
      .then(() => this.client.getElementSize(selector, 'height'))
      .then((text) => expect(text.toString()).to.equal(height))
  }
}

module.exports = Design;
