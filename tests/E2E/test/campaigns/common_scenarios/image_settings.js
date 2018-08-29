const {ImageSettings} = require('../../selectors/BO/design/image_settings');
const {AccessPageBO} = require('../../selectors/BO/access_page');
const {AccessPageFO} = require('../../selectors/FO/access_page');
const {StorePageFO} = require('../../selectors/FO/store_page');
const {productPage} = require('../../selectors/FO/product_page');

let promise = Promise.resolve();

/**** Example of image setting ****
 * let imageSettingData = {
 *  name: 'image type name',
 *  width: 'width of the image',
 *  height: 'height of the image',
 * };
 */

module.exports = {
  sortImageSettings: function (selector, sortBy, desc = true) {
    global.elementsSortedTable = [];
    global.elementsTable = [];
    scenario('Check the sort of image settings by "' + sortBy.toUpperCase() + '"', client => {
      test('should click on "Sort by ASC" icon', () => {
        for (let j = 0; j < (parseInt(tab["number_image_settigns"])); j++) {
          promise = client.getTableField(selector, j);
        }
        return promise
          .then(() => client.waitForExistAndClick(ImageSettings.sort_icon.replace("%B", sortBy).replace("%W", 2)));
      });
      if (desc === true) {
        test('should check that the image settings are well sorted by ASC', () => {
          for (let j = 0; j < (parseInt(tab["number_image_settigns"])); j++) {
            promise = client.getTableField(selector, j, true);
          }
          return promise
            .then(() => client.sortFieldTable("ASC"))
            .then(() => client.checkSortTable());
        });
        test('should click on "Sort by DESC" icon', () => client.waitForExistAndClick(ImageSettings.sort_icon.replace("%B", sortBy).replace("%W", 1)));
        test('should check that the image settings are well sorted by DESC', () => {
          for (let j = 0; j < (parseInt(tab["number_image_settigns"])); j++) {
            promise = client.getTableField(selector, j, true);
          }
          return promise
            .then(() => client.sortFieldTable("DESC"))
            .then(() => client.checkSortTable());
        });
      }
    }, 'design');
  },
  checkImageSettingByInputField(valueSearch, fieldSearch, tdNumber, FieldName, exist = true) {
    scenario('Search then check an image setting in the back office', client => {
      test('should search for the image setting by "' + FieldName + '"', () => client.searchByValue(ImageSettings.search_input.replace("%B", fieldSearch), ImageSettings.search_button, valueSearch));
      if (exist) {
        if (FieldName === "Width" || FieldName === "Height") {
          test('should check the appearance of image setting', () => client.checkTextValue(ImageSettings.element_image_settings_table.replace('%ID', 1).replace('%B', tdNumber), valueSearch.toString(), 'contain'));
        }
        else {
          test('should check the appearance of image setting', () => client.checkTextValue(ImageSettings.element_image_settings_table.replace('%ID', 1)
            .replace('%B', tdNumber), valueSearch.toString()));
        }
      }
      else {
        test('should check that image settings are not existing', () => client.checkTextValue(ImageSettings.search_no_results, 'No records found', 'contain'));
      }
      test('should click on "Reset" button', () => client.waitForExistAndClick(ImageSettings.reset_button));
      if (exist) {
        test('should check if all lines are displayed', () => client.checkTextValue(ImageSettings.data_number_span, tab["number_image_settigns"]));
      }
    }, 'common_client');
  },
  checkImageSettingByListField(fieldSearch, tdNumber, FieldName) {
    scenario('Search an image setting by "' + FieldName + '" in the back office', client => {
      test('should choose "Yes" from "' + FieldName + '" filter list', () => client.waitAndSelectByValue(ImageSettings.search_select.replace("%B", fieldSearch), "1"));
      test('should get number of image settings', () => client.getTextInVar(ImageSettings.data_number_span, "number_image_settigns"));
      test('should check displayed image setting', () => {
        for (let j = 1; j <= (parseInt(tab["number_image_settigns"])); j++) {
          promise = client.waitForExist(ImageSettings.check_remove_icon.replace('%ID', j)
            .replace('%B', tdNumber)
            .replace('%ICON', "icon-check"));
        }
        return promise.pause(0);
      });
      test('should click on "Reset" button', () => client.waitForExistAndClick(ImageSettings.reset_button));
      test('should choose "No" from "' + FieldName + '" filter list', () => client.waitAndSelectByValue(ImageSettings.search_select.replace("%B", fieldSearch), "0"));
      test('should get number of image settings', () => client.getTextInVar(ImageSettings.data_number_span, "number_image_settigns"));
      test('should check displayed image setting', () => {
        for (let j = 1; j <= (parseInt(tab["number_image_settigns"])); j++) {
          promise = client.waitForExist(ImageSettings.check_remove_icon.replace('%ID', j)
            .replace('%B', tdNumber)
            .replace('%ICON', "icon-remove"));
        }
        return promise.pause(0);
      });
      test('should click on "Reset" button', () => client.waitForExistAndClick(ImageSettings.reset_button));
    }, 'common_client');
  },
  regenerateThumbnails() {
    scenario('Regenerate thumbnails images', client => {
      test('should choose the image type from the list', () => client.waitAndSelectByValue(ImageSettings.type_image_select, "all"));
      test('should click on "Regenerate thumbnails" button', () => client.waitForExistAndClick(ImageSettings.regenerate_thumbnails_button));
      test('should cancel the confirmation alert', () => client.alertDismiss());
      test('should verify if we are still  on the "Image Settings" page', () => client.waitForVisible(ImageSettings.image_settings_table));
      test('should click on "Regenerate thumbnails" button', () => client.waitForExistAndClick(ImageSettings.regenerate_thumbnails_button));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "×\nThe thumbnails were successfully regenerated."));
    }, 'common_client');
  },
  editSettingsByWidthHeight(imageSettingData) {
    scenario('Edit Edit width and height of image settings format', client => {
      test('should search for "' + imageSettingData.name.toUpperCase() + '" image setting', () => client.searchByValue(ImageSettings.search_input.replace("%B", "image_typeFilter_name"), ImageSettings.search_button, imageSettingData.name));
      test('should click on "Edit" action from the dropdown list', () => client.clickOnAction(ImageSettings.update_button));
      test('should verify the appearance of the warning panel', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "warning"), "×\nAfter modification, do not forget to regenerate thumbnails"));
      test('should verify the appearance of the red error', () => client.checkTextValue(ImageSettings.danger_panel, "By default, all images settings are already installed in your store. Do not delete them, you will need it!"));
      test('should set the "Width" input', () => client.waitAndSetValue(ImageSettings.width_input, imageSettingData.width));
      test('should set the "Height" input', () => client.waitAndSetValue(ImageSettings.height_input, imageSettingData.height));
      test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.image_type_save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "×\nSuccessful update."));
    }, 'design');
  },
  checkImageFO(field, imageSettingData = '', exist = false) {
    scenario('Go to Front Office then check if images characteristics has been changed', client => {
      test('should click on "View my shop" button then go to the Front Office', () => {
        return promise
          .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1));
      });
      if (field === "size") {
        test('should check that images size has been changed', () => client.checkImageSize(AccessPageFO.first_product_image, imageSettingData.width, imageSettingData.height));
      }
      if (field === "page") {
        test('should click on the first category in the menu', () => client.waitForExistAndClick(AccessPageFO.first_category_element));
        //TO DO: check if image are displayed or not (test by exist var)
      }
      test('should close Front office window and go back to Back office', () => {
        return promise
          .then(() => client.closeOtherWindow(1))
          .then(() => client.switchWindow(0));
      });
    }, 'design');
  },
  editSettingsByType(imageSettingData, btnAction = "save", toggleButton = "", iconType = "") {
    scenario('Edit "' + imageSettingData.name.toUpperCase() + '" image', client => {
      test('should search for "' + imageSettingData.name.toUpperCase() + '" image setting', () => client.searchByValue(ImageSettings.search_input.replace("%B", "image_typeFilter_name"), ImageSettings.search_button, imageSettingData.name));
      test('should click on "Edit" action from the dropdown list', () => client.clickOnAction(ImageSettings.update_button));
      test('should verify the appearance of the warning panel', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "warning"), "×\nAfter modification, do not forget to regenerate thumbnails"));
      test('should verify the appearance of the red error', () => client.checkTextValue(ImageSettings.danger_panel, "By default, all images settings are already installed in your store. Do not delete them, you will need it!"));
      if (btnAction === "save") {
        test('should click on category toggle button', () => client.waitForExistAndClick(ImageSettings.type_toggle_button.replace("%B", toggleButton)
          .replace("%I", toggleButton)));
        test('should click on "Save" button', () => client.waitForExistAndClick(ImageSettings.image_type_save_button));
        test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "×\nSuccessful update."));
        test('should verify the appearance of the red X for the "' + imageSettingData.name.toUpperCase() + '"', () => client.waitForExist(ImageSettings.check_remove_icon.replace('%ID', 1)
          .replace('%B', 7)
          .replace('%ICON', iconType)));
      }
      else {
        test('should click on "Cancel" button', () => client.waitForExistAndClick(ImageSettings.image_type_cancel_button));
        test('should verify if we are back to the "Image settings" page', () => client.waitForVisible(ImageSettings.image_settings_table));
      }
    }, 'design');
  },

  deleteImageSetting(imageSettingData) {
    scenario('Delete an image setting', client => {
      test('should search for "' + imageSettingData.name.toUpperCase() + '" image format', () => client.searchByValue(ImageSettings.search_input.replace("%B", "image_typeFilter_name"), ImageSettings.search_button, imageSettingData.name));
      test('should click on "Delete" action from the dropdown list then cancel alert', () => client.clickOnAction(ImageSettings.delete_button, ImageSettings.option_select, 'delete'));
      test('should verify "' + imageSettingData.name.toUpperCase() + '" format still exist', () => client.waitForVisible(ImageSettings.element_image_settings_table.replace("%ID", 1)
        .replace("%B", 2)));
      test('should click on "Search" button', () => client.waitForExistAndClick(ImageSettings.search_button));
      test('should click on "Delete" action from the dropdown list then accept alert', () => client.clickOnAction(ImageSettings.delete_button, ImageSettings.option_select, 'delete', true));
      test('should check that "' + imageSettingData.name.toUpperCase() + '" is not here', () => client.checkTextValue(ImageSettings.search_no_results, 'No records found', 'contain'));
      test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "×\nSuccessful deletion."));
      test('should click on "Reset" button', () => client.waitForExistAndClick(ImageSettings.reset_button));
    }, 'design');
  },

  checkStoreFO(exist = false) {
    scenario('Go to Front Office then check the store', client => {
      test('should click on "View my shop" button then go to the Front Office', () => {
        return promise
          .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1));
      });
      test('should click on the "Store" link in the footer', () => client.waitForExistAndClick(AccessPageFO.store_link));
      test('should check the epperance of the store page', () => client.waitForVisible(StorePageFO.first_store_block));
      if (exist) {
        test('should check that images are well displayed in store page', () => client.isExisting(StorePageFO.first_store_image));
      }
      else {
        test('should check that images are not displayed in store page', () => client.isNotExisting(StorePageFO.first_store_image));
      }
      test('should close Front office window and go back to Back office', () => {
        return promise
          .then(() => client.closeOtherWindow(1))
          .then(() => client.switchWindow(0));
      });
    }, 'design');
  },
  deleteImageWithBulkAction(imageFormat1, imageFormat2) {
    scenario('Delete image format with "Bulk actions" list', client => {
      test('should get number of image settings', () => client.getTextInVar(ImageSettings.data_number_span, "number_image_settigns"));
      test('should click on "Select all" action from the "Bulk action" list', () => client.clickOnAction(ImageSettings.action_group_button.replace("%ID", 1), ImageSettings.bulk_action_select, 'selectAll'));
      test('should check that all checkbox are checked', () => {
        for (let j = 1; j <= (parseInt(tab["number_image_settigns"])); j++) {
          promise = client.checkStatus(ImageSettings.checkbox_input.replace('%B', j), true);
        }
        return promise.pause(0);
      });
      test('should click on "Unselect all" action from the "Bulk action" list', () => client.clickOnAction(ImageSettings.action_group_button.replace("%ID", 2), ImageSettings.bulk_action_select, 'unselectAll'));
      test('should check that all checkbox are unchecked', () => {
        for (let j = 1; j <= (parseInt(tab["number_image_settigns"])); j++) {
          promise = client.checkStatus(ImageSettings.checkbox_input.replace('%B', j), false);
        }
        return promise.pause(0);
      });
      test('should check "' + imageFormat1.toUpperCase() + '" format', () => client.waitForExistAndClick(ImageSettings.text_checkbox_input.replace("%B", imageFormat1)));
      test('should check "' + imageFormat2.toUpperCase() + '" format', () => client.waitForExistAndClick(ImageSettings.text_checkbox_input.replace("%B", imageFormat2)));
      test('should click on "Delete selected" action from the "Bulk action" list', () => client.clickOnAction(ImageSettings.action_group_button.replace("%ID", 3), ImageSettings.bulk_action_select, 'delete', true));
      test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "×\nThe selection has been successfully deleted."));
      test('should search for "' + imageFormat1.toUpperCase() + '" image format', () => client.searchByValue(ImageSettings.search_input.replace("%B", "image_typeFilter_name"), ImageSettings.search_button, imageFormat1));
      test('should check that "' + imageFormat1.toUpperCase() + '" is not here', () => client.checkTextValue(ImageSettings.search_no_results, 'No records found', 'contain'));
      test('should search for "' + imageFormat2.toUpperCase() + '" image format', () => client.searchByValue(ImageSettings.search_input.replace("%B", "image_typeFilter_name"), ImageSettings.search_button, imageFormat2));
      test('should check that "' + imageFormat2.toUpperCase() + '" is not here', () => client.checkTextValue(ImageSettings.search_no_results, 'No records found', 'contain'));
    }, 'design');
  },
  createImageType(cancel, imageSettingData = '', products = 'off', categories = 'off', brands = 'off', suppliers = 'off', stores = 'off') {
    scenario('Create new image type', client => {
      test('should click on the "Add new image type" button', () => client.waitForExistAndClick(ImageSettings.new_image_type_button));
      if (cancel) {
        test('should verify the appearance of the red error', () => client.checkTextValue(ImageSettings.danger_panel, "By default, all images settings are already installed in your store. Do not delete them, you will need it!"));
        test('should click on the "Cancel" button', () => client.waitForExistAndClick(ImageSettings.image_type_cancel_button));
        test('should verify we are back to "Image Settings" page', () => client.waitForVisible(ImageSettings.image_settings_table));
      }
      else {
        test('should set the "Name for the image type" input', () => client.waitAndSetValue(ImageSettings.name_image_type_input, imageSettingData.name));
        test('should set the "Width" input', () => client.waitAndSetValue(ImageSettings.width_input, imageSettingData.width));
        test('should set the "Height" input', () => client.waitAndSetValue(ImageSettings.height_input, imageSettingData.height));
        test('should click on products "' + products + '" toggle button', () => client.waitForExistAndClick(ImageSettings.type_toggle_button.replace("%B", "products_" + products)
          .replace("%I", "products_" + products)));
        test('should click on categories "' + categories + '" toggle button', () => client.waitForExistAndClick(ImageSettings.type_toggle_button.replace("%B", "categories_" + categories)
          .replace("%I", "categories_" + categories)));
        test('should click on brands "' + brands + '" toggle button', () => client.waitForExistAndClick(ImageSettings.type_toggle_button.replace("%B", "manufacturers_" + brands)
          .replace("%I", "manufacturers_" + brands)));
        test('should click on suppliers "' + suppliers + '" toggle button', () => client.waitForExistAndClick(ImageSettings.type_toggle_button.replace("%B", "suppliers_" + suppliers)
          .replace("%I", "suppliers_" + suppliers)));
        test('should click on stores "' + stores + '" toggle button', () => client.waitForExistAndClick(ImageSettings.type_toggle_button.replace("%B", "stores_" + stores)
          .replace("%I", "stores_" + stores)));
        test('should click on the "Save" button', () => client.waitForExistAndClick(ImageSettings.image_type_save_button));
        test('should verify the appearance of the green validation', () => client.checkTextValue(ImageSettings.bootstrap_panel.replace("%B", "success"), "×\nSuccessful creation."));
      }
    }, 'design');
  },
  checkProductFO(exist = false) {
    scenario('Go to Front Office then check a product page', client => {
      test('should click on "View my shop" button then go to the Front Office', () => {
        return promise
          .then(() => client.waitForExistAndClick(AccessPageBO.shopname))
          .then(() => client.switchWindow(1));
      });
      test('should click on the the first product', () => client.waitForExistAndClick(AccessPageFO.first_product_block));
      test('should check the epperance of the product page', () => client.waitForVisible(productPage.product_name));
      if (exist) {
        test('should check that images are well displayed in product page', () => client.isExisting(productPage.product_image));
      }
      else {
        test('should check that images are not displayed in product page', () => client.isNotExisting(productPage.product_image));
      }
      test('should close Front office window and go back to Back office', () => {
        return promise
          .then(() => client.closeOtherWindow(1))
          .then(() => client.switchWindow(0));
      });
    }, 'design');
  }
};
