const {Location} = require('../../selectors/BO/international/location');
const {Menu} = require('../../selectors/BO/menu.js');
let promise = Promise.resolve();

module.exports = {

  createZone: function (name = "", cancel = false) {
    scenario('Create new zone', client => {
      test('should go to "International > Locations" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.locations_submenu));
      test('should click on "Add new zone" button', () => client.waitForExistAndClick(Location.Zone.add_new_zone_button));
      if (cancel === true) {
        test('should click on "Cancel" button', () => client.waitForExistAndClick(Location.Zone.cancel_button));
        test('should check the appearance of zones table', () => client.waitForExist(Location.Zone.zones_table));
      } else {
        test('should set the "Name" input', () => client.waitAndSetValue(Location.Zone.name_input, name + date_time));
        test('should click on "Save" button', () => client.waitForExistAndClick(Location.Zone.save_button));
        test('should verify the appearance of the green validation', () => client.checkTextValue(Location.Zone.alert_panel.replace("%I", "success"), "×\nSuccessful creation."));
      }
    }, 'international');
  },
  sortZoneCountry: function (selector, sortBy, iconAsc, iconDesc, table) {
    global.elementsSortedTable = [];
    global.elementsTable = [];
    scenario('Check the sort of zones by "' + sortBy.toUpperCase() + '"', client => {
      test('should click on "Sort by ASC" icon', () => {
        for (let j = 0; j < parseInt(tab["number_zones"]); j++) {
          promise = client.getTableField(selector, j);
        }
        return promise
          .then(() => client.waitForExistAndClick(Location.Zone.sort_icon.replace("%B", sortBy).replace("%W", 2)));
      });
      test('should check that zones are well sorted by ASC', () => {
        for (let j = 0; j < parseInt(tab["number_zones"]); j++) {
          promise = client.getTableField(selector, j, true);
        }
        return promise
          .then(() => client.sortFieldTable("ASC"))
          .then(() => client.checkSortTable());
      });
      test('should click on "Sort by DESC" icon', () => client.waitForExistAndClick(Location.Zone.sort_icon.replace("%B", sortBy).replace("%W", 1)));
      test('should check that zones are well sorted by DESC', () => {
        for (let j = 0; j < parseInt(tab["number_zones"]); j++) {
          promise = client.getTableField(selector, j, true);
        }
        return promise
          .then(() => client.sortFieldTable("DESC"))
          .then(() => client.checkSortTable());
      });
    }, 'international');
  },
};
