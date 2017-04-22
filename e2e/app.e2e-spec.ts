import { Angularattack2017KzhangPage } from './app.po';

describe('angularattack2017-kzhang App', () => {
  let page: Angularattack2017KzhangPage;

  beforeEach(() => {
    page = new Angularattack2017KzhangPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
