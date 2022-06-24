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
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(-1);
    expect(quality).toBe(0);
  });
});

describe("Aged Brie Item", () => {
  it("should increase in quality the older it gets", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 3)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(0);
    expect(quality).toBe(4);
  });

  it("should never increase the quality more than 50", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(0);
    expect(quality).toBe(50);
  });
});

describe("Backstage passes", () => {
  it("should increase by 1 in quality at > 10 Sellin days", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 3)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(11);
    expect(quality).toBe(4);
  });

  it("should increase by 2 when there are 10 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 3)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(9);
    expect(quality).toBe(5);
  });

  it("should increase by 3 when there are 5 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 3)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(4);
    expect(quality).toBe(6);
  });

  it("quality should drop to 0 after concert", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 3)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(-1);
    expect(quality).toBe(0);
  });
});

describe("Sulfuras quality", () => {
  it("should never have to be sold or decrease in value", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 5)]);
    const [{ quality, sellIn }] = gildedRose.updateQuality();
    expect(sellIn).toBe(0);
    expect(quality).toBe(5);
  });
});