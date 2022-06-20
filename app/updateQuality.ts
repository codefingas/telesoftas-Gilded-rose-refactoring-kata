import Item from "./item";

const MAXIMUM_QUALITY = 50;
const MINIMUM_QUALITY = 0;

const isLessThanMaximum = quality => quality < MAXIMUM_QUALITY;
const isOverMinimum = quality => quality > MINIMUM_QUALITY;

const increaseQuality = quality => isLessThanMaximum(quality) ? quality + 1 : quality;
const decreaseQuality = quality => isOverMinimum(quality) ? quality - 1 : quality;

export const updateQualityForAgedBrie = (item): Item => {
    item.quality = increaseQuality(item.quality);
    item.quality = item.sellIn < 0 ? increaseQuality(item.quality) : item.quality;
    item.sellIn -= 1;

    return item;
}