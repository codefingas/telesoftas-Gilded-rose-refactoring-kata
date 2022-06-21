import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should add new item', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const item = gildedRose.items[0];
    expect(item.name).toBe('foo');
    expect(item.sellIn).toBe(0);
    expect(item.quality).toBe(0);
  });
});


describe('pass basic quality rules', () => {
  it('should update quality after a day of sales', () => {
    const { items: [{ quality, sellIn }] } = new GildedRose([new Item('bar', 0, 0)]);
    expect(quality).toBe(0);
    expect(sellIn).toBe(0);
  });

  
})