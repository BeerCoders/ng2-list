describe('List Component', () => {
    beforeEach(() => {
        browser.get('/');
    });

    it('should have table', () => {
        expect(element(by.css('table')).isPresent()).toEqual(true);
    });

    it('should have thead', () => {
        expect(element(by.css('table thead')).isPresent()).toEqual(true);
    });

    it('should have tbody', () => {
        expect(element(by.css('table thead')).isPresent()).toEqual(true);
    });
});
