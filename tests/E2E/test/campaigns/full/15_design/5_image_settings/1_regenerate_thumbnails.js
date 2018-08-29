const {AccessPageBO} = require('../../../../selectors/BO/access_page');
const common_scenarios = require('../../../common_scenarios/image_settings');
const {Menu} = require('../../../../selectors/BO/menu.js');

scenario('Generate thumbnails', () => {

  scenario('Login in the Back Office', client => {
    test('should open the browser', () => client.open());
    test('should log in successfully in the Back Office', () => client.signInBO(AccessPageBO));
  }, 'common_client');
  scenario('Access to "Image Settings"', client => {
    test('should go to "Design > Image Settings" page', () => client.goToSubtabMenuPage(Menu.Improve.Design.design_menu, Menu.Improve.Design.image_settings_submenu));
  }, 'common_client');
  common_scenarios.regenerateThumbnails();
  scenario('logout successfully from the Back Office', client => {
    test('should logout successfully from the Back Office', () => client.signOutBO());
  }, 'common_client');
}, 'common_client', true);
