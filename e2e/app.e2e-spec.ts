import { NgHomeworkPage } from './app.po';

describe('ng-homework App', function() {
  let page: NgHomeworkPage;

  beforeEach(() => {
    page = new NgHomeworkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
