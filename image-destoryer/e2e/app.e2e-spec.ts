import { ImageDestoryerPage } from './app.po';

describe('image-destoryer App', () => {
  let page: ImageDestoryerPage;

  beforeEach(() => {
    page = new ImageDestoryerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
