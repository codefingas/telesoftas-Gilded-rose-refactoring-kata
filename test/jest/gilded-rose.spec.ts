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
    const gildedRose = new GildedRose([new Item('bar', 1, 1)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(quality).toBe(0);
    expect(sellIn).toBe(0);
  });

  it("should degrade twice as fast once the sell by date has passed", () => {
    const gildedRose = new GildedRose([new Item('bar', 0, 6)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(-1);
    expect(quality).toBe(4);
  });

  it("it's quality should never be negative", () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const [{quality, sellIn}] = gildedRose.updateQuality();
    expect(sellIn).toBe(-1);
    expect(quality).toBe(0);
  });
});

describe("Aged Brie Item", () => {
  it("should increase in quality the older it gets", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 3)]);
    const [{quality, sellIn}] = gildedRose.updateQuality();
    expect(sellIn).toBe(0);
    expect(quality).toBe(4);
  })
})