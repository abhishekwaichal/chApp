import { UiSrcPage } from './app.po';

describe('ui-src App', function() {
  let page: UiSrcPage;

  beforeEach(() => {
    page = new UiSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
