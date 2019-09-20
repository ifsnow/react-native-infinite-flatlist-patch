Infinite scrolling is one of the most used UX in App. In React Native, This is implemented using the `onEndReached` props of FlatList.

Unfortunately, It doesn't work well as expected. I think it's one of the headaches that hasn't been solved for quite some time. We had to make it work by modifying `onEndReachedThreshold` several times, but eventually it doesn't work efficiently.

**Now, This patch will make it work as you expect! It's too easy to use.**

# History
[My PR](https://github.com/facebook/react-native/pull/26444) is in progress, but React Native may not be easy to apply because there are so many things to consider. So, I decided to provide this patch for those who needed it.

# Usage

### Install
Once installed, react-native's FlatList is automatically patched.
```bash
yarn add react-native-infinite-flatlist-patch --dev
```

`postinstall`, `postuninstall` should be added to prevent this patch from being restored whenever packages are changed.
```javascript
{
  ...
  "scripts": {
    ...,
    "postinstall": "yarn run infinite-flatlist-patch",
    "postuninstall": "yarn run infinite-flatlist-patch"
  }
}
```

If you were already using `postinstall`, you can add the patch script later.
```javascript
"postinstall": "yarn run jetify; yarn run infinite-flatlist-patch"
```

### Execute manually
You can execute the patch manually with the command below.
```bash
yarn run infinite-flatlist-patch
```

### Uninstall
Just delete the command you added to `postinstall`, `postuninstall` and remove my package.

# Check out the improvements

>You can test it yourself with [this test app](https://github.com/ifsnow/FlatListImprovementTest).

This app is to test the improvements of `onEndReached` of FlatList.

- The list has 10 items at the beginning.
- When `onEndReached` is called, 10 items are added.

## After the initial rendering
#### # Official FlatList
![Official FlatList initial rendering](https://github.com/ifsnow/FlatListImprovementTest/raw/master/screenshots/old_flatlist_initial_renering.png)

`OnEndReached` is called twice in a short period and FlatList has 30 items.

#### # Patched FlatList

![Patched FlatList initial rendering](https://github.com/ifsnow/FlatListImprovementTest/raw/master/screenshots/patched_flatlist_initial_renering.png)

`OnEndReached` is not called and FlatList has 10 items.

## After scrolling to the 11th item
#### # Official FlatList

![Official FlatList scrolling](https://github.com/ifsnow/FlatListImprovementTest/raw/master/screenshots/old_flatlist_scrolling.png)

`OnEndReached` is called twice in a short period and FlatList has 50 items.

#### # Patched FlatList

![Patched FlatList scrolling](https://github.com/ifsnow/FlatListImprovementTest/raw/master/screenshots/patched_flatlist_scrolling.png)

`OnEndReached` is called twice when required and FlatList has 30 items.
