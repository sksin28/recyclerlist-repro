import * as React from "react";
import { Text, View, TextInput } from "react-native";

import _ from "lodash";

import {
  DataProvider,
  LayoutProvider,
  RecyclerListView
} from "recyclerlistview";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let list = [{ name: "Item 1" }, { name: "Item 2" }];

    this._dataProvider = new DataProvider((r1, r2) => {
      return r1.name !== r2.name;
    });

    this._layoutProvider = new LayoutProvider(
      index => {
        return 1;
      },
      (type, dim) => {
        dim.width = 400;
        dim.height = 120;
      }
    );

    this.state = {
      list,
      originalList: _.clone(list),
      dataProvider: this._dataProvider.cloneWithRows(list)
    };
  }

  search(value) {
    this.setState(prevState => {
      return {
        list: _.filter(prevState.originalList, item => {
          return value == "" || _.includes(item.name, value);
        })
      };
    });
  }

  _rowRenderer(type, item) {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 50, width: 400, height: 400 }}>
        <TextInput
          style={{ width: "100%" }}
          placeholder="Search"
          placeholderTextColor="red"
          onChangeText={value => {
            this.search(value);
          }}
        />
        <RecyclerListView
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider.cloneWithRows(this.state.list)}
          rowRenderer={this._rowRenderer.bind(this)}
        />
      </View>
    );
  }
}
